package com.smartmess.smart_mess_management.service;

import com.smartmess.smart_mess_management.entity.FoodOrder;
import com.smartmess.smart_mess_management.entity.Student;
import com.smartmess.smart_mess_management.repository.*;
import com.smartmess.smart_mess_management.serviceimpl.FoodOrderServiceImpl;
import enums.OrderStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Order State Machine & Lifecycle Tests")
public class OrderStateMachineTests {

    @Mock
    private FoodOrderRepository foodOrderRepository;
    @Mock
    private PaymentRepository paymentRepository;
    @Mock
    private StudentRepository studentRepository;
    @Mock
    private CanteenRepository canteenRepository;
    @Mock
    private FoodItemRepository foodItemRepository;

    @InjectMocks
    private FoodOrderServiceImpl foodOrderService;

    private FoodOrder testOrder;
    private Student testStudent;

    @BeforeEach
    void setUp() {
        testStudent = new Student();
        testStudent.setId(5L);
        testStudent.setName("Rohan Sharma");

        testOrder = new FoodOrder();
        testOrder.setId(101L);
        testOrder.setStudent(testStudent);
        testOrder.setStatus(OrderStatus.PENDING);
    }

    @Test
    @DisplayName("Valid transition: PENDING -> CONFIRMED -> PREPARING -> READY -> DELIVERED")
    void testValidOrderTransitions() {
        when(foodOrderRepository.findById(101L)).thenReturn(Optional.of(testOrder));
        when(foodOrderRepository.save(any(FoodOrder.class))).thenAnswer(i -> i.getArgument(0));

        // PENDING -> CONFIRMED
        FoodOrder confirmed = foodOrderService.updateOrderStatus(101L, OrderStatus.CONFIRMED);
        assertEquals(OrderStatus.CONFIRMED, confirmed.getStatus());

        // CONFIRMED -> PREPARING
        FoodOrder preparing = foodOrderService.updateOrderStatus(101L, OrderStatus.PREPARING);
        assertEquals(OrderStatus.PREPARING, preparing.getStatus());

        // PREPARING -> READY
        FoodOrder ready = foodOrderService.updateOrderStatus(101L, OrderStatus.READY);
        assertEquals(OrderStatus.READY, ready.getStatus());

        // READY -> DELIVERED
        FoodOrder delivered = foodOrderService.updateOrderStatus(101L, OrderStatus.DELIVERED);
        assertEquals(OrderStatus.DELIVERED, delivered.getStatus());
    }

    @Test
    @DisplayName("Illegal transition from terminal CANCELLED throws IllegalArgumentException")
    void testTransitionFromCancelledThrowsException() {
        testOrder.setStatus(OrderStatus.CANCELLED);
        when(foodOrderRepository.findById(101L)).thenReturn(Optional.of(testOrder));

        assertThrows(IllegalArgumentException.class, () -> {
            foodOrderService.updateOrderStatus(101L, OrderStatus.DELIVERED);
        });
    }

    @Test
    @DisplayName("Illegal transition from terminal DELIVERED throws IllegalArgumentException")
    void testTransitionFromDeliveredThrowsException() {
        testOrder.setStatus(OrderStatus.DELIVERED);
        when(foodOrderRepository.findById(101L)).thenReturn(Optional.of(testOrder));

        assertThrows(IllegalArgumentException.class, () -> {
            foodOrderService.updateOrderStatus(101L, OrderStatus.CANCELLED);
        });
    }

    @Test
    @DisplayName("Student can successfully cancel order when status is PENDING")
    void testCancelPendingOrderSucceeds() {
        when(foodOrderRepository.findById(101L)).thenReturn(Optional.of(testOrder));
        when(foodOrderRepository.save(any(FoodOrder.class))).thenAnswer(i -> i.getArgument(0));

        FoodOrder cancelled = foodOrderService.cancelOrder(101L, 5L);
        assertEquals(OrderStatus.CANCELLED, cancelled.getStatus());
    }

    @Test
    @DisplayName("Cancellation fails when order is already in PREPARING status")
    void testCancelPreparingOrderFails() {
        testOrder.setStatus(OrderStatus.PREPARING);
        when(foodOrderRepository.findById(101L)).thenReturn(Optional.of(testOrder));

        assertThrows(IllegalStateException.class, () -> {
            foodOrderService.cancelOrder(101L, 5L);
        });
    }
}
