// next.config.mjs
import withPWA from 'next-pwa';
const DEFAULT_LANGUAGE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en';

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},

 

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

 export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', 
  register: true,
  skipWaiting: true,
})(nextConfig);
