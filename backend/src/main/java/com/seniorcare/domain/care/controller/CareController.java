package com.seniorcare.domain.care.controller;

import com.seniorcare.common.dto.ApiResponse;
import com.seniorcare.domain.care.dto.CareRequestDto;
import com.seniorcare.domain.care.dto.CaregiverDto;
import com.seniorcare.domain.care.service.CareService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/care")
@RequiredArgsConstructor
public class CareController {

    private final CareService careService;

    @GetMapping("/requests")
    public ResponseEntity<ApiResponse<List<CareRequestDto>>> getMyRequests(
            @AuthenticationPrincipal String userId) {
        List<CareRequestDto> requests = careService.getSeniorRequests(Long.parseLong(userId));
        return ResponseEntity.ok(ApiResponse.ok(requests));
    }

    @GetMapping("/requests/{requestId}")
    public ResponseEntity<ApiResponse<CareRequestDto>> getRequest(@PathVariable Long requestId) {
        CareRequestDto request = careService.getRequest(requestId);
        return ResponseEntity.ok(ApiResponse.ok(request));
    }

    @PostMapping("/requests")
    public ResponseEntity<ApiResponse<Void>> createRequest(
            @AuthenticationPrincipal String userId,
            @Valid @RequestBody CareRequestDto request) {
        request.setSeniorId(Long.parseLong(userId));
        careService.createRequest(request);
        return ResponseEntity.ok(ApiResponse.ok("돌봄 요청 등록 완료"));
    }

    @PatchMapping("/requests/{requestId}/status")
    public ResponseEntity<ApiResponse<Void>> updateStatus(
            @PathVariable Long requestId,
            @RequestParam String status) {
        careService.updateRequestStatus(requestId, status);
        return ResponseEntity.ok(ApiResponse.ok("상태 업데이트 완료"));
    }

    @GetMapping("/caregivers")
    public ResponseEntity<ApiResponse<List<CaregiverDto>>> findCaregivers(
            @RequestParam(required = false) String area,
            @RequestParam(required = false) String careType) {
        List<CaregiverDto> caregivers = careService.findCaregivers(area, careType);
        return ResponseEntity.ok(ApiResponse.ok(caregivers));
    }

    @PostMapping("/caregivers")
    public ResponseEntity<ApiResponse<Void>> registerCaregiver(
            @AuthenticationPrincipal String userId,
            @RequestBody CaregiverDto caregiver) {
        caregiver.setUserId(Long.parseLong(userId));
        careService.registerCaregiver(caregiver);
        return ResponseEntity.ok(ApiResponse.ok("돌보미 등록 완료"));
    }
}
