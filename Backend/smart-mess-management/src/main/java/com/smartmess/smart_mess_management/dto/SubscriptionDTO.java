package com.smartmess.smart_mess_management.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

import enums.SubscriptionPlan;
import enums.SubscriptionStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubscriptionDTO {

    private Long id;

    private Long studentId;

    private Long messId;

    private LocalDate startDate;

    private LocalDate endDate;

    private SubscriptionPlan plan;

    private SubscriptionStatus status;

    private BigDecimal amount;
}