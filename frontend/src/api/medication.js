import client from './client';

export const getMedications = () => {
  return client.get('/medications');
};

export const getMedication = (medicationId) => {
  return client.get(`/medications/${medicationId}`);
};

export const addMedication = (medication) => {
  return client.post('/medications', medication);
};

export const updateMedication = (medicationId, medication) => {
  return client.put(`/medications/${medicationId}`, medication);
};

export const deleteMedication = (medicationId) => {
  return client.delete(`/medications/${medicationId}`);
};

export const getTodaySchedules = () => {
  return client.get('/medications/schedules/today');
};

export const addSchedule = (medicationId, schedule) => {
  return client.post(`/medications/${medicationId}/schedules`, schedule);
};

export const markAsTaken = (scheduleId, taken) => {
  return client.patch(`/medications/schedules/${scheduleId}/taken?taken=${taken}`);
};
