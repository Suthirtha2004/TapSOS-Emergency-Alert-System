# Components Folder Structure

This folder contains all React components for the TapSOS application.

## Folder Organization

```
src/
├── Components/
│   ├── UI/                    # CSS files and styling
│   │   └── Login.css         # Login component styles
│   ├── Login.jsx             # Login/Signup component
│   ├── index.js              # Component exports
│   └── README.md             # This file
├── App.jsx                   # Main app component
└── main.jsx                  # App entry point
```

## Component Guidelines

1. **Component Files**: Place all React components directly in the `Components/` folder
2. **Styling**: All CSS files should be placed in the `Components/UI/` folder
3. **Naming**: Use PascalCase for component files (e.g., `Login.jsx`)
4. **CSS**: Use the same name as the component for CSS files (e.g., `Login.css`)

## Import Examples

```javascript
// Import a component
import Login from './Components/Login';

// Or use the index file
import { Login } from './Components';
```

## Adding New Components

1. Create your component file in `src/Components/`
2. Create corresponding CSS file in `src/Components/UI/`
3. Export the component from `src/Components/index.js`
4. Import and use in your app

## Current Components

- **Login**: Authentication component with login/signup functionality
  - Features: Form validation, demo account, Google sign-in, responsive design
  - Demo credentials: demo@tapsos.com / demo123 