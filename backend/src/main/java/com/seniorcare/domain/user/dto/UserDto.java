package com.seniorcare.domain.user.dto;

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
public class UserDto {

    private Long userId;
    private String email;
    private String password;
    private String name;
    private String phone;
    private String role;        // SENIOR, CHILD (자녀)
    private String provider;    // LOCAL, KAKAO, NAVER
    private String profileImage;
    private String createdAt;

    // 가입 시에만 사용 (자녀: 어르신 전화번호, 어르신: 자녀 전화번호)
    private String linkedPhone;
    // 초대 코드 (어르신이 초대 링크로 가입 시)
    private String inviteCode;
}
