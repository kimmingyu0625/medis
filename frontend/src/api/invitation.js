import client from './client';

export const sendInvitation = (seniorPhone, relationship = 'CHILD') => {
  return client.post('/invitations/send', { seniorPhone, relationship });
};

export const getMyInvitations = () => {
  return client.get('/invitations/sent');
};

export const acceptInvitation = (inviteCode) => {
  return client.post(`/invitations/accept/${inviteCode}`);
};

export const linkByChildPhone = (childPhone, relationship = 'CHILD') => {
  return client.post('/invitations/link-child', { childPhone, relationship });
};

export const getInvitationInfo = (inviteCode) => {
  return client.get(`/invitations/code/${inviteCode}`);
};
