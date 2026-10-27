package com.smartmess.smart_mess_management.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import enums.OrderStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodOrderDTO {

    private Long id;

    private Long studentId;

    private Long canteenId;

    private OrderStatus status;

    private BigDecimal totalAmount;

    private LocalDateTime orderedAt;

    private List<FoodOrderItemDTO> orderItems;
}