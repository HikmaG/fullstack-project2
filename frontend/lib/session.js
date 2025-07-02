import { withIronSession } from 'next-iron-session'

// Fallback used during build — must be 32+ characters
const isDockerBuild = process.env.BUILDING_DOCKER === 'true';

const sessionPassword = process.env.SECRET_COOKIE_PASSWORD || (
  isDockerBuild
    ? 'temporary_fallback_password_that_is_long_enough'
    : undefined
);

if (!sessionPassword) {
  throw new Error('❌ SECRET_COOKIE_PASSWORD is not set in production!');
}

export default function withSession(handler) {
  return withIronSession(handler, {
    password: sessionPassword,
    cookieName: 'clm.mw',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  });
}
