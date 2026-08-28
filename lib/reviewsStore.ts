'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchAppReviewsFromSupabase, type ReviewItem } from '@/lib/supabase';
import { submitAppReviewAction } from '@/app/actions';

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
      id: 'rev-seed-1',
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
      id: 'rev-seed-2',
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
      id: 'rev-seed-3',
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

export function getLocalReviews(appId: string): UserReview[] {
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

export function saveLocalReview(appId: string, review: UserReview) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getLocalReviews(appId);
    // Avoid duplicates
    const filtered = existing.filter((r) => r.id !== review.id);
    const updated = [review, ...filtered];
    localStorage.setItem(`${REVIEWS_STORAGE_PREFIX}${appId}`, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save review to localStorage:', err);
  }
}

export function useAppReviews(appId: string) {
  const [reviews, setReviews] = useState<UserReview[]>(() => getLocalReviews(appId));
  const [isLoading, setIsLoading] = useState(false);

  // Load real reviews from Supabase on mount
  useEffect(() => {
    if (!appId) return;
    let isCancelled = false;

    fetchAppReviewsFromSupabase(appId)
      .then((dbReviews) => {
        if (isCancelled) return;
        if (dbReviews && dbReviews.length > 0) {
          const mapped: UserReview[] = dbReviews.map((r) => ({
            id: r.id,
            appId: r.appId,
            userName: r.userName,
            rating: r.rating,
            title: r.title || `${r.rating} Star Review`,
            comment: r.comment,
            createdAt: r.createdAt,
            deviceModel: r.deviceModel,
            verifiedDownload: r.verifiedDownload ?? true,
            helpfulCount: r.helpfulCount || 0,
          }));
          setReviews(mapped);
          if (typeof window !== 'undefined') {
            localStorage.setItem(`${REVIEWS_STORAGE_PREFIX}${appId}`, JSON.stringify(mapped));
          }
        }
      })
      .catch((err) => {
        console.warn('Could not fetch reviews from Supabase directly, relying on cached store:', err);
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [appId]);

  const reload = useCallback(() => {
    if (!appId) return;
    setIsLoading(true);
    fetchAppReviewsFromSupabase(appId)
      .then((dbReviews) => {
        if (dbReviews && dbReviews.length > 0) {
          const mapped: UserReview[] = dbReviews.map((r) => ({
            id: r.id,
            appId: r.appId,
            userName: r.userName,
            rating: r.rating,
            title: r.title || `${r.rating} Star Review`,
            comment: r.comment,
            createdAt: r.createdAt,
            deviceModel: r.deviceModel,
            verifiedDownload: r.verifiedDownload ?? true,
            helpfulCount: r.helpfulCount || 0,
          }));
          setReviews(mapped);
        }
      })
      .finally(() => setIsLoading(false));
  }, [appId]);

  // Listen for local review events across tabs/components
  useEffect(() => {
    const handleEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ newReview: UserReview }>;
      if (customEvent.detail?.newReview) {
        setReviews((prev) => [customEvent.detail.newReview, ...prev.filter((r) => r.id !== customEvent.detail.newReview.id)]);
      } else {
        reload();
      }
    };
    window.addEventListener(`nexstore_review_added_${appId}`, handleEvent);
    return () => window.removeEventListener(`nexstore_review_added_${appId}`, handleEvent);
  }, [appId, reload]);

  const addReview = async (review: Omit<UserReview, 'id' | 'createdAt' | 'helpfulCount'>) => {
    const tempId = `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newReviewItem: UserReview = {
      ...review,
      id: tempId,
      createdAt: new Date().toISOString(),
      helpfulCount: 0,
    };

    // 1. Optimistic instant local update
    setReviews((prev) => [newReviewItem, ...prev]);
    saveLocalReview(appId, newReviewItem);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent(`nexstore_review_added_${appId}`, { detail: { newReview: newReviewItem } })
      );
    }

    // 2. Persist to Supabase database via server action
    try {
      const res = await submitAppReviewAction({
        appId,
        userName: review.userName,
        rating: review.rating,
        title: review.title,
        comment: review.comment,
        deviceModel: review.deviceModel,
      });

      if (res && res.review) {
        const confirmedReview: UserReview = {
          id: res.review.id,
          appId,
          userName: res.review.userName,
          rating: res.review.rating,
          title: res.review.title || review.title,
          comment: res.review.comment,
          createdAt: res.review.createdAt,
          deviceModel: res.review.deviceModel,
          verifiedDownload: true,
          helpfulCount: 0,
        };
        setReviews((prev) => [confirmedReview, ...prev.filter((r) => r.id !== tempId && r.id !== res.review?.id)]);
        saveLocalReview(appId, confirmedReview);
      }
    } catch (err) {
      console.error('Server action review submission failed, kept in local store:', err);
    }

    return newReviewItem;
  };

  return {
    reviews,
    isLoading,
    isLoaded: true,
    addReview,
    reload: loadFromDb,
  };
}

