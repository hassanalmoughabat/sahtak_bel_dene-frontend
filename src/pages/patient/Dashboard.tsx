import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';
import { patientService } from '../../services/patient.service';
import { Card, Button, Loader } from '../../components/ui';
import styles from './Dashboard.module.css';

interface DashboardStats {
  upcomingAppointments: number;
  completedVisits: number;
  activePrescriptions: number;
}

export default function PatientDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    upcomingAppointments: 0,
    completedVisits: 0,
    activePrescriptions: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const appointments = await patientService.getAppointments();
      const visits = await patientService.getVisits();
      const prescriptions = await patientService.getPrescriptions();

      const now = new Date();
      setStats({
        upcomingAppointments: appointments.data.filter((a) => new Date(a.date) > now).length,
        completedVisits: visits.data.length,
        activePrescriptions: prescriptions.data.filter((p) => p.isActive).length,
      });
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome back, {user?.firstName || 'Patient'}!</h1>
        <p className={styles.subtitle}>Manage your healthcare journey</p>
      </header>

      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>📅</div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{stats.upcomingAppointments}</span>
            <span className={styles.statLabel}>Upcoming Appointments</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/patient/appointments')}>
            View All
          </Button>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIcon}>🏥</div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{stats.completedVisits}</span>
            <span className={styles.statLabel}>Completed Visits</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/patient/visits')}>
            View All
          </Button>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIcon}>💊</div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{stats.activePrescriptions}</span>
            <span className={styles.statLabel}>Active Prescriptions</span>
          </div>
          <Button variant="ghost" onClick={() => navigate('/patient/prescriptions')}>
            View All
          </Button>
        </Card>
      </div>

      <div className={styles.quickActions}>
        <h2>Quick Actions</h2>
        <div className={styles.actionButtons}>
          <Button onClick={() => navigate('/patient/doctors')}>Find a Doctor</Button>
          <Button variant="secondary" onClick={() => navigate('/patient/appointments')}>
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
}