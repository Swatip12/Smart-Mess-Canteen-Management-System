package com.smartmess.smart_mess_management.Services;


import java.util.List;

import com.smartmess.smart_mess_management.entity.FoodOrderItem;

public interface FoodOrderItemService {

    FoodOrderItem createOrderItem(FoodOrderItem orderItem);

    FoodOrderItem getOrderItemById(Long id);

    List<FoodOrderItem> getAllOrderItems();

    void deleteOrderItem(Long id);
}