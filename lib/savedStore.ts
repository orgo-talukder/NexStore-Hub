'use client';

import { useSyncExternalStore, useCallback } from 'react';

const SAVED_APPS_KEY = 'nexstore_saved_apps';

let memorySavedIds: string[] = [];
let isInitialized = false;

function readStorage(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SAVED_APPS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function getSnapshot(): string[] {
  if (!isInitialized && typeof window !== 'undefined') {
    memorySavedIds = readStorage();
    isInitialized = true;
  }
  return memorySavedIds;
}

function getServerSnapshot(): string[] {
  return [];
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);

  const handleStorage = () => {
    memorySavedIds = readStorage();
    listener();
  };

  const handleCustom = (e: Event) => {
    const customEvent = e as CustomEvent<{ savedIds: string[] }>;
    if (customEvent.detail && Array.isArray(customEvent.detail.savedIds)) {
      memorySavedIds = customEvent.detail.savedIds;
    } else {
      memorySavedIds = readStorage();
    }
    listener();
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener('nexstore_saved_changed', handleCustom);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener('nexstore_saved_changed', handleCustom);
  };
}

function notify() {
  listeners.forEach((l) => l());
}

export function getSavedAppIds(): string[] {
  return getSnapshot();
}

export function isAppSaved(appId: string): boolean {
  if (!appId) return false;
  return getSavedAppIds().includes(appId);
}

export function toggleSaveApp(appId: string): boolean {
  if (typeof window === 'undefined' || !appId) return false;
  try {
    const current = getSavedAppIds();
    let updated: string[];
    let isNowSaved = false;

    if (current.includes(appId)) {
      updated = current.filter((id) => id !== appId);
      isNowSaved = false;
    } else {
      updated = [appId, ...current];
      isNowSaved = true;
    }

    memorySavedIds = updated;
    localStorage.setItem(SAVED_APPS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('nexstore_saved_changed', { detail: { savedIds: updated } }));
    notify();
    return isNowSaved;
  } catch {
    return false;
  }
}

export function removeSavedApp(appId: string): void {
  if (typeof window === 'undefined' || !appId) return;
  try {
    const current = getSavedAppIds();
    const updated = current.filter((id) => id !== appId);
    memorySavedIds = updated;
    localStorage.setItem(SAVED_APPS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('nexstore_saved_changed', { detail: { savedIds: updated } }));
    notify();
  } catch (err) {
    console.error('Error removing saved app:', err);
  }
}

export function clearAllSavedApps(): void {
  if (typeof window === 'undefined') return;
  try {
    memorySavedIds = [];
    localStorage.removeItem(SAVED_APPS_KEY);
    window.dispatchEvent(new CustomEvent('nexstore_saved_changed', { detail: { savedIds: [] } }));
    notify();
  } catch (err) {
    console.error('Error clearing saved apps:', err);
  }
}

/**
 * React hook to listen for saved items count and list changes across all components
 */
export function useSavedApps() {
  const savedIds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return {
    savedIds,
    savedCount: savedIds.length,
    isLoaded: true,
    isSaved: useCallback((id: string) => savedIds.includes(id), [savedIds]),
    toggleSave: toggleSaveApp,
    removeSaved: removeSavedApp,
    clearAll: clearAllSavedApps,
  };
}
