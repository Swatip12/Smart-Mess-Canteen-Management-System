package com.smartmess.smart_mess_management.Services;

import java.util.List;

import com.smartmess.smart_mess_management.entity.FoodItem;

public interface FoodItemService {

    FoodItem createFoodItem(FoodItem foodItem);

    FoodItem getFoodItemById(Long id);

    List<FoodItem> getAllFoodItems();

    FoodItem updateFoodItem(Long id, FoodItem foodItem);

    void deleteFoodItem(Long id);

    List<FoodItem> getAvailableItemsByCanteen(Long canteenId);
}