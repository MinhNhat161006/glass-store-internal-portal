import { apiFetch } from './client';

export const appointmentApi = {
  getAllAppointments: () => apiFetch('/api/appointments'),
  getAppointmentById: (id) => apiFetch(`/api/appointments/${id}`),
  createAppointment: (data) => apiFetch('/api/appointments', {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  updateAppointmentStatus: (id, updateData) => apiFetch(`/api/appointments/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify(updateData)
  })
};
