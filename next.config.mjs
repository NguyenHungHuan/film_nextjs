/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'img.ophim1.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
