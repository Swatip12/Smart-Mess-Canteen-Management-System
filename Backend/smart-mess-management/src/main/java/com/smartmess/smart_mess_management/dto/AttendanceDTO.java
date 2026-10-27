package com.smartmess.smart_mess_management.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceDTO {

    private Long id;

    private Long studentId;

    private Long mealId;

    private LocalDate attendanceDate;

    private Boolean isPresent;

    private LocalDateTime markedAt;
}