import { getAllPublishedApps, getActiveBanners, getCategoriesWithCounts } from '@/lib/supabase';
import { AdminDashboardClient } from '@/components/AdminDashboardClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Console | NexStore - Official Marketplace',
  description: 'Manage applications, banners, categories, and review community submissions.',
};

export const revalidate = 10;

export default async function AdminDashboardPage() {
  const [apps, banners, categories] = await Promise.all([
    getAllPublishedApps(),
    getActiveBanners(),
    getCategoriesWithCounts(),
  ]);

  return (
    <AdminDashboardClient
      initialApps={apps}
      initialBanners={banners}
      initialCategories={categories}
    />
  );
}
