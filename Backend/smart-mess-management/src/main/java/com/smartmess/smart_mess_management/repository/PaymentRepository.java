package com.smartmess.smart_mess_management.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.smartmess.smart_mess_management.entity.Payment;
import enums.PaymentStatus;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE p.status = :status")
    BigDecimal sumAmountByStatus(@Param("status") PaymentStatus status);

    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE p.status = :status AND p.paidAt >= :since")
    BigDecimal sumAmountByStatusAndPaidAtAfter(@Param("status") PaymentStatus status, @Param("since") LocalDateTime since);

    @Query("SELECT p FROM Payment p WHERE p.paidAt BETWEEN :startDate AND :endDate ORDER BY p.paidAt DESC")
    List<Payment> findByDateRange(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
}
