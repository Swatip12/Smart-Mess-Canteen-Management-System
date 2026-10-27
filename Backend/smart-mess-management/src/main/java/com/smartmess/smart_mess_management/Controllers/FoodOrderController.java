package com.smartmess.smart_mess_management.Controllers;

import com.smartmess.smart_mess_management.Services.FoodOrderService;
import com.smartmess.smart_mess_management.entity.FoodOrder;
import enums.OrderStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class FoodOrderController {

    private final FoodOrderService orderService;

    public FoodOrderController(FoodOrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<FoodOrder> create(@RequestBody FoodOrder order) {
        return ResponseEntity.ok(orderService.createOrder(order));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodOrder> getById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @GetMapping
    public ResponseEntity<List<FoodOrder>> getAll() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<FoodOrder> updateStatus(
            @PathVariable Long id,
            @RequestParam OrderStatus status) {

        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<FoodOrder> cancelOrder(
            @PathVariable Long id,
            @RequestParam(required = false) Long studentId) {

        return ResponseEntity.ok(orderService.cancelOrder(id, studentId));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<FoodOrder>> getByStudent(
            @PathVariable Long studentId) {

        return ResponseEntity.ok(orderService.getOrdersByStudent(studentId));
    }
}
