export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  clinicId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  type: 'checkup' | 'consultation' | 'follow-up' | 'emergency';
  notes?: string;
  patient?: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  doctor?: {
    id: string;
    firstName: string;
    lastName: string;
    specialization: string;
    avatar?: string;
  };
  clinic?: {
    id: string;
    name: string;
    address: string;
  };
}

export interface Visit {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  date: string;
  chiefComplaint: string;
  diagnosis?: string;
  notes?: string;
  vitalSigns?: {
    bloodPressure?: string;
    temperature?: number;
    heartRate?: number;
    weight?: number;
  };
}

export interface Prescription {
  id: string;
  visitId: string;
  patientId: string;
  doctorId: string;
  date: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions?: string;
  }[];
  notes?: string;
  isActive: boolean;
}

export interface TimeSlot {
  id: string;
  doctorId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}