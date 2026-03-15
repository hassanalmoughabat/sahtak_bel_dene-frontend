# Sahtak Beldene - Frontend Architecture Rules

## Project Overview

Sahtak Beldene is a digital healthcare platform connecting patients, doctors, and clinics. The frontend must scale to millions of users and support mobile apps via Capacitor.

### User Roles
- **Patient**: Find doctors, book appointments, view visits/prescriptions
- **Doctor**: Manage schedule, accept appointments, write visit notes, create prescriptions
- **Clinic**: Manage doctors, schedules, consultation costs

---

## Tech Stack

- **Framework**: React 18+ with Vite
- **Language**: TypeScript (strict mode)
- **State**: Zustand
- **HTTP**: Axios with interceptors
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **Mobile**: Capacitor (iOS/Android)
- **Styling**: CSS Modules + CSS Custom Properties

---

## Project Structure

```
src/
├── main.tsx                    # App entry point
├── App.tsx                     # Root with routing
├── assets/                     # Static assets
├── components/
│   ├── ui/                     # Base UI kit (Button, Input, Card, etc.)
│   ├── layout/                 # Layout components
│   └── common/                 # Shared business components
├── pages/
│   ├── auth/                   # Login, register
│   ├── patient/                # Patient features
│   ├── doctor/                # Doctor features
│   └── clinic/                # Clinic features
├── services/
│   ├── api/                    # Axios config, interceptors
│   └── *.service.ts           # API endpoint functions
├── hooks/                      # Custom hooks
├── stores/                     # Zustand stores
├── types/                      # TypeScript interfaces
├── utils/                      # Helper functions
├── config/                     # Routes, constants
├── layouts/                    # Page layouts per role
└── styles/                     # CSS variables, global styles
```

---

## Design System

### Brand Colors (Medical Theme)
- **Primary**: `#E53935` (Medical Red)
- **Primary Light**: `#FF6659`
- **Primary Dark**: `#B71C1C`
- **Secondary**: `#43A047` (Medical Green)
- **Secondary Light**: `#76D275`
- **Secondary Dark**: `#1B5E20`

### Neutral Colors
- **Background**: `#FFFFFF`
- **Background Secondary**: `#F5F5F5`
- **Text Primary**: `#212121`
- **Text Secondary**: `#757575`
- **Border**: `#E0E0E0`

### Status Colors
- **Success**: `#4CAF50`
- **Warning**: `#FFC107`
- **Error**: `#F44336`
- **Info**: `#2196F3`

### Spacing Scale
- `--spacing-xs`: 4px
- `--spacing-sm`: 8px
- `--spacing-md`: 16px
- `--spacing-lg`: 24px
- `--spacing-xl`: 32px

### Border Radius
- `--radius-sm`: 4px
- `--radius-md`: 8px
- `--radius-lg`: 12px
- `--radius-full`: 9999px

---

## Component Rules

### UI Kit Components (components/ui/)
Build these first - reusable base components:
- `Button` - variants: primary, secondary, outline, ghost
- `Input` - text, email, password, textarea with validation
- `Select` - dropdown with search
- `Card` - container with shadow
- `Badge` - status indicators
- `Avatar` - user images
- `Modal` - dialogs
- `Toast` - notifications
- `Loader` - loading spinners

### Naming Convention
- Components: PascalCase (e.g., `DoctorCard.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useAuth.ts`)
- Stores: camelCase with `Store` suffix (e.g., `authStore.ts`)
- Utils: camelCase (e.g., `date.utils.ts`)
- Types: PascalCase (e.g., `User.types.ts`)
- CSS Modules: same as component (e.g., `Button.module.css`)

---

## State Management

### Zustand Stores

| Store | Purpose |
|-------|---------|
| `authStore` | User, token, role, login/logout |
| `appointmentStore` | Appointments cache |
| `uiStore` | Sidebar, theme, notifications |

### Data Fetching Pattern
Use custom `useApi` hook for all API calls:
- Handles loading/error states
- Automatic request cancellation
- Caching for frequently accessed data

---

## API Service Layer

### Axios Configuration
- Base URL from environment variable
- Request interceptor: Add JWT token
- Response interceptor: Handle 401, global errors

### Service Pattern
```typescript
// services/patient.service.ts
export const patientService = {
  getDoctors: (params) => apiClient.get('/doctors', { params }),
  getAppointments: () => apiClient.get('/appointments'),
  bookAppointment: (data) => apiClient.post('/appointments', data),
};
```

---

## Authentication

### JWT Flow
1. Login → Store JWT in localStorage (use Capacitor SecureStorage for mobile)
2. JWT contains: userId, role, expiresAt
3. Protected routes check authentication
4. Role-based route guards

### Route Guards
- `RequireAuth`: Must be logged in
- `RequireRole`: Must have specific role (patient/doctor/clinic)
- `RedirectIfAuth`: Redirect if already logged in (login/register)

---

## Routing Structure

```
/                           → Redirect
/login                      → Login
/register                   → Patient registration

/patient                    → PatientLayout (protected)
/patient/dashboard
/patient/doctors
/patient/doctors/:id
/patient/appointments
/patient/appointments/book
/patient/visits
/patient/prescriptions
/patient/profile

/doctor                     → DoctorLayout
/doctor/dashboard
/doctor/appointments
/doctor/patients
/doctor/patients/:id
/doctor/schedule
/doctor/visits/new/:id
/doctor/prescriptions/new
/doctor/profile

/clinic                     → ClinicLayout
/clinic/dashboard
/clinic/doctors
/clinic/schedules
/clinic/settings
```

---

## Mobile & Capacitor

### Viewport
- Use `100dvh` for mobile heights
- Meta viewport tag for proper scaling

### Mobile Guidelines
- Touch targets: minimum 44px
- Bottom navigation for primary actions
- Native-style transitions
- Responsive breakpoints:
  - Mobile: 320px+
  - Tablet: 768px+
  - Desktop: 1024px+

### Capacitor Config
```json
{
  "appId": "com.sahtakbeldene.app",
  "appName": "Sahtak Beldene",
  "webDir": "dist"
}
```

---

## Code Quality Rules

### TypeScript
- Always use explicit types for function parameters and return values
- Avoid `any` - use `unknown` if type is truly unknown
- Use interfaces for objects, types for unions

### React Patterns
- Use functional components with hooks
- Memoize expensive computations with `useMemo`
- Memoize callbacks with `useCallback`
- Keep components small and focused

### Error Handling
- Always handle API errors with user-friendly messages
- Use error boundaries for component failures
- Log errors for debugging (not to user)

### Accessibility
- Use semantic HTML elements
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Color contrast must meet WCAG AA

---

## File Naming

```
# Components
Button.tsx
Button.module.css
DoctorCard.tsx
DoctorCard.module.css

# Hooks
useAuth.ts
useApi.ts

# Stores
authStore.ts
appointmentStore.ts

# Types
User.types.ts
Appointment.types.ts

# Utils
date.utils.ts
validation.utils.ts

# Services
auth.service.ts
patient.service.ts
```

---

## Testing Guidelines

- Unit tests for utility functions
- Component tests for UI kit
- Integration tests for critical flows (login, booking)

---

## Build & Deployment

- Run `npm run build` - must pass TypeScript compilation
- Capacitor builds: `npx capacitor build ios` / `npx capacitor build android`
- Environment variables in `.env` files