/** @type {import('next').NextConfig} */
const productRedirects = require('./redirects');
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  poweredByHeader: false,
  compress: true,
  trailingSlash: false,
    images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'img.youtube.com',
      port: '',
      pathname: '/**',
    },
    {
      protocol: 'http',  // for local dev
      hostname: 'localhost',
      port: '3000',
      pathname: '/uploads/**',
    },
    {
      protocol: 'https', // for production
      hostname: 'webdemosbe.xyz',
      port: '',
      pathname: '/uploads/**',
    },
    ],
    deviceSizes: [320, 640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    formats: ['image/webp'],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS, PUT, PATCH, DELETE' },
          { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With, Content-Type, Authorization' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self' https://www.google.com/ https://www.youtube.com/;
              img-src 'self' data: img.youtube.com https://www.googletagmanager.com https://www.google-analytics.com https://www.google.co.id https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png https://c.tile.openstreetmap.org https://a.tile.openstreetmap.org https://b.tile.openstreetmap.org;
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google.com https://www.gstatic.com;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' data: https://fonts.gstatic.com;
              connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com https://ipapi.co/::1/json/ https://www.google.com https://www.gstatic.com https://ipapi.co/182.16.168.187/json/;
            `.replace(/\n/g, ' ')
          }
        ],
      },
    ];
  },
  
  async redirects() {
    return productRedirects;
  },
};

module.exports = nextConfig;
