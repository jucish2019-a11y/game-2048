/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/game-2048' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
