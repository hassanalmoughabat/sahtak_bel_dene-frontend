import { useAuthStore } from '../stores/auth.store';

export function useAuth() {
  const { user, token, isAuthenticated, isLoading, error, login, register, logout, clearError } = useAuthStore();

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    isPatient: user?.role === 'patient',
    isDoctor: user?.role === 'doctor',
    isClinic: user?.role === 'clinic',
  };
}