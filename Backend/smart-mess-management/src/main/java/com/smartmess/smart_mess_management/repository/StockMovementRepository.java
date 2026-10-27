package com.smartmess.smart_mess_management.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.smartmess.smart_mess_management.entity.StockMovement;

public interface StockMovementRepository extends JpaRepository<StockMovement, Long> {

    @Query("SELECT s FROM StockMovement s WHERE s.inventoryItem.id = :itemId ORDER BY s.movementDate DESC")
    List<StockMovement> findByInventoryItemId(@Param("itemId") Long itemId);
}
