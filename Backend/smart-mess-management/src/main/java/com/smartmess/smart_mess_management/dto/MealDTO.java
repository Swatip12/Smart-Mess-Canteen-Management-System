package com.smartmess.smart_mess_management.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MealDTO {

    private Long id;

    @NotBlank
    private String name;

    private String description;

    private String serveTime;

    private Long messId;
}