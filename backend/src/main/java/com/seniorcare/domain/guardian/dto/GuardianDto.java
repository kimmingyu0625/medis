package com.seniorcare.domain.guardian.dto;

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
public class GuardianDto {

    private Long guardianId;
    private Long guardianUserId;
    private Long seniorUserId;
    private String relationship;    // CHILD, SPOUSE, SIBLING, OTHER
    private String status;          // PENDING, ACCEPTED, REJECTED
    private String guardianName;
    private String seniorName;
    private String createdAt;
}
