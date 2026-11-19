import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
  async redirects() {
    return [
      // The vercel.app alias serves the same pages as the custom domain.
      // Send it there so search engines index one host only.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'ps-lando-docs.vercel.app' }],
        destination: 'https://ps-lando.educalvolopez.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
