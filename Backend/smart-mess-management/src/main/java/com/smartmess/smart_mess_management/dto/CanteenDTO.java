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
public class CanteenDTO {

    private Long id;

    @NotBlank
    private String name;

    private String location;

    private String openingTime;

    private String closingTime;

    private String contactNumber;

    private Boolean isActive;

    private Long adminId;
}