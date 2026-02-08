package com.seniorcare.domain.invitation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class InviteResponse {

    private String inviteCode;
    private String inviteLink;
    private String expiredAt;
}
