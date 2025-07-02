import 'dotenv/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SESSION_PASSWORD: process.env.SESSION_PASSWORD,
  },
};

export default nextConfig;
