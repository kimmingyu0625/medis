import client from './client';

export const getMyWards = () => {
  return client.get('/guardians/wards');
};

export const getMyGuardians = () => {
  return client.get('/guardians/my');
};

export const requestGuardian = (seniorUserId, relationship) => {
  return client.post('/guardians/request', { seniorUserId, relationship });
};

export const respondToRequest = (guardianId, status) => {
  return client.patch(`/guardians/${guardianId}/respond?status=${status}`);
};

export const removeGuardian = (guardianId) => {
  return client.delete(`/guardians/${guardianId}`);
};

export const getSeniorTodaySchedules = (seniorUserId) => {
  return client.get(`/guardians/wards/${seniorUserId}/schedules/today`);
};
