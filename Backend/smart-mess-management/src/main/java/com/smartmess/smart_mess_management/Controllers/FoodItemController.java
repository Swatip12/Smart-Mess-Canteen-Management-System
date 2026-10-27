package com.smartmess.smart_mess_management.Controllers;


import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartmess.smart_mess_management.Services.FoodItemService;
import com.smartmess.smart_mess_management.entity.FoodItem;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/food-items")
public class FoodItemController {

    private final FoodItemService foodItemService;

    public FoodItemController(FoodItemService foodItemService) {
        this.foodItemService = foodItemService;
    }

    @PostMapping
    public ResponseEntity<FoodItem> create(
            @Valid @RequestBody FoodItem foodItem) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(foodItemService.createFoodItem(foodItem));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodItem> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                foodItemService.getFoodItemById(id));
    }

    @GetMapping
    public ResponseEntity<List<FoodItem>> getAll() {

        return ResponseEntity.ok(
                foodItemService.getAllFoodItems());
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodItem> update(
            @PathVariable Long id,
            @Valid @RequestBody FoodItem foodItem) {

        return ResponseEntity.ok(
                foodItemService.updateFoodItem(id, foodItem));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        foodItemService.deleteFoodItem(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/canteen/{canteenId}/available")
    public ResponseEntity<List<FoodItem>> getAvailableByCanteen(
            @PathVariable Long canteenId) {

        return ResponseEntity.ok(
                foodItemService.getAvailableItemsByCanteen(canteenId));
    }
}