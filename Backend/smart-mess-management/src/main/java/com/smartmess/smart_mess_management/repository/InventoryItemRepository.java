package com.smartmess.smart_mess_management.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.smartmess.smart_mess_management.entity.InventoryItem;
import enums.InventoryCategory;

public interface InventoryItemRepository extends JpaRepository<InventoryItem, Long> {

    List<InventoryItem> findByCategory(InventoryCategory category);

    @Query("SELECT i FROM InventoryItem i WHERE i.mess.id = :messId")
    List<InventoryItem> findByMessId(@Param("messId") Long messId);

    @Query("SELECT i FROM InventoryItem i WHERE i.quantity <= i.minimumThreshold")
    List<InventoryItem> findLowStockItems();
}
