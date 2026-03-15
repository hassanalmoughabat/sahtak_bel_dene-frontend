import type { ApiParams, PaginatedResponse } from '../types/api.types';
import type { Doctor } from '../types/user.types';
import type { Appointment, Visit, Prescription } from '../types/appointment.types';

function paginated<T>(data: T[]): PaginatedResponse<T> {
  return { data, total: data.length, page: 1, limit: 20, totalPages: 1 };
}

const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'd1', email: 'dr.ali@example.com', firstName: 'Ali', lastName: 'Hassan',
    role: 'doctor', specialization: 'Cardiology', licenseNumber: 'LIC-001',
    isVerified: true, createdAt: '2024-01-01', rating: 4.8, consultationFee: 50,
    bio: 'Experienced cardiologist with 15 years of practice.',
  },
  {
    id: 'd2', email: 'dr.sara@example.com', firstName: 'Sara', lastName: 'Ahmed',
    role: 'doctor', specialization: 'Dermatology', licenseNumber: 'LIC-002',
    isVerified: true, createdAt: '2024-01-01', rating: 4.6, consultationFee: 40,
    bio: 'Specialist in skin conditions and cosmetic dermatology.',
  },
  {
    id: 'd3', email: 'dr.omar@example.com', firstName: 'Omar', lastName: 'Khalil',
    role: 'doctor', specialization: 'Pediatrics', licenseNumber: 'LIC-003',
    isVerified: true, createdAt: '2024-01-01', rating: 4.9, consultationFee: 45,
    bio: 'Dedicated pediatrician caring for children of all ages.',
  },
];

export const patientService = {
  getDoctors: async (params?: ApiParams): Promise<PaginatedResponse<Doctor>> => {
    let doctors = MOCK_DOCTORS;
    if (params?.search) {
      const q = String(params.search).toLowerCase();
      doctors = doctors.filter((d) =>
        d.firstName.toLowerCase().includes(q) ||
        d.lastName.toLowerCase().includes(q) ||
        d.specialization.toLowerCase().includes(q)
      );
    }
    if (params?.specialty) {
      doctors = doctors.filter((d) => d.specialization === params.specialty);
    }
    return paginated(doctors);
  },

  getDoctorById: async (id: string): Promise<Doctor> => {
    const doc = MOCK_DOCTORS.find((d) => d.id === id);
    if (!doc) throw new Error('Doctor not found');
    return doc;
  },

  getAppointments: async (_params?: ApiParams): Promise<PaginatedResponse<Appointment>> => {
    return paginated([]);
  },

  bookAppointment: async (data: {
    doctorId: string; clinicId: string; date: string;
    time: string; type: Appointment['type']; notes?: string;
  }): Promise<Appointment> => {
    return {
      id: crypto.randomUUID(),
      patientId: 'current',
      doctorId: data.doctorId,
      clinicId: data.clinicId,
      date: data.date,
      time: data.time,
      status: 'pending',
      type: data.type,
      notes: data.notes,
    };
  },

  cancelAppointment: async (_id: string): Promise<void> => {},

  getVisits: async (_params?: ApiParams): Promise<PaginatedResponse<Visit>> => {
    return paginated([]);
  },

  getVisitById: async (id: string): Promise<Visit> => {
    throw new Error(`Visit ${id} not found`);
  },

  getPrescriptions: async (_params?: ApiParams): Promise<PaginatedResponse<Prescription>> => {
    return paginated([]);
  },

  getPrescriptionById: async (id: string): Promise<Prescription> => {
    throw new Error(`Prescription ${id} not found`);
  },

  searchClinics: async (): Promise<{ id: string; name: string; address: string; latitude: number; longitude: number }[]> => {
    return [];
  },
};
