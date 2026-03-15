import { useEffect, useState } from 'react';
import { patientService } from '../../services/patient.service';
import { Card, Badge, Button, Loader } from '../../components/ui';
import styles from './Appointments.module.css';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  clinic: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    loadAppointments();
  }, [filter]);

  const loadAppointments = async () => {
    try {
      const data = await patientService.getAppointments();
      const now = new Date();
      const filtered = filter === 'upcoming'
        ? (data.data as unknown as Appointment[]).filter((a) => new Date(a.date) >= now)
        : (data.data as unknown as Appointment[]).filter((a) => new Date(a.date) < now);
      setAppointments(filtered);
    } catch (error) {
      console.error('Failed to load appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      await patientService.cancelAppointment(id);
      loadAppointments();
    } catch (error) {
      console.error('Failed to cancel appointment:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
      confirmed: 'success',
      pending: 'warning',
      completed: 'info',
      cancelled: 'error',
    };
    return <Badge variant={variants[status] || 'info'}>{status}</Badge>;
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>My Appointments</h1>
      </header>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${filter === 'upcoming' ? styles.active : ''}`}
          onClick={() => setFilter('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`${styles.tab} ${filter === 'past' ? styles.active : ''}`}
          onClick={() => setFilter('past')}
        >
          Past
        </button>
      </div>

      <div className={styles.appointmentList}>
        {appointments.length === 0 ? (
          <Card className={styles.emptyState}>
            <p>No appointments found</p>
          </Card>
        ) : (
          appointments.map((appointment) => (
            <Card key={appointment.id} className={styles.appointmentCard}>
              <div className={styles.appointmentDate}>
                <span className={styles.day}>
                  {new Date(appointment.date).getDate()}
                </span>
                <span className={styles.month}>
                  {new Date(appointment.date).toLocaleString('default', { month: 'short' })}
                </span>
              </div>
              <div className={styles.appointmentInfo}>
                <h3>{appointment.doctorName}</h3>
                <Badge variant="default">{appointment.specialty}</Badge>
                <p className={styles.clinic}>{appointment.clinic}</p>
                <p className={styles.time}>🕐 {appointment.time}</p>
              </div>
              <div className={styles.actions}>
                {getStatusBadge(appointment.status)}
                {filter === 'upcoming' && appointment.status !== 'cancelled' && (
                  <Button
                    variant="outline"
                    onClick={() => handleCancel(appointment.id)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}