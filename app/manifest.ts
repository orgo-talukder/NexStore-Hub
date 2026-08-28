import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NexStore - Verified App Marketplace',
    short_name: 'NexStore',
    description: 'The official open marketplace for verified Android applications, utilities, and tools.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#060911',
    theme_color: '#3B82F6',
    icons: [
      {
        src: 'https://i.ibb.co/LDsrNcxr/20260825-191156.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'https://i.ibb.co/LDsrNcxr/20260825-191156.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
