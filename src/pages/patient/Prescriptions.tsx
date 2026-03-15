import { useEffect, useState } from 'react';
import { patientService } from '../../services/patient.service';
import { Card, Badge, Loader } from '../../components/ui';
import styles from './Prescriptions.module.css';

interface Prescription {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  status: 'active' | 'completed' | 'expired';
  notes?: string;
}

export default function PatientPrescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrescriptions();
  }, []);

  const loadPrescriptions = async () => {
    try {
      const data = await patientService.getPrescriptions();
      setPrescriptions(data.data as unknown as Prescription[]);
    } catch (error) {
      console.error('Failed to load prescriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'error' | 'info'> = {
      active: 'success',
      completed: 'info',
      expired: 'error',
    };
    return <Badge variant={variants[status] || 'info'}>{status}</Badge>;
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>My Prescriptions</h1>
        <p className={styles.subtitle}>Active and past prescriptions</p>
      </header>

      <div className={styles.prescriptionList}>
        {prescriptions.length === 0 ? (
          <Card className={styles.emptyState}>
            <p>No prescriptions yet</p>
          </Card>
        ) : (
          prescriptions.map((prescription) => (
            <Card key={prescription.id} className={styles.prescriptionCard}>
              <div className={styles.prescriptionHeader}>
                <div>
                  <h3>{prescription.doctorName}</h3>
                  <Badge variant="default">{prescription.specialty}</Badge>
                </div>
                <div className={styles.headerRight}>
                  <span className={styles.date}>
                    {new Date(prescription.date).toLocaleDateString()}
                  </span>
                  {getStatusBadge(prescription.status)}
                </div>
              </div>

              <div className={styles.medications}>
                <h4>Medications</h4>
                <table className={styles.medTable}>
                  <thead>
                    <tr>
                      <th>Medication</th>
                      <th>Dosage</th>
                      <th>Frequency</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescription.medications.map((med, idx) => (
                      <tr key={idx}>
                        <td>{med.name}</td>
                        <td>{med.dosage}</td>
                        <td>{med.frequency}</td>
                        <td>{med.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {prescription.notes && (
                <div className={styles.notes}>
                  <strong>Notes:</strong>
                  <p>{prescription.notes}</p>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}