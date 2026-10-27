package com.smartmess.smart_mess_management.Controllers;

import com.smartmess.smart_mess_management.Services.AttendanceService;
import com.smartmess.smart_mess_management.entity.Attendance;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @PostMapping
    public ResponseEntity<Attendance> create(
            @RequestBody Attendance attendance) {

        return ResponseEntity.ok(
                attendanceService.createAttendance(attendance));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Attendance> getById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                attendanceService.getAttendanceById(id));
    }

    @GetMapping
    public ResponseEntity<List<Attendance>> getAll() {

        return ResponseEntity.ok(
                attendanceService.getAllAttendances());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Attendance> update(
            @PathVariable Long id,
            @RequestBody Attendance attendance) {

        return ResponseEntity.ok(
                attendanceService.updateAttendance(id, attendance));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id) {

        attendanceService.deleteAttendance(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Attendance>> getByStudentAndDateRange(
            @PathVariable Long studentId,
            @RequestParam LocalDate from,
            @RequestParam LocalDate to) {

        return ResponseEntity.ok(
                attendanceService.getAttendanceByStudentAndDateRange(
                        studentId, from, to));
    }

    @GetMapping("/student/{studentId}/count")
    public ResponseEntity<Long> countPresentByStudentAndMonth(
            @PathVariable Long studentId,
            @RequestParam int month,
            @RequestParam int year) {

        return ResponseEntity.ok(
                attendanceService.countPresentByStudentAndMonth(
                        studentId, month, year));
    }
}
