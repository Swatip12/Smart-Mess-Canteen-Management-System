package com.smartmess.smart_mess_management.Services;

import java.util.List;

import com.smartmess.smart_mess_management.entity.Meal;

public interface MealService {

    Meal createMeal(Meal meal);

    Meal getMealById(Long id);

    List<Meal> getAllMeals();

    Meal updateMeal(Long id, Meal meal);

    void deleteMeal(Long id);
}