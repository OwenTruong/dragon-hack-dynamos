const SERVER_DEVELOPMENT_URL = 'http://localhost:3001';
const SERVER_PRODUCTION_URL = 'unknown';

export const SERVER_URL =
  process.env.NODE_ENV === 'development'
    ? SERVER_DEVELOPMENT_URL
    : SERVER_PRODUCTION_URL;
