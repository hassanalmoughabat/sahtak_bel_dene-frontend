import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Avatar from '../components/ui/Avatar';
import styles from './PatientLayout.module.css';

const patientNavItems = [
  { path: '/patient/dashboard', label: 'Dashboard' },
  { path: '/patient/doctors', label: 'Doctors' },
  { path: '/patient/appointments', label: 'Appointments' },
  { path: '/patient/visits', label: 'Visits' },
  { path: '/patient/prescriptions', label: 'Prescriptions' },
];

export default function PatientLayout() {
  const { user, logout } = useAuth();

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.brand}>Sahtak Beldene</div>
        <div className={styles.userMenu}>
          <Avatar name={user ? `${user.firstName} ${user.lastName}` : ''} size="sm" />
          <span className={styles.userName}>{user?.firstName}</span>
          <button onClick={logout} className={styles.logoutBtn}>Logout</button>
        </div>
      </header>
      <div className={styles.body}>
        <nav className={styles.nav}>
          {patientNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}