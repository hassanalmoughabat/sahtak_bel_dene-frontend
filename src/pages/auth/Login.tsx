import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';
import styles from './Auth.module.css';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      clearError();
      setSubmitError(null);
      await login(data);
      navigate('/patient/dashboard');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <Card className={styles.card}>
      <h1 className={styles.title}>Welcome Back</h1>
      <p className={styles.subtitle}>Sign in to your account</p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register('password')}
          error={errors.password?.message}
        />

        {(error || submitError) && (
          <div className={styles.error}>{error || submitError}</div>
        )}

        <Button type="submit" fullWidth isLoading={isLoading}>
          Sign In
        </Button>
      </form>

      <p className={styles.footer}>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Card>
  );
}