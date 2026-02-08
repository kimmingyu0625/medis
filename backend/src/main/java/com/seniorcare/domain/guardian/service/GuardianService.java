package com.seniorcare.domain.guardian.service;

import com.seniorcare.common.exception.BusinessException;
import com.seniorcare.domain.guardian.dto.GuardianDto;
import com.seniorcare.domain.guardian.mapper.GuardianMapper;
import com.seniorcare.domain.medication.dto.MedicationScheduleDto;
import com.seniorcare.domain.medication.mapper.MedicationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GuardianService {

    private final GuardianMapper guardianMapper;
    private final MedicationMapper medicationMapper;

    public List<GuardianDto> getMyWards(Long guardianUserId) {
        return guardianMapper.findByGuardianUserId(guardianUserId);
    }

    public List<GuardianDto> getMyGuardians(Long seniorUserId) {
        return guardianMapper.findBySeniorUserId(seniorUserId);
    }

    public void requestGuardian(GuardianDto guardian) {
        guardian.setStatus("PENDING");
        guardianMapper.insertGuardian(guardian);
    }

    public void respondToRequest(Long guardianId, String status) {
        GuardianDto guardian = guardianMapper.findById(guardianId);
        if (guardian == null) {
            throw new BusinessException("보호자 연동 요청을 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        }
        guardianMapper.updateStatus(guardianId, status);
    }

    public void removeGuardian(Long guardianId) {
        guardianMapper.deleteGuardian(guardianId);
    }

    public List<MedicationScheduleDto> getSeniorTodaySchedules(Long guardianUserId, Long seniorUserId) {
        // 보호자 연동 확인
        List<GuardianDto> guardians = guardianMapper.findByGuardianUserId(guardianUserId);
        boolean isLinked = guardians.stream()
                .anyMatch(g -> g.getSeniorUserId().equals(seniorUserId)
                        && "ACCEPTED".equals(g.getStatus()));

        if (!isLinked) {
            throw new BusinessException("연동된 시니어가 아닙니다.", HttpStatus.FORBIDDEN);
        }

        return medicationMapper.findTodaySchedules(seniorUserId);
    }
}
