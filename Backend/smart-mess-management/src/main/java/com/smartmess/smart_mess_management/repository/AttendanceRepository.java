package com.smartmess.smart_mess_management.repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.smartmess.smart_mess_management.entity.Attendance;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    @Query("SELECT a FROM Attendance a WHERE a.student.id = :studentId AND a.attendanceDate BETWEEN :from AND :to")
    List<Attendance> findByStudentIdAndAttendanceDateBetween(
            @Param("studentId") Long studentId,
            @Param("from") LocalDate from,
            @Param("to") LocalDate to);

    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.student.id = :studentId AND a.attendanceDate BETWEEN :from AND :to AND a.isPresent = true")
    long countByStudentIdAndAttendanceDateBetweenAndIsPresentTrue(
            @Param("studentId") Long studentId,
            @Param("from") LocalDate from,
            @Param("to") LocalDate to);

    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM Attendance a WHERE a.student.id = :studentId AND a.meal.id = :mealId AND a.attendanceDate = :attendanceDate")
    boolean existsByStudentIdAndMealIdAndAttendanceDate(
            @Param("studentId") Long studentId,
            @Param("mealId") Long mealId,
            @Param("attendanceDate") LocalDate attendanceDate);
}
