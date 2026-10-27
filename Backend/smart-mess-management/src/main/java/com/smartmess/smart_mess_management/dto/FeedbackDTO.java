package com.smartmess.smart_mess_management.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import enums.FeedbackCategory;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedbackDTO {

    private Long id;

    private Long studentId;

    private Long messId;

    @Min(1)
    @Max(5)
    private Integer rating;

    private String comment;

    private FeedbackCategory category;

    private LocalDateTime createdAt;
}