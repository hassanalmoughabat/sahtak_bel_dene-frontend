import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/auth.store';
import AuthLayout from './layouts/AuthLayout';
import PatientLayout from './layouts/PatientLayout';
import DoctorLayout from './layouts/DoctorLayout';
import ClinicLayout from './layouts/ClinicLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PatientDashboard from './pages/patient/Dashboard';
import PatientDoctors from './pages/patient/Doctors';
import PatientAppointments from './pages/patient/Appointments';
import PatientVisits from './pages/patient/Visits';
import PatientPrescriptions from './pages/patient/Prescriptions';
import DoctorDashboard from './pages/doctor/Dashboard';
import DoctorAppointments from './pages/doctor/Appointments';
import DoctorPatients from './pages/doctor/Patients';
import DoctorSchedule from './pages/doctor/Schedule';
import ClinicDashboard from './pages/clinic/Dashboard';
import ClinicDoctors from './pages/clinic/Doctors';
import ClinicPatients from './pages/clinic/Patients';
import ClinicAppointments from './pages/clinic/Appointments';
import ClinicSchedules from './pages/clinic/Schedules';

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return <>{children}</>;
}

function App() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    );
  }

  const role = user?.role || 'patient';

  return (
    <Routes>
      <Route path="/patient" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <PatientLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/patient/dashboard" replace />} />
        <Route path="dashboard" element={<PatientDashboard />} />
        <Route path="doctors" element={<PatientDoctors />} />
        <Route path="appointments" element={<PatientAppointments />} />
        <Route path="visits" element={<PatientVisits />} />
        <Route path="prescriptions" element={<PatientPrescriptions />} />
      </Route>

      <Route path="/doctor" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <DoctorLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/doctor/dashboard" replace />} />
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="appointments" element={<DoctorAppointments />} />
        <Route path="patients" element={<DoctorPatients />} />
        <Route path="schedule" element={<DoctorSchedule />} />
      </Route>

      <Route path="/clinic" element={
        <ProtectedRoute allowedRoles={['clinic']}>
          <ClinicLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/clinic/dashboard" replace />} />
        <Route path="dashboard" element={<ClinicDashboard />} />
        <Route path="doctors" element={<ClinicDoctors />} />
        <Route path="patients" element={<ClinicPatients />} />
        <Route path="appointments" element={<ClinicAppointments />} />
        <Route path="schedules" element={<ClinicSchedules />} />
      </Route>

      <Route path="*" element={<Navigate to={`/${role}/dashboard`} replace />} />
    </Routes>
  );
}

export default App;