package com.seniorcare.domain.care.service;

import com.seniorcare.common.exception.BusinessException;
import com.seniorcare.domain.care.dto.CareRequestDto;
import com.seniorcare.domain.care.dto.CaregiverDto;
import com.seniorcare.domain.care.mapper.CareMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CareService {

    private final CareMapper careMapper;

    public List<CareRequestDto> getSeniorRequests(Long seniorId) {
        return careMapper.findRequestsBySeniorId(seniorId);
    }

    public List<CareRequestDto> getCaregiverRequests(Long caregiverId) {
        return careMapper.findRequestsByCaregiverId(caregiverId);
    }

    public CareRequestDto getRequest(Long requestId) {
        CareRequestDto request = careMapper.findRequestById(requestId);
        if (request == null) {
            throw new BusinessException("돌봄 요청을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        }
        return request;
    }

    public void createRequest(CareRequestDto request) {
        request.setStatus("PENDING");
        careMapper.insertRequest(request);
    }

    public void updateRequestStatus(Long requestId, String status) {
        careMapper.updateRequestStatus(requestId, status);
    }

    public List<CaregiverDto> findCaregivers(String area, String careType) {
        return careMapper.findAvailableCaregivers(area, careType);
    }

    public void registerCaregiver(CaregiverDto caregiver) {
        careMapper.insertCaregiver(caregiver);
    }

    public void updateCaregiverProfile(CaregiverDto caregiver) {
        careMapper.updateCaregiver(caregiver);
    }
}
