package com.smartmess.smart_mess_management.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuDTO {

    private Long id;

    @NotNull
    private LocalDate menuDate;

    private DayOfWeek dayOfWeek;

    private Long messId;

    private Long mealId;

    private String items;
}