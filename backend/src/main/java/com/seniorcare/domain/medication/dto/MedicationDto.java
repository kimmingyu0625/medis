package com.seniorcare.domain.medication.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicationDto {

    private Long medicationId;
    private Long userId;

    @NotBlank(message = "약 이름을 입력해주세요.")
    private String name;

    private String dosage;
    private String description;
    private String startDate;
    private String endDate;
    private String createdAt;
}
