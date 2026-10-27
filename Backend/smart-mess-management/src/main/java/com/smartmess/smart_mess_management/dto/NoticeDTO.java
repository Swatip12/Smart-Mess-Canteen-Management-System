package com.smartmess.smart_mess_management.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

import enums.NoticeType;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticeDTO {

    private Long id;

    @NotBlank
    private String title;

    private String content;

    private NoticeType type;

    private Long adminId;

    private LocalDate validUntil;

    private Boolean isActive;

    private LocalDateTime createdAt;
}