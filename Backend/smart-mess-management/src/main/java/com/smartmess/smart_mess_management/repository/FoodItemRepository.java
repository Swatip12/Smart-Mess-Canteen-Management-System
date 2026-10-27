package com.smartmess.smart_mess_management.repository;

import com.smartmess.smart_mess_management.entity.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {

    List<FoodItem> findByCategory(String category);

    List<FoodItem> findByIsAvailable(Boolean isAvailable);

    @Query("SELECT f FROM FoodItem f WHERE f.canteen.id = :canteenId AND f.isAvailable = true")
    List<FoodItem> findByCanteenIdAndIsAvailableTrue(@Param("canteenId") Long canteenId);
}
