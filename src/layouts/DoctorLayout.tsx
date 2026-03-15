import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Avatar from '../components/ui/Avatar';
import styles from './PatientLayout.module.css';

const doctorNavItems = [
  { path: '/doctor/dashboard', label: 'Dashboard', icon: '🏠' },
  { path: '/doctor/appointments', label: 'Appointments', icon: '📅' },
  { path: '/doctor/patients', label: 'Patients', icon: '👥' },
  { path: '/doctor/schedule', label: 'Schedule', icon: '🕐' },
];

export default function DoctorLayout() {
  const { user, logout } = useAuth();

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.brand}>Sahtak Beldene</div>
        <div className={styles.userMenu}>
          <Avatar name={user ? `${user.firstName} ${user.lastName}` : ''} size="sm" />
          <span className={styles.userName}>Dr. {user?.firstName}</span>
          <button onClick={logout} className={styles.logoutBtn}>Logout</button>
        </div>
      </header>
      <div className={styles.body}>
        <nav className={styles.nav}>
          {doctorNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
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