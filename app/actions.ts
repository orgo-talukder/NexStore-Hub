'use server';

import { incrementDownloads, submitAppReviewToSupabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function incrementDownload(appId: string) {
  try {
    const result = await incrementDownloads(appId);
    
    // Revalidate paths that show download counts
    revalidatePath('/');
    revalidatePath('/apps');
    revalidatePath(`/app/[id]`, 'page');
    
    return { success: result.success, newCount: result.newCount };
  } catch (error) {
    console.error('Error incrementing downloads:', error);
    return { success: false };
  }
}

export async function submitAppReviewAction(data: {
  appId: string;
  userName: string;
  rating: number;
  title?: string;
  comment: string;
  deviceModel?: string;
}) {
  try {
    const result = await submitAppReviewToSupabase(data);

    // Revalidate page paths so new ratings & reviews show up everywhere
    revalidatePath('/');
    revalidatePath('/apps');
    revalidatePath(`/app/${data.appId}`);
    revalidatePath('/app/[id]', 'page');

    return result;
  } catch (error) {
    console.error('Error submitting review action:', error);
    return { success: false };
  }
}


