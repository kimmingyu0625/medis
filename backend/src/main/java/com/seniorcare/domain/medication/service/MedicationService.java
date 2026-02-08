package com.seniorcare.domain.medication.service;

import com.seniorcare.common.exception.BusinessException;
import com.seniorcare.domain.medication.dto.MedicationDto;
import com.seniorcare.domain.medication.dto.MedicationScheduleDto;
import com.seniorcare.domain.medication.mapper.MedicationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicationService {

    private final MedicationMapper medicationMapper;

    public List<MedicationDto> getMedications(Long userId) {
        return medicationMapper.findByUserId(userId);
    }

    public MedicationDto getMedication(Long medicationId) {
        MedicationDto medication = medicationMapper.findById(medicationId);
        if (medication == null) {
            throw new BusinessException("약 정보를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        }
        return medication;
    }

    public void addMedication(MedicationDto medication) {
        medicationMapper.insertMedication(medication);
    }

    public void updateMedication(MedicationDto medication) {
        medicationMapper.updateMedication(medication);
    }

    public void deleteMedication(Long medicationId) {
        medicationMapper.deleteMedication(medicationId);
    }

    public List<MedicationScheduleDto> getTodaySchedules(Long userId) {
        return medicationMapper.findTodaySchedules(userId);
    }

    public void addSchedule(MedicationScheduleDto schedule) {
        medicationMapper.insertSchedule(schedule);
    }

    public void markAsTaken(Long scheduleId, boolean taken) {
        medicationMapper.updateScheduleTaken(scheduleId, taken);
    }
}
