package com.seniorcare.domain.user.mapper;

import com.seniorcare.domain.user.dto.UserDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {

    UserDto findById(@Param("userId") Long userId);

    UserDto findByEmail(@Param("email") String email);

    UserDto findByProviderAndProviderId(@Param("provider") String provider,
                                        @Param("providerId") String providerId);

    void insertUser(UserDto user);

    void updateUser(UserDto user);

    UserDto findByPhone(@Param("phone") String phone);

    void deleteUser(@Param("userId") Long userId);
}
