# Code writing assistance
src/
│── assets/              # Project assets (images, icons, global styles)
│
│── components/          # Reusable UI components
│   ├── common/          # Generic components (buttons, inputs, modals, etc.)
│   └── layout/          # App layout (Header, Footer, Sidebar, Navigation)
│
│── features/            # Feature-based code (grouped by domain/logic)
│   ├── auth/            # Authentication (Login, Register, Forgot Password)
│   │   ├── components/  # UI related to auth
│   │   ├── pages/   
│   │   ├── index.js     # Export the feature
│   │   └── hooks/       # Custom hooks for auth state
│   │
│   └── dashboard/       # Dashboard feature
│       ├── components/
│       ├── index.js     # Export the feature
│       └── pages/
│
│── hooks/               # Global reusable hooks (e.g. useDarkMode, useAuth)
│
│── providers/           # Context providers (ThemeProvider, AuthProvider)
│
│── routes/              # Application routing setup
│
│── services/
│    ├── axiosClient.js         # Axios instance with interceptors
│   ├── api/                   # Group API requests by domain
│   │    ├── authApi.js
│   │    ├── userApi.js
│   │    └── postApi.js
│   └── index.js                # Export all APIs
│
│── theme/               # MUI theme (palette, typography, overrides)
│
│── utils/               # Helper functions (validators, formatters, constants)
│
│── App.js               # Root app component

