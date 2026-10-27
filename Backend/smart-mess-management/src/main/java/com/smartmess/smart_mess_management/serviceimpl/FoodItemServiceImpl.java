package com.smartmess.smart_mess_management.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.smartmess.smart_mess_management.Services.FoodItemService;
import com.smartmess.smart_mess_management.entity.FoodItem;
import com.smartmess.smart_mess_management.repository.CanteenRepository;
import com.smartmess.smart_mess_management.repository.FoodItemRepository;

@Service
public class FoodItemServiceImpl implements FoodItemService {

    private final FoodItemRepository foodItemRepository;
    private final CanteenRepository canteenRepository;

    public FoodItemServiceImpl(FoodItemRepository foodItemRepository, CanteenRepository canteenRepository) {
        this.foodItemRepository = foodItemRepository;
        this.canteenRepository = canteenRepository;
    }

    @Override
    public FoodItem createFoodItem(FoodItem foodItem) {
        Long cId = foodItem.getCanteenId();
        if (cId == null && foodItem.getCanteen() != null) {
            cId = foodItem.getCanteen().getId();
        }
        if (cId != null) {
            canteenRepository.findById(cId).ifPresent(foodItem::setCanteen);
        }
        if (foodItem.getIsAvailable() == null) {
            foodItem.setIsAvailable(true);
        }
        return foodItemRepository.save(foodItem);
    }

    @Override
    public FoodItem getFoodItemById(Long id) {
        return foodItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("FoodItem not found with id: " + id));
    }

    @Override
    public List<FoodItem> getAllFoodItems() {
        return foodItemRepository.findAll();
    }

    @Override
    public FoodItem updateFoodItem(Long id, FoodItem foodItem) {
        FoodItem existing = getFoodItemById(id);

        existing.setName(foodItem.getName());
        existing.setDescription(foodItem.getDescription());
        existing.setPrice(foodItem.getPrice());
        existing.setCategory(foodItem.getCategory());
        existing.setIsAvailable(foodItem.getIsAvailable());
        existing.setImageUrl(foodItem.getImageUrl());

        if (foodItem.getCanteen() != null) {
            existing.setCanteen(foodItem.getCanteen());
        } else if (foodItem.getCanteenId() != null) {
            canteenRepository.findById(foodItem.getCanteenId()).ifPresent(existing::setCanteen);
        }

        return foodItemRepository.save(existing);
    }

    @Override
    public void deleteFoodItem(Long id) {
        foodItemRepository.deleteById(id);
    }

    @Override
    public List<FoodItem> getAvailableItemsByCanteen(Long canteenId) {
        return foodItemRepository.findByCanteenIdAndIsAvailableTrue(canteenId);
    }
}
