package com.smartmess.smart_mess_management.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import enums.PaymentStatus;
import enums.PaymentType;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDTO {

    private Long id;

    private Long studentId;

    private BigDecimal amount;

    private PaymentType type;

    private PaymentStatus status;

    private String transactionId;

    private String paymentMethod;

    private LocalDateTime paidAt;
}