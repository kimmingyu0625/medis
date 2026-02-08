package com.seniorcare.domain.user.service;

import com.seniorcare.common.exception.BusinessException;
import com.seniorcare.config.JwtTokenProvider;
import com.seniorcare.domain.invitation.dto.InviteRequest;
import com.seniorcare.domain.invitation.dto.LinkChildRequest;
import com.seniorcare.domain.invitation.service.InvitationService;
import com.seniorcare.domain.user.dto.LoginRequest;
import com.seniorcare.domain.user.dto.LoginResponse;
import com.seniorcare.domain.user.dto.UserDto;
import com.seniorcare.domain.user.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final InvitationService invitationService;

    public LoginResponse login(LoginRequest request) {
        UserDto user = userMapper.findByEmail(request.getEmail());
        if (user == null) {
            throw new BusinessException("존재하지 않는 계정입니다.", HttpStatus.UNAUTHORIZED);
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BusinessException("비밀번호가 올바르지 않습니다.", HttpStatus.UNAUTHORIZED);
        }

        String accessToken = jwtTokenProvider.createAccessToken(user.getUserId(), user.getRole());
        String refreshToken = jwtTokenProvider.createRefreshToken(user.getUserId());

        // 응답에서 비밀번호 제거
        user.setPassword(null);

        return LoginResponse.of(accessToken, refreshToken, user);
    }

    public UserDto getUserById(Long userId) {
        UserDto user = userMapper.findById(userId);
        if (user == null) {
            throw new BusinessException("사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        }
        return user;
    }

    /**
     * 회원가입 (역할별 분기 처리)
     * - CHILD(자녀): 가입 후 어르신 전화번호로 초대 링크 생성
     * - SENIOR(어르신): 가입 후 자녀 전화번호 연동 또는 초대 코드 수락
     */
    public void register(UserDto userDto) {
        UserDto existing = userMapper.findByEmail(userDto.getEmail());
        if (existing != null) {
            throw new BusinessException("이미 등록된 이메일입니다.");
        }

        // 비밀번호 암호화
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        if (userDto.getProvider() == null) {
            userDto.setProvider("LOCAL");
        }

        userMapper.insertUser(userDto);

        // 자녀 가입: 어르신 전화번호가 있으면 초대 링크 자동 생성
        if ("CHILD".equals(userDto.getRole()) && StringUtils.hasText(userDto.getLinkedPhone())) {
            InviteRequest inviteRequest = new InviteRequest();
            inviteRequest.setSeniorPhone(userDto.getLinkedPhone());
            inviteRequest.setRelationship("CHILD");
            invitationService.createInvitation(userDto.getUserId(), inviteRequest);
        }

        // 어르신 가입: 초대 코드가 있으면 자동 수락
        if ("SENIOR".equals(userDto.getRole()) && StringUtils.hasText(userDto.getInviteCode())) {
            invitationService.acceptInvitation(userDto.getUserId(), userDto.getInviteCode());
        }

        // 어르신 가입: 자녀 전화번호로 직접 연동 요청
        if ("SENIOR".equals(userDto.getRole()) && StringUtils.hasText(userDto.getLinkedPhone())) {
            LinkChildRequest linkRequest = new LinkChildRequest();
            linkRequest.setChildPhone(userDto.getLinkedPhone());
            linkRequest.setRelationship("CHILD");
            invitationService.linkByChildPhone(userDto.getUserId(), linkRequest);
        }

        // 어르신 가입: 전화번호에 매칭되는 대기 중 초대가 있으면 자동 연동
        if ("SENIOR".equals(userDto.getRole()) && StringUtils.hasText(userDto.getPhone())) {
            invitationService.autoLinkOnRegister(userDto.getUserId(), userDto.getPhone());
        }
    }

    public void updateUser(UserDto userDto) {
        userMapper.updateUser(userDto);
    }
}
