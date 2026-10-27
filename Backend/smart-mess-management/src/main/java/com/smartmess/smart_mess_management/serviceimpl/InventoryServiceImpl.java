package com.smartmess.smart_mess_management.serviceimpl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smartmess.smart_mess_management.Services.InventoryService;
import com.smartmess.smart_mess_management.entity.InventoryItem;
import com.smartmess.smart_mess_management.entity.StockMovement;
import com.smartmess.smart_mess_management.repository.InventoryItemRepository;
import com.smartmess.smart_mess_management.repository.MessRepository;
import com.smartmess.smart_mess_management.repository.StockMovementRepository;

import enums.StockMovementType;

@Service
public class InventoryServiceImpl implements InventoryService {

    private final InventoryItemRepository inventoryItemRepository;
    private final StockMovementRepository stockMovementRepository;
    private final MessRepository messRepository;

    public InventoryServiceImpl(
            InventoryItemRepository inventoryItemRepository,
            StockMovementRepository stockMovementRepository,
            MessRepository messRepository) {
        this.inventoryItemRepository = inventoryItemRepository;
        this.stockMovementRepository = stockMovementRepository;
        this.messRepository = messRepository;
    }

    @Override
    public InventoryItem createItem(InventoryItem item) {
        if (item.getMessId() != null) {
            messRepository.findById(item.getMessId()).ifPresent(item::setMess);
        } else if (item.getMess() != null && item.getMess().getId() != null) {
            messRepository.findById(item.getMess().getId()).ifPresent(item::setMess);
        }

        if (item.getQuantity() == null) {
            item.setQuantity(0.0);
        }
        if (item.getMinimumThreshold() == null) {
            item.setMinimumThreshold(10.0);
        }
        item.setLastRestockedAt(LocalDateTime.now());
        return inventoryItemRepository.save(item);
    }

    @Override
    public InventoryItem getItemById(Long id) {
        return inventoryItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory item not found with id: " + id));
    }

    @Override
    public List<InventoryItem> getAllItems() {
        return inventoryItemRepository.findAll();
    }

    @Override
    public InventoryItem updateItem(Long id, InventoryItem item) {
        InventoryItem existing = getItemById(id);

        if (item.getName() != null) existing.setName(item.getName());
        if (item.getCategory() != null) existing.setCategory(item.getCategory());
        if (item.getQuantity() != null) existing.setQuantity(item.getQuantity());
        if (item.getUnit() != null) existing.setUnit(item.getUnit());
        if (item.getMinimumThreshold() != null) existing.setMinimumThreshold(item.getMinimumThreshold());
        if (item.getUnitCost() != null) existing.setUnitCost(item.getUnitCost());

        if (item.getMessId() != null) {
            messRepository.findById(item.getMessId()).ifPresent(existing::setMess);
        }

        return inventoryItemRepository.save(existing);
    }

    @Override
    public void deleteItem(Long id) {
        inventoryItemRepository.deleteById(id);
    }

    @Override
    public List<InventoryItem> getLowStockItems() {
        return inventoryItemRepository.findLowStockItems();
    }

    @Override
    @Transactional
    public StockMovement recordMovement(Long itemId, StockMovement movement) {
        InventoryItem item = getItemById(itemId);

        Double qty = movement.getQuantity();
        if (qty == null || qty <= 0) {
            throw new IllegalArgumentException("Movement quantity must be greater than zero");
        }

        StockMovementType type = movement.getType();
        if (type == null) {
            throw new IllegalArgumentException("Movement type is required");
        }

        if (type == StockMovementType.PURCHASE) {
            item.setQuantity(item.getQuantity() + qty);
            item.setLastRestockedAt(LocalDateTime.now());
        } else if (type == StockMovementType.CONSUMPTION || type == StockMovementType.WASTAGE) {
            if (item.getQuantity() < qty) {
                throw new IllegalArgumentException(
                        "Insufficient stock. Available: " + item.getQuantity() + " " + item.getUnit() + ", requested: " + qty);
            }
            item.setQuantity(item.getQuantity() - qty);
        } else if (type == StockMovementType.ADJUSTMENT) {
            item.setQuantity(qty);
        }

        inventoryItemRepository.save(item);

        movement.setInventoryItem(item);
        if (movement.getMovementDate() == null) {
            movement.setMovementDate(LocalDateTime.now());
        }

        return stockMovementRepository.save(movement);
    }

    @Override
    public List<StockMovement> getMovementsByItem(Long itemId) {
        return stockMovementRepository.findByInventoryItemId(itemId);
    }
}
