'use server';

import { incrementDownloads } from '@/lib/supabase';
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

