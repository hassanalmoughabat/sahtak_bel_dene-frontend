import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patientService } from '../../services/patient.service';
import { Card, Button, Input, Badge, Avatar, Loader } from '../../components/ui';
import styles from './Doctors.module.css';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  clinic: string;
  rating: number;
  consultationFee: number;
  imageUrl?: string;
}

export default function PatientDoctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('');

  useEffect(() => {
    loadDoctors();
  }, [search, specialty]);

  const loadDoctors = async () => {
    try {
      const data = await patientService.getDoctors({ search, specialty });
      setDoctors(data.data as unknown as Doctor[]);
    } catch (error) {
      console.error('Failed to load doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const specialties = ['General', 'Cardiology', 'Dermatology', 'Pediatrics', 'Orthopedics', 'Neurology'];

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Find a Doctor</h1>
        <p className={styles.subtitle}>Search and book appointments with specialists</p>
      </header>

      <div className={styles.filters}>
        <Input
          placeholder="Search doctors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className={styles.select}
        >
          <option value="">All Specialties</option>
          {specialties.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className={styles.doctorList}>
        {doctors.length === 0 ? (
          <Card className={styles.emptyState}>
            <p>No doctors found</p>
          </Card>
        ) : (
          doctors.map((doctor) => (
            <Card key={doctor.id} className={styles.doctorCard}>
              <Avatar
                name={doctor.name}
                src={doctor.imageUrl}
                size="lg"
              />
              <div className={styles.doctorInfo}>
                <h3>{doctor.name}</h3>
                <Badge variant="default">{doctor.specialty}</Badge>
                <p className={styles.clinic}>{doctor.clinic}</p>
                <div className={styles.meta}>
                  <span>⭐ {doctor.rating.toFixed(1)}</span>
                  <span>•</span>
                  <span>${doctor.consultationFee} per visit</span>
                </div>
              </div>
              <Button onClick={() => navigate(`/patient/doctors/${doctor.id}`)}>
                Book Appointment
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}