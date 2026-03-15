import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';

export default function AuthLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.brand}>
          <h1 className={styles.logo}>Sahtak Beldene</h1>
          <p className={styles.tagline}>Your Health, Our Priority</p>
        </div>
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🏥</span>
            <span>Find Verified Doctors</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📅</span>
            <span>Easy Appointments</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>📋</span>
            <span>Medical Records</span>
          </div>
        </div>
      </div>
      <div className={styles.rightPanel}>
        <Outlet />
      </div>
    </div>
  );
}