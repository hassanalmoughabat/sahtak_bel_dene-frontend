import { HTMLAttributes } from 'react';
import styles from './Badge.module.css';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

export default function Badge({ variant = 'default', size = 'md', className, children, ...props }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className || ''}`} {...props}>
      {children}
    </span>
  );
}