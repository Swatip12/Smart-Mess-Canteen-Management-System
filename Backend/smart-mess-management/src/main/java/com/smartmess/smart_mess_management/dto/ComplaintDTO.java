package com.smartmess.smart_mess_management.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import enums.ComplaintCategory;
import enums.ComplaintStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ComplaintDTO {

    private Long id;

    private Long studentId;

    private String title;

    private String description;

    private ComplaintStatus status;

    private ComplaintCategory category;

    private String resolution;

    private LocalDateTime createdAt;

    private LocalDateTime resolvedAt;
}