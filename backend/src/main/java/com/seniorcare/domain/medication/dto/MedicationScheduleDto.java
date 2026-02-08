package com.seniorcare.domain.medication.dto;

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
public class MedicationScheduleDto {

    private Long scheduleId;
    private Long medicationId;
    private String scheduledTime;   // HH:mm 형식
    private String dayOfWeek;       // MON, TUE, ... 또는 DAILY
    private boolean taken;
    private String takenAt;
    private String createdAt;
}
