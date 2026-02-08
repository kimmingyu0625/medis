package com.seniorcare.domain.medication.controller;

import com.seniorcare.common.dto.ApiResponse;
import com.seniorcare.domain.medication.dto.MedicationDto;
import com.seniorcare.domain.medication.dto.MedicationScheduleDto;
import com.seniorcare.domain.medication.service.MedicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medications")
@RequiredArgsConstructor
public class MedicationController {

    private final MedicationService medicationService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<MedicationDto>>> getMedications(
            @AuthenticationPrincipal String userId) {
        List<MedicationDto> medications = medicationService.getMedications(Long.parseLong(userId));
        return ResponseEntity.ok(ApiResponse.ok(medications));
    }

    @GetMapping("/{medicationId}")
    public ResponseEntity<ApiResponse<MedicationDto>> getMedication(
            @PathVariable Long medicationId) {
        MedicationDto medication = medicationService.getMedication(medicationId);
        return ResponseEntity.ok(ApiResponse.ok(medication));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Void>> addMedication(
            @AuthenticationPrincipal String userId,
            @Valid @RequestBody MedicationDto medication) {
        medication.setUserId(Long.parseLong(userId));
        medicationService.addMedication(medication);
        return ResponseEntity.ok(ApiResponse.ok("약 등록 완료"));
    }

    @PutMapping("/{medicationId}")
    public ResponseEntity<ApiResponse<Void>> updateMedication(
            @PathVariable Long medicationId,
            @Valid @RequestBody MedicationDto medication) {
        medication.setMedicationId(medicationId);
        medicationService.updateMedication(medication);
        return ResponseEntity.ok(ApiResponse.ok("약 정보 수정 완료"));
    }

    @DeleteMapping("/{medicationId}")
    public ResponseEntity<ApiResponse<Void>> deleteMedication(@PathVariable Long medicationId) {
        medicationService.deleteMedication(medicationId);
        return ResponseEntity.ok(ApiResponse.ok("약 삭제 완료"));
    }

    @GetMapping("/schedules/today")
    public ResponseEntity<ApiResponse<List<MedicationScheduleDto>>> getTodaySchedules(
            @AuthenticationPrincipal String userId) {
        List<MedicationScheduleDto> schedules =
                medicationService.getTodaySchedules(Long.parseLong(userId));
        return ResponseEntity.ok(ApiResponse.ok(schedules));
    }

    @PostMapping("/{medicationId}/schedules")
    public ResponseEntity<ApiResponse<Void>> addSchedule(
            @PathVariable Long medicationId,
            @RequestBody MedicationScheduleDto schedule) {
        schedule.setMedicationId(medicationId);
        medicationService.addSchedule(schedule);
        return ResponseEntity.ok(ApiResponse.ok("스케줄 등록 완료"));
    }

    @PatchMapping("/schedules/{scheduleId}/taken")
    public ResponseEntity<ApiResponse<Void>> markAsTaken(
            @PathVariable Long scheduleId,
            @RequestParam boolean taken) {
        medicationService.markAsTaken(scheduleId, taken);
        return ResponseEntity.ok(ApiResponse.ok("복용 상태 업데이트 완료"));
    }
}
