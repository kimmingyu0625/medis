package com.seniorcare.domain.user.controller;

import com.seniorcare.common.dto.ApiResponse;
import com.seniorcare.domain.user.dto.LoginRequest;
import com.seniorcare.domain.user.dto.LoginResponse;
import com.seniorcare.domain.user.dto.UserDto;
import com.seniorcare.domain.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/auth/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = userService.login(request);
        return ResponseEntity.ok(ApiResponse.ok("로그인 성공", response));
    }

    @PostMapping("/auth/register")
    public ResponseEntity<ApiResponse<Void>> register(@Valid @RequestBody UserDto userDto) {
        userService.register(userDto);
        return ResponseEntity.ok(ApiResponse.ok("회원가입 성공"));
    }

    @GetMapping("/users/me")
    public ResponseEntity<ApiResponse<UserDto>> getMyInfo(@AuthenticationPrincipal String userId) {
        UserDto user = userService.getUserById(Long.parseLong(userId));
        return ResponseEntity.ok(ApiResponse.ok(user));
    }

    @PutMapping("/users/me")
    public ResponseEntity<ApiResponse<Void>> updateMyInfo(@AuthenticationPrincipal String userId,
                                                          @Valid @RequestBody UserDto userDto) {
        userDto.setUserId(Long.parseLong(userId));
        userService.updateUser(userDto);
        return ResponseEntity.ok(ApiResponse.ok("정보 수정 완료"));
    }
}
