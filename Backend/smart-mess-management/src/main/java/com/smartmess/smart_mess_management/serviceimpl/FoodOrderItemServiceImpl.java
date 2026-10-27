package com.smartmess.smart_mess_management.serviceimpl;


import com.smartmess.smart_mess_management.Services.FoodOrderItemService;
import com.smartmess.smart_mess_management.entity.FoodOrderItem;
import com.smartmess.smart_mess_management.repository.FoodOrderItemRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodOrderItemServiceImpl implements FoodOrderItemService {

    private final FoodOrderItemRepository foodOrderItemRepository;

    public FoodOrderItemServiceImpl(FoodOrderItemRepository foodOrderItemRepository) {
        this.foodOrderItemRepository = foodOrderItemRepository;
    }

    @Override
    public FoodOrderItem createOrderItem(FoodOrderItem orderItem) {
        return foodOrderItemRepository.save(orderItem);
    }

    @Override
    public FoodOrderItem getOrderItemById(Long id) {
        return foodOrderItemRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("FoodOrderItem not found"));
    }

    @Override
    public List<FoodOrderItem> getAllOrderItems() {
        return foodOrderItemRepository.findAll();
    }

    @Override
    public void deleteOrderItem(Long id) {
        if (!foodOrderItemRepository.existsById(id)) {
            throw new RuntimeException("FoodOrderItem not found");
        }

        foodOrderItemRepository.deleteById(id);
    }
}
