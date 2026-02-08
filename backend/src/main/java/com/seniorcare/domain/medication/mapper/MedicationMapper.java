package com.seniorcare.domain.medication.mapper;

import com.seniorcare.domain.medication.dto.MedicationDto;
import com.seniorcare.domain.medication.dto.MedicationScheduleDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MedicationMapper {

    List<MedicationDto> findByUserId(@Param("userId") Long userId);

    MedicationDto findById(@Param("medicationId") Long medicationId);

    void insertMedication(MedicationDto medication);

    void updateMedication(MedicationDto medication);

    void deleteMedication(@Param("medicationId") Long medicationId);

    List<MedicationScheduleDto> findSchedulesByMedicationId(@Param("medicationId") Long medicationId);

    List<MedicationScheduleDto> findTodaySchedules(@Param("userId") Long userId);

    void insertSchedule(MedicationScheduleDto schedule);

    void updateScheduleTaken(@Param("scheduleId") Long scheduleId,
                              @Param("taken") boolean taken);

    void deleteSchedule(@Param("scheduleId") Long scheduleId);
}
