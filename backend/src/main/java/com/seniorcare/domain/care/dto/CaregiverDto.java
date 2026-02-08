package com.seniorcare.domain.care.dto;

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
public class CaregiverDto {

    private Long caregiverId;
    private Long userId;
    private String name;
    private String specialization;
    private String certification;
    private Integer experienceYears;
    private String introduction;
    private String availableArea;
    private Double rating;
    private Integer reviewCount;
    private String profileImage;
}
