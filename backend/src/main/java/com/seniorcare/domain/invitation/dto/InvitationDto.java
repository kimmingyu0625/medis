package com.seniorcare.domain.invitation.dto;

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
public class InvitationDto {

    private Long invitationId;
    private String inviteCode;
    private Long inviterUserId;
    private String inviteePhone;
    private Long inviteeUserId;
    private String relationship;
    private String status;          // PENDING, ACCEPTED, EXPIRED
    private String expiredAt;
    private String createdAt;

    // 조회 시 조인 결과
    private String inviterName;
}
