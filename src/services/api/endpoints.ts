export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refresh',
  LOGOUT: '/auth/logout',

  // Users
  ME: '/users/me',

  // Doctors
  DOCTORS: '/doctors',
  DOCTOR_BY_ID: (id: string) => `/doctors/${id}`,

  // Patients
  PATIENTS: '/patients',
  PATIENT_BY_ID: (id: string) => `/patients/${id}`,

  // Clinics
  CLINICS: '/clinics',
  CLINIC_BY_ID: (id: string) => `/clinics/${id}`,

  // Appointments
  APPOINTMENTS: '/appointments',
  APPOINTMENT_BY_ID: (id: string) => `/appointments/${id}`,
  MY_APPOINTMENTS: '/appointments/my',
  DOCTOR_APPOINTMENTS: '/appointments/doctor',
  CLINIC_APPOINTMENTS: '/appointments/clinic',

  // Visits
  VISITS: '/visits',
  VISIT_BY_ID: (id: string) => `/visits/${id}`,
  VISIT_BY_APPOINTMENT: (appointmentId: string) => `/visits/appointment/${appointmentId}`,

  // Prescriptions
  PRESCRIPTIONS: '/prescriptions',
  PRESCRIPTION_BY_ID: (id: string) => `/prescriptions/${id}`,
  PATIENT_PRESCRIPTIONS: '/prescriptions/patient',
  DOCTOR_PRESCRIPTIONS: '/prescriptions/doctor',

  // Schedules
  SCHEDULES: '/schedules',
  SCHEDULE_BY_DOCTOR: (doctorId: string) => `/schedules/doctor/${doctorId}`,
};