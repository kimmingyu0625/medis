package com.seniorcare.domain.invitation.service;

import com.seniorcare.common.exception.BusinessException;
import com.seniorcare.domain.guardian.mapper.GuardianMapper;
import com.seniorcare.domain.guardian.dto.GuardianDto;
import com.seniorcare.domain.invitation.dto.*;
import com.seniorcare.domain.invitation.mapper.InvitationMapper;
import com.seniorcare.domain.user.dto.UserDto;
import com.seniorcare.domain.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class InvitationService {

    private final InvitationMapper invitationMapper;
    private final UserMapper userMapper;
    private final GuardianMapper guardianMapper;

    private static final DateTimeFormatter FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    /**
     * 자녀가 어르신에게 초대 링크를 생성
     */
    public InviteResponse createInvitation(Long childUserId, InviteRequest request) {
        String inviteCode = UUID.randomUUID().toString().replace("-", "").substring(0, 12).toUpperCase();
        LocalDateTime expiredAt = LocalDateTime.now().plusDays(7);

        InvitationDto invitation = InvitationDto.builder()
                .inviteCode(inviteCode)
                .inviterUserId(childUserId)
                .inviteePhone(request.getSeniorPhone())
                .relationship(request.getRelationship() != null ? request.getRelationship() : "CHILD")
                .status("PENDING")
                .expiredAt(expiredAt.format(FORMATTER))
                .build();

        invitationMapper.insertInvitation(invitation);

        String inviteLink = "seniorcare://invite/" + inviteCode;

        return InviteResponse.builder()
                .inviteCode(inviteCode)
                .inviteLink(inviteLink)
                .expiredAt(expiredAt.format(FORMATTER))
                .build();
    }

    /**
     * 어르신이 초대 코드로 수락 (가입 후)
     */
    public void acceptInvitation(Long seniorUserId, String inviteCode) {
        InvitationDto invitation = invitationMapper.findByInviteCode(inviteCode);
        if (invitation == null) {
            throw new BusinessException("유효하지 않은 초대 코드입니다.", HttpStatus.NOT_FOUND);
        }
        if (!"PENDING".equals(invitation.getStatus())) {
            throw new BusinessException("이미 처리된 초대입니다.");
        }

        // 초대 상태 업데이트
        invitationMapper.updateInviteeUserId(invitation.getInvitationId(), seniorUserId);
        invitationMapper.updateStatus(invitation.getInvitationId(), "ACCEPTED");

        // 보호자 관계 자동 생성 (자녀 → 어르신)
        GuardianDto guardian = GuardianDto.builder()
                .guardianUserId(invitation.getInviterUserId())
                .seniorUserId(seniorUserId)
                .relationship(invitation.getRelationship())
                .status("ACCEPTED")
                .build();
        guardianMapper.insertGuardian(guardian);
    }

    /**
     * 어르신이 자녀 전화번호로 직접 연동 요청
     */
    public void linkByChildPhone(Long seniorUserId, LinkChildRequest request) {
        UserDto child = userMapper.findByPhone(request.getChildPhone());
        if (child == null) {
            throw new BusinessException("해당 전화번호로 가입된 자녀를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        }
        if (!"CHILD".equals(child.getRole())) {
            throw new BusinessException("해당 사용자는 자녀 계정이 아닙니다.");
        }

        // 보호자 관계 생성 (승인 대기)
        GuardianDto guardian = GuardianDto.builder()
                .guardianUserId(child.getUserId())
                .seniorUserId(seniorUserId)
                .relationship(request.getRelationship() != null ? request.getRelationship() : "CHILD")
                .status("PENDING")
                .build();
        guardianMapper.insertGuardian(guardian);
    }

    /**
     * 어르신이 가입 시 전화번호에 연결된 대기 중인 초대가 있으면 자동 연동
     */
    public void autoLinkOnRegister(Long seniorUserId, String phone) {
        List<InvitationDto> pendingInvitations = invitationMapper.findPendingByPhone(phone);
        for (InvitationDto invitation : pendingInvitations) {
            acceptInvitation(seniorUserId, invitation.getInviteCode());
        }
    }

    /**
     * 자녀가 보낸 초대 목록 조회
     */
    public List<InvitationDto> getMyInvitations(Long childUserId) {
        return invitationMapper.findByInviterUserId(childUserId);
    }

    /**
     * 초대 코드 정보 조회
     */
    public InvitationDto getInvitationByCode(String inviteCode) {
        InvitationDto invitation = invitationMapper.findByInviteCode(inviteCode);
        if (invitation == null) {
            throw new BusinessException("유효하지 않은 초대 코드입니다.", HttpStatus.NOT_FOUND);
        }
        return invitation;
    }
}
