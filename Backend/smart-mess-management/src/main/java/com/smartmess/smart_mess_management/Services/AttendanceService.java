package com.smartmess.smart_mess_management.Services;


import java.time.LocalDate;
import java.util.List;

import com.smartmess.smart_mess_management.entity.Attendance;

public interface AttendanceService {

    Attendance createAttendance(Attendance attendance);

    Attendance getAttendanceById(Long id);

    List<Attendance> getAllAttendances();

    Attendance updateAttendance(Long id, Attendance attendance);

    void deleteAttendance(Long id);

    List<Attendance> getAttendanceByStudentAndDateRange(
            Long studentId,
            LocalDate from,
            LocalDate to);

    long countPresentByStudentAndMonth(
            Long studentId,
            int month,
            int year);
}