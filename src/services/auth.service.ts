import type { LoginCredentials, RegisterData, AuthResponse, AuthUser } from '../types/user.types';

const USERS_KEY = 'mock-users';

function getUsers(): (AuthUser & { password: string })[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveUsers(users: (AuthUser & { password: string })[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function makeToken(user: AuthUser): string {
  return btoa(JSON.stringify({ userId: user.id, role: user.role }));
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const users = getUsers();
    const found = users.find((u) => u.email === credentials.email && u.password === credentials.password);
    if (!found) throw new Error('Invalid email or password');
    const { password: _, ...user } = found;
    return { user: user as AuthUser, token: makeToken(user as AuthUser) };
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const users = getUsers();
    if (users.find((u) => u.email === data.email)) {
      throw new Error('Email already registered');
    }
    const user: AuthUser = {
      id: crypto.randomUUID(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: data.role,
      createdAt: new Date().toISOString(),
      ...(data.role === 'patient' ? {} : {}),
      ...(data.role === 'doctor' ? { specialization: '', licenseNumber: '', isVerified: false } : {}),
      ...(data.role === 'clinic' ? { name: `${data.firstName} ${data.lastName}`, address: '', city: '', isVerified: false } : {}),
    } as AuthUser;
    saveUsers([...users, { ...user, password: data.password }]);
    return { user, token: makeToken(user) };
  },

  logout: async (): Promise<void> => {},

  refreshToken: async (): Promise<AuthResponse> => {
    throw new Error('Not supported in mock mode');
  },

  getProfile: async (): Promise<AuthResponse['user']> => {
    throw new Error('Not supported in mock mode');
  },

  updateProfile: async (): Promise<AuthResponse['user']> => {
    throw new Error('Not supported in mock mode');
  },

  changePassword: async (): Promise<void> => {},
};
