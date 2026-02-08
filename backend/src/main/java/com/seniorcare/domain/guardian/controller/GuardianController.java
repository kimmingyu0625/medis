package com.seniorcare.domain.guardian.controller;

import com.seniorcare.common.dto.ApiResponse;
import com.seniorcare.domain.guardian.dto.GuardianDto;
import com.seniorcare.domain.guardian.service.GuardianService;
import com.seniorcare.domain.medication.dto.MedicationScheduleDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/guardians")
@RequiredArgsConstructor
public class GuardianController {

    private final GuardianService guardianService;

    @GetMapping("/wards")
    public ResponseEntity<ApiResponse<List<GuardianDto>>> getMyWards(
            @AuthenticationPrincipal String userId) {
        List<GuardianDto> wards = guardianService.getMyWards(Long.parseLong(userId));
        return ResponseEntity.ok(ApiResponse.ok(wards));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<GuardianDto>>> getMyGuardians(
            @AuthenticationPrincipal String userId) {
        List<GuardianDto> guardians = guardianService.getMyGuardians(Long.parseLong(userId));
        return ResponseEntity.ok(ApiResponse.ok(guardians));
    }

    @PostMapping("/request")
    public ResponseEntity<ApiResponse<Void>> requestGuardian(
            @AuthenticationPrincipal String userId,
            @RequestBody GuardianDto guardian) {
        guardian.setGuardianUserId(Long.parseLong(userId));
        guardianService.requestGuardian(guardian);
        return ResponseEntity.ok(ApiResponse.ok("보호자 연동 요청 완료"));
    }

    @PatchMapping("/{guardianId}/respond")
    public ResponseEntity<ApiResponse<Void>> respondToRequest(
            @PathVariable Long guardianId,
            @RequestParam String status) {
        guardianService.respondToRequest(guardianId, status);
        return ResponseEntity.ok(ApiResponse.ok("응답 완료"));
    }

    @DeleteMapping("/{guardianId}")
    public ResponseEntity<ApiResponse<Void>> removeGuardian(@PathVariable Long guardianId) {
        guardianService.removeGuardian(guardianId);
        return ResponseEntity.ok(ApiResponse.ok("보호자 연동 해제 완료"));
    }

    @GetMapping("/wards/{seniorUserId}/schedules/today")
    public ResponseEntity<ApiResponse<List<MedicationScheduleDto>>> getSeniorSchedules(
            @AuthenticationPrincipal String userId,
            @PathVariable Long seniorUserId) {
        List<MedicationScheduleDto> schedules =
                guardianService.getSeniorTodaySchedules(Long.parseLong(userId), seniorUserId);
        return ResponseEntity.ok(ApiResponse.ok(schedules));
    }
}
