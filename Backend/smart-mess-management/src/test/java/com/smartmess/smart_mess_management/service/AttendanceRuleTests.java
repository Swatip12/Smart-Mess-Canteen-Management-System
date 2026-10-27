package com.smartmess.smart_mess_management.service;

import com.smartmess.smart_mess_management.entity.Attendance;
import com.smartmess.smart_mess_management.entity.Meal;
import com.smartmess.smart_mess_management.entity.Student;
import com.smartmess.smart_mess_management.repository.AttendanceRepository;
import com.smartmess.smart_mess_management.repository.MealRepository;
import com.smartmess.smart_mess_management.repository.StudentRepository;
import com.smartmess.smart_mess_management.serviceimpl.AttendanceServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Attendance Meal Eligibility & Duplicate Check-in Prevention Tests")
public class AttendanceRuleTests {

    @Mock
    private AttendanceRepository attendanceRepository;
    @Mock
    private StudentRepository studentRepository;
    @Mock
    private MealRepository mealRepository;

    @InjectMocks
    private AttendanceServiceImpl attendanceService;

    private Student testStudent;
    private Meal testMeal;
    private Attendance testAttendance;

    @BeforeEach
    void setUp() {
        testStudent = new Student();
        testStudent.setId(10L);
        testStudent.setName("Pooja Nair");

        testMeal = new Meal();
        testMeal.setId(2L);
        testMeal.setName("Dinner");

        testAttendance = new Attendance();
        testAttendance.setStudent(testStudent);
        testAttendance.setMeal(testMeal);
        testAttendance.setAttendanceDate(LocalDate.now());
        testAttendance.setIsPresent(true);
    }

    @Test
    @DisplayName("First-time attendance check-in succeeds")
    void testFirstAttendanceCheckInSucceeds() {
        when(attendanceRepository.existsByStudentIdAndMealIdAndAttendanceDate(10L, 2L, LocalDate.now()))
                .thenReturn(false);
        when(attendanceRepository.save(any(Attendance.class))).thenAnswer(i -> i.getArgument(0));

        Attendance saved = attendanceService.createAttendance(testAttendance);

        assertNotNull(saved);
        assertTrue(saved.getIsPresent());
        verify(attendanceRepository).save(testAttendance);
    }

    @Test
    @DisplayName("Duplicate attendance check-in on the same date and meal throws IllegalStateException")
    void testDuplicateAttendanceThrowsException() {
        when(attendanceRepository.existsByStudentIdAndMealIdAndAttendanceDate(10L, 2L, LocalDate.now()))
                .thenReturn(true);

        IllegalStateException ex = assertThrows(IllegalStateException.class, () -> {
            attendanceService.createAttendance(testAttendance);
        });

        assertTrue(ex.getMessage().contains("Attendance already recorded"));
        verify(attendanceRepository, never()).save(any());
    }
}
