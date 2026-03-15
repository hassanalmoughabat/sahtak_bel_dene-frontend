import { HTMLAttributes } from 'react';
import styles from './Avatar.module.css';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  name?: string;
}

function getInitials(name: string): string {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

export default function Avatar({ src, alt, size = 'md', name, className, ...props }: AvatarProps) {
  return (
    <div className={`${styles.avatar} ${styles[size]} ${className || ''}`} {...props}>
      {src ? (
        <img src={src} alt={alt || name} className={styles.image} />
      ) : (
        <span className={styles.initials}>{name ? getInitials(name) : '?'}</span>
      )}
    </div>
  );
}