package com.smartmess.smart_mess_management.Controllers;

import com.smartmess.smart_mess_management.Services.FoodOrderItemService;
import com.smartmess.smart_mess_management.entity.FoodOrderItem;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order-items")
public class FoodOrderItemController {

    private final FoodOrderItemService orderItemService;

    public FoodOrderItemController(FoodOrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    @PostMapping
    public ResponseEntity<FoodOrderItem> create(
            @RequestBody FoodOrderItem orderItem) {

        return ResponseEntity.ok(orderItemService.createOrderItem(orderItem));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodOrderItem> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(orderItemService.getOrderItemById(id));
    }

    @GetMapping
    public ResponseEntity<List<FoodOrderItem>> getAll() {
        return ResponseEntity.ok(orderItemService.getAllOrderItems());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        orderItemService.deleteOrderItem(id);
        return ResponseEntity.noContent().build();
    }
}