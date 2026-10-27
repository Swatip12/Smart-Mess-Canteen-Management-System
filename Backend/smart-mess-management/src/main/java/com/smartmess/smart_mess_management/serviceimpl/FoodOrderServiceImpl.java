package com.smartmess.smart_mess_management.serviceimpl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

import com.smartmess.smart_mess_management.Services.FoodOrderService;
import com.smartmess.smart_mess_management.entity.FoodOrder;
import com.smartmess.smart_mess_management.entity.FoodOrderItem;
import com.smartmess.smart_mess_management.entity.Payment;
import com.smartmess.smart_mess_management.repository.CanteenRepository;
import com.smartmess.smart_mess_management.repository.FoodItemRepository;
import com.smartmess.smart_mess_management.repository.FoodOrderRepository;
import com.smartmess.smart_mess_management.repository.PaymentRepository;
import com.smartmess.smart_mess_management.repository.StudentRepository;

import enums.OrderStatus;
import enums.PaymentStatus;
import enums.PaymentType;

@Service
public class FoodOrderServiceImpl implements FoodOrderService {

    private final FoodOrderRepository foodOrderRepository;
    private final PaymentRepository paymentRepository;
    private final StudentRepository studentRepository;
    private final CanteenRepository canteenRepository;
    private final FoodItemRepository foodItemRepository;

    public FoodOrderServiceImpl(
            FoodOrderRepository foodOrderRepository,
            PaymentRepository paymentRepository,
            StudentRepository studentRepository,
            CanteenRepository canteenRepository,
            FoodItemRepository foodItemRepository) {
        this.foodOrderRepository = foodOrderRepository;
        this.paymentRepository = paymentRepository;
        this.studentRepository = studentRepository;
        this.canteenRepository = canteenRepository;
        this.foodItemRepository = foodItemRepository;
    }

    @Override
    public FoodOrder createOrder(FoodOrder order) {
        Long sId = order.getStudentId();
        if (sId == null && order.getStudent() != null) {
            sId = order.getStudent().getId();
        }
        if (sId != null) {
            studentRepository.findById(sId).ifPresent(order::setStudent);
        }

        Long cId = order.getCanteenId();
        if (cId == null && order.getCanteen() != null) {
            cId = order.getCanteen().getId();
        }
        if (cId != null) {
            canteenRepository.findById(cId).ifPresent(order::setCanteen);
        }

        BigDecimal calculatedTotal = BigDecimal.ZERO;

        if (order.getOrderItems() != null) {
            for (FoodOrderItem item : order.getOrderItems()) {
                item.setFoodOrder(order);

                Long fId = item.getFoodItemId();
                if (fId == null && item.getFoodItem() != null) {
                    fId = item.getFoodItem().getId();
                }
                if (fId != null) {
                    foodItemRepository.findById(fId).ifPresent(item::setFoodItem);
                }

                if (item.getUnitPrice() == null && item.getFoodItem() != null) {
                    item.setUnitPrice(item.getFoodItem().getPrice());
                }

                if (item.getQuantity() == null || item.getQuantity() <= 0) {
                    item.setQuantity(1);
                }

                if (item.getUnitPrice() != null) {
                    item.setSubTotal(item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
                    calculatedTotal = calculatedTotal.add(item.getSubTotal());
                }
            }
        }

        if (order.getTotalAmount() == null || order.getTotalAmount().compareTo(BigDecimal.ZERO) <= 0) {
            order.setTotalAmount(calculatedTotal);
        }

        if (order.getStatus() == null) {
            order.setStatus(OrderStatus.PENDING);
        }

        FoodOrder savedOrder = foodOrderRepository.save(order);

        // Auto-generate Payment transaction linked to order
        try {
            Payment payment = Payment.builder()
                    .student(savedOrder.getStudent())
                    .amount(savedOrder.getTotalAmount())
                    .type(PaymentType.CANTEEN_ORDER)
                    .status(PaymentStatus.COMPLETED)
                    .paymentMethod("ONLINE")
                    .transactionId("TXN-ORD-" + savedOrder.getId() + "-" + System.currentTimeMillis())
                    .build();
            paymentRepository.save(payment);
        } catch (Exception e) {
            System.err.println("Warning: Auto-payment generation for order skipped: " + e.getMessage());
        }

        return savedOrder;
    }

    @Override
    public FoodOrder getOrderById(Long id) {
        return foodOrderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }

    @Override
    public List<FoodOrder> getAllOrders() {
        return foodOrderRepository.findAll();
    }

    @Override
    public void deleteOrder(Long id) {
        foodOrderRepository.deleteById(id);
    }

    @Override
    public List<FoodOrder> getOrdersByStudent(Long studentId) {
        return foodOrderRepository.findByStudentId(studentId);
    }

    @Override
    public List<FoodOrder> getOrdersByStatus(OrderStatus status) {
        return foodOrderRepository.findByStatus(status);
    }

    @Override
    public FoodOrder updateOrderStatus(Long orderId, OrderStatus status) {
        FoodOrder order = foodOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        OrderStatus currentStatus = order.getStatus();
        if (!isValidTransition(currentStatus, status)) {
            throw new IllegalArgumentException(
                    "Invalid order status transition from " + currentStatus + " to " + status);
        }

        order.setStatus(status);
        return foodOrderRepository.save(order);
    }

    @Override
    public FoodOrder cancelOrder(Long orderId, Long studentId) {
        FoodOrder order = foodOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        if (studentId != null && order.getStudent() != null && !order.getStudent().getId().equals(studentId)) {
            throw new IllegalArgumentException("Unauthorized to cancel this order");
        }

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new IllegalStateException("Order can only be cancelled while in PENDING status. Current status: " + order.getStatus());
        }

        order.setStatus(OrderStatus.CANCELLED);
        return foodOrderRepository.save(order);
    }

    private boolean isValidTransition(OrderStatus from, OrderStatus to) {
        if (from == null || from == to) return true;

        // Terminal states cannot transition to anything
        if (from == OrderStatus.DELIVERED || from == OrderStatus.CANCELLED) {
            return false;
        }

        // Cancellation is permitted from PENDING or CONFIRMED
        if (to == OrderStatus.CANCELLED) {
            return from == OrderStatus.PENDING || from == OrderStatus.CONFIRMED;
        }

        switch (from) {
            case PENDING:
                return to == OrderStatus.CONFIRMED || to == OrderStatus.PREPARING || to == OrderStatus.CANCELLED;
            case CONFIRMED:
                return to == OrderStatus.PREPARING || to == OrderStatus.READY || to == OrderStatus.CANCELLED;
            case PREPARING:
                return to == OrderStatus.READY;
            case READY:
                return to == OrderStatus.DELIVERED;
            default:
                return false;
        }
    }
}
