import { apiClient } from './api/axios.config';
import type { ApiParams, PaginatedResponse } from '../types/api.types';
import type { Doctor } from '../types/user.types';
import type { Appointment, TimeSlot } from '../types/appointment.types';

export const clinicService = {
  // Dashboard
  getDashboardStats: async (): Promise<{
    totalAppointments: number;
    todayAppointments: number;
    totalDoctors: number;
    revenue: number;
  }> => {
    const response = await apiClient.get('/clinic/dashboard/stats');
    return response.data;
  },

  // Doctors
  getDoctors: async (params?: ApiParams): Promise<PaginatedResponse<Doctor>> => {
    const response = await apiClient.get<PaginatedResponse<Doctor>>('/clinic/doctors', { params });
    return response.data;
  },

  addDoctor: async (doctorId: string): Promise<Doctor> => {
    const response = await apiClient.post<Doctor>('/clinic/doctors', { doctorId });
    return response.data;
  },

  removeDoctor: async (doctorId: string): Promise<void> => {
    await apiClient.delete(`/clinic/doctors/${doctorId}`);
  },

  // Schedules
  getSchedules: async (): Promise<{
    doctorId: string;
    doctorName: string;
    slots: TimeSlot[];
  }[]> => {
    const response = await apiClient.get('/clinic/schedules');
    return response.data;
  },

  updateDoctorSchedule: async (doctorId: string, slots: Partial<TimeSlot>[]): Promise<TimeSlot[]> => {
    const response = await apiClient.put<TimeSlot[]>(`/clinic/schedules/${doctorId}`, slots);
    return response.data;
  },

  // Appointments
  getAppointments: async (params?: ApiParams): Promise<PaginatedResponse<Appointment>> => {
    const response = await apiClient.get<PaginatedResponse<Appointment>>('/clinic/appointments', { params });
    return response.data;
  },

  // Settings
  getSettings: async (): Promise<{
    name: string;
    address: string;
    city: string;
    phone: string;
    operatingHours: string;
    consultationFee: number;
  }> => {
    const response = await apiClient.get('/clinic/settings');
    return response.data;
  },

  updateSettings: async (data: {
    name?: string;
    address?: string;
    city?: string;
    phone?: string;
    operatingHours?: string;
    consultationFee?: number;
  }): Promise<void> => {
    await apiClient.patch('/clinic/settings', data);
  },
};