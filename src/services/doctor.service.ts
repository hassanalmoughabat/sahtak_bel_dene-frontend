import { apiClient } from './api/axios.config';
import type { ApiParams, PaginatedResponse } from '../types/api.types';
import type { Appointment, Visit, Prescription, TimeSlot } from '../types/appointment.types';
import type { Patient } from '../types/user.types';

export const doctorService = {
  // Appointments
  getAppointments: async (params?: ApiParams): Promise<PaginatedResponse<Appointment>> => {
    const response = await apiClient.get<PaginatedResponse<Appointment>>('/doctor/appointments', { params });
    return response.data;
  },

  getTodayAppointments: async (): Promise<Appointment[]> => {
    const response = await apiClient.get<Appointment[]>('/doctor/appointments/today');
    return response.data;
  },

  updateAppointmentStatus: async (id: string, status: Appointment['status']): Promise<Appointment> => {
    const response = await apiClient.patch<Appointment>(`/doctor/appointments/${id}`, { status });
    return response.data;
  },

  // Patients
  getPatients: async (params?: ApiParams): Promise<PaginatedResponse<Patient>> => {
    const response = await apiClient.get<PaginatedResponse<Patient>>('/doctor/patients', { params });
    return response.data;
  },

  getPatientById: async (id: string): Promise<Patient> => {
    const response = await apiClient.get<Patient>(`/doctor/patients/${id}`);
    return response.data;
  },

  getPatientHistory: async (patientId: string): Promise<{ visits: Visit[]; prescriptions: Prescription[] }> => {
    const response = await apiClient.get(`/doctor/patients/${patientId}/history`);
    return response.data;
  },

  // Visits
  createVisit: async (data: {
    appointmentId: string;
    chiefComplaint: string;
    diagnosis?: string;
    notes?: string;
    vitalSigns?: Visit['vitalSigns'];
  }): Promise<Visit> => {
    const response = await apiClient.post<Visit>('/doctor/visits', data);
    return response.data;
  },

  updateVisit: async (id: string, data: Partial<Visit>): Promise<Visit> => {
    const response = await apiClient.patch<Visit>(`/doctor/visits/${id}`, data);
    return response.data;
  },

  // Prescriptions
  createPrescription: async (data: {
    visitId: string;
    patientId: string;
    medications: Prescription['medications'];
    notes?: string;
  }): Promise<Prescription> => {
    const response = await apiClient.post<Prescription>('/doctor/prescriptions', data);
    return response.data;
  },

  // Schedule
  getSchedule: async (): Promise<TimeSlot[]> => {
    const response = await apiClient.get<TimeSlot[]>('/doctor/schedule');
    return response.data;
  },

  updateSchedule: async (slots: Partial<TimeSlot>[]): Promise<TimeSlot[]> => {
    const response = await apiClient.put<TimeSlot[]>('/doctor/schedule', slots);
    return response.data;
  },

  getAvailableSlots: async (date: string): Promise<{ time: string; available: boolean }[]> => {
    const response = await apiClient.get(`/doctor/slots/${date}`);
    return response.data;
  },
};