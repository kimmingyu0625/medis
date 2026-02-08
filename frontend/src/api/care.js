import client from './client';

export const getMyRequests = () => {
  return client.get('/care/requests');
};

export const getRequest = (requestId) => {
  return client.get(`/care/requests/${requestId}`);
};

export const createRequest = (request) => {
  return client.post('/care/requests', request);
};

export const updateRequestStatus = (requestId, status) => {
  return client.patch(`/care/requests/${requestId}/status?status=${status}`);
};

export const findCaregivers = (area, careType) => {
  const params = {};
  if (area) params.area = area;
  if (careType) params.careType = careType;
  return client.get('/care/caregivers', { params });
};

export const registerCaregiver = (caregiver) => {
  return client.post('/care/caregivers', caregiver);
};
