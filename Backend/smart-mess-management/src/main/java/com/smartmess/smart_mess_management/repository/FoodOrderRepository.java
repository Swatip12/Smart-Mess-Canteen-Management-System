package com.smartmess.smart_mess_management.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.smartmess.smart_mess_management.entity.FoodOrder;
import enums.OrderStatus;

public interface FoodOrderRepository extends JpaRepository<FoodOrder, Long> {

    @Query("SELECT f FROM FoodOrder f WHERE f.student.id = :studentId")
    List<FoodOrder> findByStudentId(@Param("studentId") Long studentId);

    List<FoodOrder> findByStatus(OrderStatus status);

    long countByStatus(OrderStatus status);

    @Query("SELECT f FROM FoodOrder f WHERE f.orderedAt >= :since ORDER BY f.orderedAt DESC")
    List<FoodOrder> findRecentOrders(@Param("since") LocalDateTime since);
}
