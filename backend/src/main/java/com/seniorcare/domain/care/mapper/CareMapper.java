package com.seniorcare.domain.care.mapper;

import com.seniorcare.domain.care.dto.CareRequestDto;
import com.seniorcare.domain.care.dto.CaregiverDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CareMapper {

    List<CareRequestDto> findRequestsBySeniorId(@Param("seniorId") Long seniorId);

    List<CareRequestDto> findRequestsByCaregiverId(@Param("caregiverId") Long caregiverId);

    CareRequestDto findRequestById(@Param("requestId") Long requestId);

    void insertRequest(CareRequestDto request);

    void updateRequestStatus(@Param("requestId") Long requestId,
                              @Param("status") String status);

    List<CaregiverDto> findAvailableCaregivers(@Param("area") String area,
                                                @Param("careType") String careType);

    CaregiverDto findCaregiverByUserId(@Param("userId") Long userId);

    void insertCaregiver(CaregiverDto caregiver);

    void updateCaregiver(CaregiverDto caregiver);
}
