'use client';

import { useState, useEffect, useCallback } from 'react';

export interface UserReview {
  id: string;
  appId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  deviceModel?: string;
  verifiedDownload: boolean;
  helpfulCount: number;
}

const DEFAULT_REVIEWS: Record<string, UserReview[]> = {
  default: [
    {
      id: 'rev-1',
      appId: 'default',
      userName: 'Tanjim Ahmed',
      rating: 5,
      title: 'Fast and super stable!',
      comment: 'Direct download works at full speed with zero popup ads. Installed on Android 14 without any issues.',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      deviceModel: 'Samsung Galaxy S23',
      verifiedDownload: true,
      helpfulCount: 14,
    },
    {
      id: 'rev-2',
      appId: 'default',
      userName: 'Rafiqul Islam',
      rating: 5,
      title: 'Verified safe APK',
      comment: 'Clean binary package, verified with VirusTotal. Truly love the dark mode UI of NexStore!',
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      deviceModel: 'Xiaomi Redmi Note 12',
      verifiedDownload: true,
      helpfulCount: 9,
    },
    {
      id: 'rev-3',
      appId: 'default',
      userName: 'Kazi Farhan',
      rating: 4,
      title: 'Great experience',
      comment: 'App runs smoothly. Looking forward to more regular update notifications.',
      createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
      deviceModel: 'Google Pixel 8',
      verifiedDownload: true,
      helpfulCount: 5,
    }
  ]
};

const REVIEWS_STORAGE_PREFIX = 'nexstore_reviews_';

export function getAppReviews(appId: string): UserReview[] {
  if (typeof window === 'undefined') {
    return DEFAULT_REVIEWS.default.map((r) => ({ ...r, appId }));
  }

  try {
    const raw = localStorage.getItem(`${REVIEWS_STORAGE_PREFIX}${appId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    return DEFAULT_REVIEWS.default.map((r) => ({ ...r, appId }));
  } catch {
    return DEFAULT_REVIEWS.default.map((r) => ({ ...r, appId }));
  }
}

export function saveAppReview(appId: string, review: Omit<UserReview, 'id' | 'createdAt' | 'helpfulCount'>): UserReview {
  const newReview: UserReview = {
    ...review,
    id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    helpfulCount: 0,
  };

  if (typeof window !== 'undefined') {
    try {
      const existing = getAppReviews(appId);
      const updated = [newReview, ...existing];
      localStorage.setItem(`${REVIEWS_STORAGE_PREFIX}${appId}`, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent(`nexstore_review_added_${appId}`, { detail: { newReview } }));
    } catch (err) {
      console.error('Failed to save review:', err);
    }
  }

  return newReview;
}

export function useAppReviews(appId: string) {
  const [reviews, setReviews] = useState<UserReview[]>(() => getAppReviews(appId));

  const reload = useCallback(() => {
    setReviews(getAppReviews(appId));
  }, [appId]);

  useEffect(() => {
    const handleEvent = () => reload();
    window.addEventListener(`nexstore_review_added_${appId}`, handleEvent);
    return () => window.removeEventListener(`nexstore_review_added_${appId}`, handleEvent);
  }, [appId, reload]);

  return {
    reviews,
    isLoaded: true,
    addReview: (review: Omit<UserReview, 'id' | 'createdAt' | 'helpfulCount'>) => saveAppReview(appId, review),
    reload,
  };
}
