import { useEffect, useState } from 'react';
import { patientService } from '../../services/patient.service';
import { Card, Badge, Loader } from '../../components/ui';
import styles from './Visits.module.css';

interface Visit {
  id: string;
  doctorName: string;
  specialty: string;
  clinic: string;
  date: string;
  diagnosis: string;
  notes: string;
}

export default function PatientVisits() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVisits();
  }, []);

  const loadVisits = async () => {
    try {
      const data = await patientService.getVisits();
      setVisits(data.data as unknown as Visit[]);
    } catch (error) {
      console.error('Failed to load visits:', error);
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
        <h1>My Visits</h1>
        <p className={styles.subtitle}>Medical history and visit records</p>
      </header>

      <div className={styles.visitList}>
        {visits.length === 0 ? (
          <Card className={styles.emptyState}>
            <p>No visits yet</p>
          </Card>
        ) : (
          visits.map((visit) => (
            <Card key={visit.id} className={styles.visitCard}>
              <div className={styles.visitHeader}>
                <div>
                  <h3>{visit.doctorName}</h3>
                  <Badge variant="default">{visit.specialty}</Badge>
                </div>
                <span className={styles.date}>
                  {new Date(visit.date).toLocaleDateString()}
                </span>
              </div>
              <p className={styles.clinic}>{visit.clinic}</p>
              <div className={styles.visitContent}>
                <div className={styles.diagnosis}>
                  <strong>Diagnosis:</strong>
                  <p>{visit.diagnosis}</p>
                </div>
                {visit.notes && (
                  <div className={styles.notes}>
                    <strong>Doctor's Notes:</strong>
                    <p>{visit.notes}</p>
                  </div>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}