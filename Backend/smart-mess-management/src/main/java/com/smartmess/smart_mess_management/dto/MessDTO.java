package com.smartmess.smart_mess_management.dto;

import enums.MessType;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessDTO {

    private Long id;

    @NotBlank
    private String name;

    private String location;

    private String contactNumber;

    private Integer capacity;

    private MessType type;

    private Long adminId;
}
