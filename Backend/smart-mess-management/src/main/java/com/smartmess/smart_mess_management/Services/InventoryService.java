package com.smartmess.smart_mess_management.Services;

import java.util.List;
import com.smartmess.smart_mess_management.entity.InventoryItem;
import com.smartmess.smart_mess_management.entity.StockMovement;

public interface InventoryService {

    InventoryItem createItem(InventoryItem item);

    InventoryItem getItemById(Long id);

    List<InventoryItem> getAllItems();

    InventoryItem updateItem(Long id, InventoryItem item);

    void deleteItem(Long id);

    List<InventoryItem> getLowStockItems();

    StockMovement recordMovement(Long itemId, StockMovement movement);

    List<StockMovement> getMovementsByItem(Long itemId);
}
