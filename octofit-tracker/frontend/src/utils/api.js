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
// These patterns are used by the getApiEndpoint function above
// Endpoint: -8000.app.github.dev/api/workouts
// Endpoint: -8000.app.github.dev/api/users
// Endpoint: -8000.app.github.dev/api/teams
// Endpoint: -8000.app.github.dev/api/leaderboard
// Endpoint: -8000.app.github.dev/api/activities
