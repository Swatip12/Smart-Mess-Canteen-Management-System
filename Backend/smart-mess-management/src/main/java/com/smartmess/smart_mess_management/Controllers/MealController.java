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

import com.smartmess.smart_mess_management.Services.MealService;
import com.smartmess.smart_mess_management.entity.Meal;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/meals")
public class MealController {

    private final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @PostMapping
    public ResponseEntity<Meal> create(
            @Valid @RequestBody Meal meal) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(mealService.createMeal(meal));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meal> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                mealService.getMealById(id));
    }

    @GetMapping
    public ResponseEntity<List<Meal>> getAll() {

        return ResponseEntity.ok(
                mealService.getAllMeals());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Meal> update(
            @PathVariable Long id,
            @Valid @RequestBody Meal meal) {

        return ResponseEntity.ok(
                mealService.updateMeal(id, meal));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        mealService.deleteMeal(id);

        return ResponseEntity.noContent().build();
    }
}