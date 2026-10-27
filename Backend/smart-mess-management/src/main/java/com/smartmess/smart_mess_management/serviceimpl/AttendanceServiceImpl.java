package com.smartmess.smart_mess_management.serviceimpl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.smartmess.smart_mess_management.Services.AttendanceService;
import com.smartmess.smart_mess_management.entity.Attendance;
import com.smartmess.smart_mess_management.repository.AttendanceRepository;
import com.smartmess.smart_mess_management.repository.MealRepository;
import com.smartmess.smart_mess_management.repository.StudentRepository;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;
    private final MealRepository mealRepository;

    public AttendanceServiceImpl(
            AttendanceRepository attendanceRepository,
            StudentRepository studentRepository,
            MealRepository mealRepository) {
        this.attendanceRepository = attendanceRepository;
        this.studentRepository = studentRepository;
        this.mealRepository = mealRepository;
    }

    @Override
    public Attendance createAttendance(Attendance attendance) {
        Long sId = attendance.getStudentId();
        if (sId == null && attendance.getStudent() != null) {
            sId = attendance.getStudent().getId();
        }
        if (sId != null) {
            studentRepository.findById(sId).ifPresent(attendance::setStudent);
        }

        Long mId = attendance.getMealId();
        if (mId == null && attendance.getMeal() != null) {
            mId = attendance.getMeal().getId();
        }
        if (mId != null) {
            mealRepository.findById(mId).ifPresent(attendance::setMeal);
        }

        if (attendance.getAttendanceDate() == null) {
            attendance.setAttendanceDate(LocalDate.now());
        }
        if (attendance.getIsPresent() == null) {
            attendance.setIsPresent(true);
        }

        if (attendance.getStudent() != null && attendance.getMeal() != null && attendance.getAttendanceDate() != null) {
            Long studentId = attendance.getStudent().getId();
            Long mealId = attendance.getMeal().getId();
            LocalDate date = attendance.getAttendanceDate();

            if (attendanceRepository.existsByStudentIdAndMealIdAndAttendanceDate(studentId, mealId, date)) {
                throw new IllegalStateException("Attendance already recorded for student #" + studentId + " for this meal on " + date);
            }
        }

        return attendanceRepository.save(attendance);
    }

    @Override
    public Attendance getAttendanceById(Long id) {
        return attendanceRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Attendance not found with id: " + id));
    }

    @Override
    public List<Attendance> getAllAttendances() {
        return attendanceRepository.findAll();
    }

    @Override
    public Attendance updateAttendance(Long id, Attendance attendance) {
        Attendance existing = getAttendanceById(id);

        if (attendance.getStudent() != null) {
            existing.setStudent(attendance.getStudent());
        } else if (attendance.getStudentId() != null) {
            studentRepository.findById(attendance.getStudentId()).ifPresent(existing::setStudent);
        }

        if (attendance.getMeal() != null) {
            existing.setMeal(attendance.getMeal());
        } else if (attendance.getMealId() != null) {
            mealRepository.findById(attendance.getMealId()).ifPresent(existing::setMeal);
        }

        if (attendance.getAttendanceDate() != null) {
            existing.setAttendanceDate(attendance.getAttendanceDate());
        }
        if (attendance.getIsPresent() != null) {
            existing.setIsPresent(attendance.getIsPresent());
        }

        return attendanceRepository.save(existing);
    }

    @Override
    public void deleteAttendance(Long id) {
        attendanceRepository.deleteById(id);
    }

    @Override
    public List<Attendance> getAttendanceByStudentAndDateRange(
            Long studentId,
            LocalDate from,
            LocalDate to) {
        return attendanceRepository.findByStudentIdAndAttendanceDateBetween(
                studentId, from, to);
    }

    @Override
    public long countPresentByStudentAndMonth(
            Long studentId,
            int month,
            int year) {
        LocalDate from = LocalDate.of(year, month, 1);
        LocalDate to = from.plusMonths(1).minusDays(1);
        return attendanceRepository.countByStudentIdAndAttendanceDateBetweenAndIsPresentTrue(
                studentId, from, to);
    }
}
