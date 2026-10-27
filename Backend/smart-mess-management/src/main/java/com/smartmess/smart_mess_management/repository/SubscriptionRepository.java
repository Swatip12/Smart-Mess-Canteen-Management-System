package com.smartmess.smart_mess_management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.smartmess.smart_mess_management.entity.Subscription;

import enums.SubscriptionStatus;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    @Query("SELECT s FROM Subscription s WHERE s.student.id = :studentId AND s.status = :status")
    List<Subscription> findByStudentIdAndStatus(
            @Param("studentId") Long studentId,
            @Param("status") SubscriptionStatus status);

    @Query("SELECT COUNT(s) > 0 FROM Subscription s WHERE s.student.id = :studentId AND s.mess.id = :messId AND s.status = :status")
    boolean existsByStudentIdAndMessIdAndStatus(
            @Param("studentId") Long studentId,
            @Param("messId") Long messId,
            @Param("status") SubscriptionStatus status);
}
