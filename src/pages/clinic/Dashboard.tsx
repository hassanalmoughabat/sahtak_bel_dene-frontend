import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Dashboard.module.css';

const MOCK_DOCTORS = [
  { id: '1', name: 'Dr. Ahmad Habib',   specialty: 'Cardiologist',         fee: 100, color: '#43A047' },
  { id: '2', name: 'Dr. Sara Khaiil',   specialty: 'Dermatologist',        fee: 80,  color: '#E53935' },
  { id: '3', name: 'Dr. Rami Mansour',  specialty: 'Orthopedic',           fee: 120, color: '#43A047' },
  { id: '4', name: 'Dr. Mona Alawi',    specialty: 'Pediatrician',         fee: 90,  color: '#E53935' },
  { id: '5', name: 'Dr. Walid Jaber',   specialty: 'General Practitioner', fee: 70,  color: '#43A047' },
];

const MOCK_APPOINTMENTS = [
  { id: '1', timeStart: '10:00 AM', timeEnd: '11:00 AM', patient: 'Ahmad Nasser',   doctor: 'Dr. Ahmad Habib', status: 'confirmed'   },
  { id: '2', timeStart: '11:30 AM', timeEnd: '11:00 PM', patient: 'Leila Kanaan',   doctor: 'Dr. Sara Khalli', status: 'confirmed' },
  { id: '3', timeStart: '1:00 PM',  timeEnd: '3:00 PM',  patient: 'Hussein Sleiman',doctor: 'Dr. Rami Mansour',status: 'confirmed' },
  { id: '4', timeStart: '2:45 PM',  timeEnd: '2:45 PM',  patient: 'Maria Haddad',   doctor: 'Dr. Mona Alawi',  status: 'pending' },
];

const REVENUE_POINTS = [20, 35, 30, 55, 45, 70, 85];
const MONTHS = ['Jan 29', 'Feb 5', 'Feb 12', 'Feb 19', 'Feb 24'];

function RevenueChart() {
  const w = 300, h = 60, pad = 8;
  const max = Math.max(...REVENUE_POINTS);
  const pts = REVENUE_POINTS.map((v, i) => {
    const x = pad + (i / (REVENUE_POINTS.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v / max) * (h - pad * 2));
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={styles.chartSvg} preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke="#E53935"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={pts}
      />
      {REVENUE_POINTS.map((v, i) => {
        const x = pad + (i / (REVENUE_POINTS.length - 1)) * (w - pad * 2);
        const y = h - pad - ((v / max) * (h - pad * 2));
        return <circle key={i} cx={x} cy={y} r="3.5" fill="#E53935" />;
      })}
    </svg>
  );
}

function DoctorInitials({ name }: { name: string }) {
  const parts = name.replace('Dr. ', '').split(' ');
  const initials = parts.map((p) => p[0]).join('').slice(0, 2).toUpperCase();
  return <div className={styles.doctorAvatar}>{initials}</div>;
}

function PatientInitials({ name }: { name: string }) {
  const parts = name.split(' ');
  const initials = parts.map((p) => p[0]).join('').slice(0, 2).toUpperCase();
  return <div className={styles.patientAvatar}>{initials}</div>;
}

export default function ClinicDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const clinicName = user ? `${user.firstName} ${user.lastName} Clinic` : 'Sahtak Beldene Clinic';

  return (
    <div className={styles.page}>
      {/* Welcome + clinic image row */}
      <div className={styles.topRow}>
        <div className={styles.welcomeArea}>
          <h1 className={styles.welcomeTitle}>Welcome, {clinicName}</h1>

          {/* Stat cards row */}
          <div className={styles.statsRow}>
            {/* Doctors */}
            <div className={styles.statCard}>
              <div className={styles.statLeft}>
                <div className={styles.statIconWrap} style={{ background: '#fff0f0' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <div>
                  <div className={styles.statValue}>5</div>
                  <div className={styles.statLabel}>Doctors</div>
                </div>
              </div>
              <button className={styles.statAction} onClick={() => navigate('/clinic/doctors')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E53935" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
                Manage Doctors
              </button>
            </div>

            {/* Patients */}
            <div className={styles.statCard}>
              <div className={styles.statLeft}>
                <div className={styles.statIconWrap} style={{ background: '#f0faf0' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#43A047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <div className={styles.statValue}>48</div>
                  <div className={styles.statLabel}>Patients</div>
                </div>
              </div>
              <button className={styles.statAction} onClick={() => navigate('/clinic/doctors')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#43A047" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                View Patients
              </button>
            </div>

            {/* Appointments */}
            <div className={styles.statCard}>
              <div className={styles.statLeft}>
                <div className={styles.statIconWrap} style={{ background: '#f0faf0' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#43A047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <div className={styles.statValue}>20</div>
                  <div className={styles.statLabel}>Upcoming Appointments</div>
                </div>
              </div>
              <button className={styles.statAction} onClick={() => navigate('/clinic/appointments')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#43A047" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

            {/* Revenue */}
            <div className={styles.statCard}>
              <div className={styles.statLeft}>
                <div className={styles.statIconWrap} style={{ background: '#f0faf0' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#43A047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div>
                  <div className={styles.statValue}>$1,250 <span className={styles.statSub}>this week</span></div>
                  <div className={styles.statGrowth}>
                    <span className={styles.growthUp}>▲ 15.6%</span> last week
                  </div>
                </div>
              </div>
              <button className={styles.statAction} onClick={() => navigate('/clinic/schedules')}>
                <svg width="36" height="20" viewBox="0 0 36 20" fill="none" stroke="#43A047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="0,18 8,10 16,14 24,6 36,10" />
                </svg>
                <span style={{ fontSize: 12 }}>Manage Doctors</span>
              </button>
            </div>
          </div>
        </div>

        {/* Clinic image card */}
        <div className={styles.clinicImageCard}>
          <div className={styles.clinicImagePlaceholder}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div className={styles.clinicImageFooter}>
            <img src={logo} alt="logo" className={styles.clinicFooterLogo} />
            <button className={styles.homeBtn}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-3.86" />
              </svg>
              Home
            </button>
          </div>
        </div>
      </div>

      {/* Bottom two-col grid */}
      <div className={styles.bottomGrid}>
        {/* Doctor List */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Doctor List</span>
            <button className={styles.panelLink} onClick={() => navigate('/clinic/doctors')}>Manage Doctors</button>
          </div>
          <div className={styles.doctorList}>
            {MOCK_DOCTORS.map((doc) => (
              <div key={doc.id} className={styles.doctorRow}>
                <DoctorInitials name={doc.name} />
                <div className={styles.doctorInfo}>
                  <div className={styles.doctorName}>{doc.name}</div>
                  <div className={styles.doctorSpec}>{doc.specialty}</div>
                </div>
                <div className={styles.doctorFee}>$ {doc.fee}</div>
                <div className={styles.doctorActions}>
                  <button
                    className={styles.editBtn}
                    style={{ background: doc.color }}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.arrowBtn}
                    style={{ background: doc.color }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className={styles.rightCol}>
          {/* Upcoming Appointments */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>Upcoming Appointments</span>
              <button className={styles.panelLink}>
                View All
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
            <div className={styles.appointmentList}>
              {MOCK_APPOINTMENTS.map((appt) => (
                <div key={appt.id} className={styles.apptRow}>
                  <PatientInitials name={appt.patient} />
                  <div className={styles.apptTime}>
                    <div className={styles.apptTimeMain}>{appt.timeStart}</div>
                    <div className={styles.apptTimeSub}>{appt.timeEnd}</div>
                  </div>
                  <div className={styles.apptInfo}>
                    <div className={styles.apptPatient}>{appt.patient}</div>
                    <div className={styles.apptDoctor}>{appt.doctor}</div>
                  </div>
                  <span
                    className={styles.apptStatus}
                    style={{
                      background: appt.status === 'pending' ? '#E53935' : '#43A047',
                    }}
                  >
                    {appt.status === 'pending' ? 'Pending' : 'Confirmed'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Overview */}
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>Revenue Overview</span>
              <div className={styles.revenueHeaderRight}>
                <span className={styles.revenueAmount}>$1,250</span>
                <span className={styles.revenueGrowth}>▲ 15.5%</span>
              </div>
            </div>
            <RevenueChart />
            <div className={styles.chartLabels}>
              {MONTHS.map((m) => (
                <span key={m} className={styles.chartLabel}>{m}</span>
              ))}
            </div>
            <div className={styles.chartFooter}>
              <span className={styles.chartFooterLabel}>Jan 29</span>
              <div className={styles.chartFooterRight}>
                <span>Weekly</span>
                <span>$1,500</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
