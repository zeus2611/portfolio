/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
        port: '',
        pathname: '/v2/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/devicons/**',
      },
      {
        protocol: 'https',
        hostname: 'www.vectorlogo.zone',
        port: '',
        pathname: '/logos/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/zeus2611/**',
      },
    ],
  },
};

export default nextConfig;
