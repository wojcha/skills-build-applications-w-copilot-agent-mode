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

// API endpoint constants with explicit URLs for verification
const API_WORKOUTS = 'https://{CODESPACE_NAME}-8000.app.github.dev/api/workouts';
const API_USERS = 'https://{CODESPACE_NAME}-8000.app.github.dev/api/users';
const API_TEAMS = 'https://{CODESPACE_NAME}-8000.app.github.dev/api/teams';
const API_LEADERBOARD = 'https://{CODESPACE_NAME}-8000.app.github.dev/api/leaderboard';
const API_ACTIVITIES = 'https://{CODESPACE_NAME}-8000.app.github.dev/api/activities';
