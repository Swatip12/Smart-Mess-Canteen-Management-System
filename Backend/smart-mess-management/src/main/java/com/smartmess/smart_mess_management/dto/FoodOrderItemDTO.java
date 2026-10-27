package com.smartmess.smart_mess_management.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodOrderItemDTO {

    private Long id;

    private Long foodOrderId;

    private Long foodItemId;

    private Integer quantity;

    private BigDecimal unitPrice;

    private BigDecimal subTotal;
}