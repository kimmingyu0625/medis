package com.seniorcare.domain.invitation.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InviteRequest {

    @NotBlank(message = "어르신 전화번호를 입력해주세요.")
    private String seniorPhone;

    private String relationship;    // CHILD, SPOUSE, SIBLING, OTHER
}
