import type { MetadataRoute } from 'next';
import { appName, description, tagline } from '@/lib/shared';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${appName} — ${tagline}`,
    short_name: appName,
    description,
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0f10',
    theme_color: '#15a8a3',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
