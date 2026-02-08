package com.seniorcare.domain.invitation.mapper;

import com.seniorcare.domain.invitation.dto.InvitationDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface InvitationMapper {

    void insertInvitation(InvitationDto invitation);

    InvitationDto findByInviteCode(@Param("inviteCode") String inviteCode);

    InvitationDto findById(@Param("invitationId") Long invitationId);

    List<InvitationDto> findByInviterUserId(@Param("inviterUserId") Long inviterUserId);

    List<InvitationDto> findPendingByPhone(@Param("phone") String phone);

    void updateStatus(@Param("invitationId") Long invitationId,
                       @Param("status") String status);

    void updateInviteeUserId(@Param("invitationId") Long invitationId,
                              @Param("inviteeUserId") Long inviteeUserId);
}
