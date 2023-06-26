const withTM = require('next-transpile-modules')(['@codecademy/gamut-illustrations', '@codecademy/gamut-patterns', '@codecademy/gamut-styles', '@codecademy/variance']); 

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/:path*',
      },
    ];
  },
  images: {
    domains: ['127.0.0.1'],
  }
}


// module.exports = nextConfig
module.exports = withTM(nextConfig);