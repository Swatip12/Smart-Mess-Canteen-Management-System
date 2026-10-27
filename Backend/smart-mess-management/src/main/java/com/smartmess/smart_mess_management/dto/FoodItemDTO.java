package com.smartmess.smart_mess_management.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

import enums.FoodCategory;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodItemDTO {

    private Long id;

    @NotBlank
    private String name;

    private String description;

    @NotNull
    private BigDecimal price;

    private FoodCategory category;

    private Boolean isAvailable;

    private String imageUrl;

    private Long canteenId;
}