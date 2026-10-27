package com.smartmess.smart_mess_management.Services;

import java.util.List;

import com.smartmess.smart_mess_management.entity.FoodOrder;
import enums.OrderStatus;

public interface FoodOrderService {

    FoodOrder createOrder(FoodOrder order);

    FoodOrder getOrderById(Long id);

    List<FoodOrder> getAllOrders();

    void deleteOrder(Long id);

    List<FoodOrder> getOrdersByStudent(Long studentId);

    List<FoodOrder> getOrdersByStatus(OrderStatus status);

    FoodOrder updateOrderStatus(Long orderId, OrderStatus status);

    FoodOrder cancelOrder(Long orderId, Long studentId);
}
