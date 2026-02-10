# OctoFit Tracker Frontend

This is the React frontend for the OctoFit Tracker fitness application.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Activities.js
│   │   ├── Leaderboard.js
│   │   ├── Teams.js
│   │   ├── Users.js
│   │   └── Workouts.js
│   ├── utils/
│   │   └── api.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── .env.example
```

## Features

- **Navigation Menu**: React Router DOM-based navigation for seamless component switching
- **Activities**: View and manage fitness activities
- **Leaderboard**: Competitive rankings and scoring
- **Teams**: Create and manage fitness teams
- **Users**: User management and profiles
- **Workouts**: Browse suggested and custom workouts

## Setup Instructions

### 1. Install Dependencies
```bash
cd octofit-tracker/frontend
npm install
```

### 2. Environment Variables

The app automatically detects the GitHub Codespaces environment:
- In Codespaces: Uses `https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev`
- In local development: Falls back to `http://localhost:8000`

### 3. Start the Development Server
```bash
npm start
```

The app will open at `http://localhost:3000` with automatic reload on file changes.

## API Integration

All components connect to the Django REST API backend:

- **Activities**: `/api/activities/`
- **Leaderboard**: `/api/leaderboard/`
- **Teams**: `/api/teams/`
- **Users**: `/api/users/`
- **Workouts**: `/api/workouts/`

### API Response Handling

All components are designed to handle both:
- **Paginated responses** (with `.results` property)
- **Plain array responses**

### Debugging

Open the browser's Developer Console (F12) to see:
- REST API endpoints being called
- Raw response data from the backend
- Processed data after pagination handling
- Any fetch errors or exceptions

## Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

## Backend Requirements

The backend must be running with CORS enabled to accept requests from this frontend. The Django backend should allow requests from:
- `https://{CODESPACE_NAME}-3000.app.github.dev` (React dev server in Codespaces)
- `localhost:3000` (local development)

See the backend `settings.py` for CORS configuration details.

## Technologies Used

- **React 19.2.4**: UI library
- **React Router v7.13.0**: Navigation and routing
- **Bootstrap 5.3.8**: Styling and components
- **Fetch API**: HTTP requests to backend

## Troubleshooting

### Cannot fetch data from backend
1. Verify the backend is running on port 8000
2. Check CORS settings in backend
3. Confirm `REACT_APP_CODESPACE_NAME` is set in Codespaces
4. Check browser console for specific error messages

### Navigation not working
- Ensure react-router-dom is installed: `npm install react-router-dom`
- Clear browser cache and restart dev server

### Styling issues
- Bootstrap CSS is imported in `index.js`
- Check browser DevTools for CSS conflicts
- Ensure App.css is properly linked
