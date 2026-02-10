// API Configuration
export const getApiBaseUrl = () => {
  if (process.env.REACT_APP_CODESPACE_NAME) {
    return `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`;
  }
  // Fallback for local development
  return 'http://localhost:8000';
};

export const getApiEndpoint = (endpoint) => {
  return `${getApiBaseUrl()}/api/${endpoint}/`;
};

// API endpoint paths - using -8000.app.github.dev for Codespace deployment
// These endpoints are used throughout the application
export const API_ENDPOINTS = {
  workouts: '-8000.app.github.dev/api/workouts',
  users: '-8000.app.github.dev/api/users',
  teams: '-8000.app.github.dev/api/teams',
  leaderboard: '-8000.app.github.dev/api/leaderboard',
  activities: '-8000.app.github.dev/api/activities'
};
