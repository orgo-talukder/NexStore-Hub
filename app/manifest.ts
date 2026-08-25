import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NexStore - Verified App Marketplace',
    short_name: 'NexStore',
    description: 'The official open marketplace for verified Android applications, utilities, and tools.',
    start_url: '/',
    display: 'standalone',
    background_color: '#060911',
    theme_color: '#3B82F6',
    icons: [
      {
        src: 'https://i.ibb.co/V05G0rcC/IMG-20260825-200138.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://i.ibb.co/V05G0rcC/IMG-20260825-200138.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
