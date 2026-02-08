package com.seniorcare.domain.invitation.controller;

import com.seniorcare.common.dto.ApiResponse;
import com.seniorcare.domain.invitation.dto.*;
import com.seniorcare.domain.invitation.service.InvitationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/invitations")
@RequiredArgsConstructor
public class InvitationController {

    private final InvitationService invitationService;

    /**
     * [자녀] 어르신에게 초대 링크 생성
     */
    @PostMapping("/send")
    public ResponseEntity<ApiResponse<InviteResponse>> sendInvitation(
            @AuthenticationPrincipal String userId,
            @Valid @RequestBody InviteRequest request) {
        InviteResponse response = invitationService.createInvitation(Long.parseLong(userId), request);
        return ResponseEntity.ok(ApiResponse.ok("초대 링크가 생성되었습니다.", response));
    }

    /**
     * [자녀] 내가 보낸 초대 목록
     */
    @GetMapping("/sent")
    public ResponseEntity<ApiResponse<List<InvitationDto>>> getMyInvitations(
            @AuthenticationPrincipal String userId) {
        List<InvitationDto> invitations = invitationService.getMyInvitations(Long.parseLong(userId));
        return ResponseEntity.ok(ApiResponse.ok(invitations));
    }

    /**
     * [어르신] 초대 코드로 수락
     */
    @PostMapping("/accept/{inviteCode}")
    public ResponseEntity<ApiResponse<Void>> acceptInvitation(
            @AuthenticationPrincipal String userId,
            @PathVariable String inviteCode) {
        invitationService.acceptInvitation(Long.parseLong(userId), inviteCode);
        return ResponseEntity.ok(ApiResponse.ok("초대를 수락했습니다. 자녀와 연동되었습니다."));
    }

    /**
     * [어르신] 자녀 전화번호로 직접 연동 요청
     */
    @PostMapping("/link-child")
    public ResponseEntity<ApiResponse<Void>> linkByChildPhone(
            @AuthenticationPrincipal String userId,
            @Valid @RequestBody LinkChildRequest request) {
        invitationService.linkByChildPhone(Long.parseLong(userId), request);
        return ResponseEntity.ok(ApiResponse.ok("자녀에게 연동 요청을 보냈습니다."));
    }

    /**
     * 초대 코드 정보 조회 (가입 전 확인용)
     */
    @GetMapping("/code/{inviteCode}")
    public ResponseEntity<ApiResponse<InvitationDto>> getInvitationInfo(
            @PathVariable String inviteCode) {
        InvitationDto invitation = invitationService.getInvitationByCode(inviteCode);
        return ResponseEntity.ok(ApiResponse.ok(invitation));
    }
}
