import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';
import type { UserRole } from '../../types/user.types';
import styles from './Auth.module.css';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['patient', 'doctor', 'clinic']),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error, clearError } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');

  const { handleSubmit, register, formState: { errors }, setValue } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'patient' },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      clearError();
      setSubmitError(null);
      await registerUser(data);
      navigate('/patient/dashboard');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Registration failed');
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setValue('role', role);
  };

  return (
    <Card className={styles.card}>
      <h1 className={styles.title}>Create Account</h1>
      <p className={styles.subtitle}>Join Sahtak Beldene</p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.roleSelect}>
          <button
            type="button"
            className={`${styles.roleOption} ${selectedRole === 'patient' ? styles.selected : ''}`}
            onClick={() => handleRoleSelect('patient')}
          >
            <span className={styles.roleIcon}>👤</span>
            <span className={styles.roleLabel}>Patient</span>
          </button>
          <button
            type="button"
            className={`${styles.roleOption} ${selectedRole === 'doctor' ? styles.selected : ''}`}
            onClick={() => handleRoleSelect('doctor')}
          >
            <span className={styles.roleIcon}>👨‍⚕️</span>
            <span className={styles.roleLabel}>Doctor</span>
          </button>
          <button
            type="button"
            className={`${styles.roleOption} ${selectedRole === 'clinic' ? styles.selected : ''}`}
            onClick={() => handleRoleSelect('clinic')}
          >
            <span className={styles.roleIcon}>🏥</span>
            <span className={styles.roleLabel}>Clinic</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <Input
            label="First Name"
            placeholder="First name"
            {...register('firstName')}
            error={errors.firstName?.message}
          />
          <Input
            label="Last Name"
            placeholder="Last name"
            {...register('lastName')}
            error={errors.lastName?.message}
          />
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Phone"
          type="tel"
          placeholder="Phone number"
          {...register('phone')}
          error={errors.phone?.message}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          {...register('password')}
          error={errors.password?.message}
        />

        {(error || submitError) && (
          <div className={styles.error}>{error || submitError}</div>
        )}

        <Button type="submit" fullWidth isLoading={isLoading}>
          Create Account
        </Button>
      </form>

      <p className={styles.footer}>
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Card>
  );
}