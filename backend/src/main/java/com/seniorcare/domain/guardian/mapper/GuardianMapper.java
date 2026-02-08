package com.seniorcare.domain.guardian.mapper;

import com.seniorcare.domain.guardian.dto.GuardianDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GuardianMapper {

    List<GuardianDto> findByGuardianUserId(@Param("guardianUserId") Long guardianUserId);

    List<GuardianDto> findBySeniorUserId(@Param("seniorUserId") Long seniorUserId);

    GuardianDto findById(@Param("guardianId") Long guardianId);

    void insertGuardian(GuardianDto guardian);

    void updateStatus(@Param("guardianId") Long guardianId,
                       @Param("status") String status);

    void deleteGuardian(@Param("guardianId") Long guardianId);
}
