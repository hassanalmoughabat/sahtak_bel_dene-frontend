export type UserRole = 'patient' | 'doctor' | 'clinic';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth?: string;
  gender?: 'male' | 'female';
  bloodType?: string;
  allergies?: string[];
  chronicDiseases?: string[];
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  licenseNumber: string;
  clinicId?: string;
  bio?: string;
  yearsOfExperience?: number;
  consultationFee?: number;
  rating?: number;
  isVerified: boolean;
}

export interface Clinic extends User {
  role: 'clinic';
  name: string;
  address: string;
  city: string;
  phone: string;
  latitude?: number;
  longitude?: number;
  operatingHours?: string;
  isVerified: boolean;
}

export type AuthUser = Patient | Doctor | Clinic;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}