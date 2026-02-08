package com.seniorcare.domain.care.dto;

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
public class CareRequestDto {

    private Long requestId;
    private Long seniorId;
    private Long caregiverId;

    @NotBlank(message = "돌봄 유형을 선택해주세요.")
    private String careType;        // DAILY, MEDICAL, COMPANION

    private String description;
    private String requestedDate;
    private String startTime;
    private String endTime;
    private String status;          // PENDING, ACCEPTED, REJECTED, COMPLETED, CANCELLED
    private String address;
    private String createdAt;
}
