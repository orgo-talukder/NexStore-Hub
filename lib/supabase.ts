import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

// Fallback warning if environment variables are not set yet
if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    console.warn('Supabase URL or Anon Key is missing. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  }
}

// Client singleton with safe initialization
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: typeof window !== 'undefined',
      autoRefreshToken: true,
    },
  }
);

export interface AppItem {
  id: string;
  name: string;
  slug: string;
  packageName: string;
  category: string;
  shortDescription: string;
  description: string;
  features: string[];
  keywords: string[];
  minAndroid: string;
  targetAndroid: string;
  permissions: string[];
  iconUrl: string;
  bannerUrl?: string | null;
  thumbnailUrl?: string | null;
  screenshots: string[];
  rating: string;
  downloads: number;
  latestVersion: string;
  apkSize: string;
  apkUrl: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  badgeText: string | null;
  linkUrl: string | null;
  imageUrl: string;
  displayOrder: number;
  active: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  displayOrder: number;
  enabled: boolean;
  appCount?: number;
}

export interface VersionItem {
  id: string;
  appId: string;
  versionName: string;
  versionCode?: string | number;
  releaseNotes: string;
  apkUrl?: string | null;
  apkSize?: string | null;
  createdAt: string;
}

/**
 * Normalizes raw Supabase row data to consistent camelCase types
 * handles both snake_case columns (standard in Supabase) and camelCase
 */
export function normalizeApp(raw: Record<string, unknown>): AppItem {
  if (!raw) return {} as AppItem;

  const parseArray = (val: unknown): string[] => {
    if (Array.isArray(val)) return val.map(String);
    if (typeof val === 'string') {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed.map(String);
      } catch {
        return val.split(',').map(s => s.trim()).filter(Boolean);
      }
    }
    return [];
  };

  return {
    id: String(raw.id || ''),
    name: String(raw.name || ''),
    slug: String(raw.slug || raw.id || ''),
    packageName: String(raw.package_name || raw.packageName || raw.package || ''),
    category: String(raw.category || 'general').toLowerCase(),
    shortDescription: String(raw.short_description || raw.shortDescription || raw.description || ''),
    description: String(raw.description || raw.short_description || ''),
    features: parseArray(raw.features),
    keywords: parseArray(raw.keywords),
    minAndroid: String(raw.min_android || raw.minAndroid || 'Android 8.0+'),
    targetAndroid: String(raw.target_android || raw.targetAndroid || 'Android 14'),
    permissions: parseArray(raw.permissions),
    iconUrl: String(raw.icon_url || raw.iconUrl || raw.icon || 'https://picsum.photos/seed/appicon/200/200'),
    bannerUrl: (raw.banner_url as string) || (raw.bannerUrl as string) || null,
    thumbnailUrl: (raw.thumbnail_url as string) || (raw.thumbnailUrl as string) || null,
    screenshots: parseArray(raw.screenshots),
    rating: raw.rating !== undefined && raw.rating !== null ? String(raw.rating) : '5.0',
    downloads: Number(raw.downloads || 0),
    latestVersion: String(raw.latest_version || raw.latestVersion || raw.version || '1.0.0'),
    apkSize: String(raw.apk_size || raw.apkSize || '25 MB'),
    apkUrl: String(raw.apk_url || raw.apkUrl || '#'),
    featured: Boolean(raw.featured ?? false),
    published: Boolean(raw.published ?? true),
    createdAt: String(raw.created_at || raw.createdAt || new Date().toISOString()),
    updatedAt: String(raw.updated_at || raw.updatedAt || raw.created_at || new Date().toISOString()),
  };
}

/**
 * Normalizes raw Supabase banner
 */
export function normalizeBanner(raw: Record<string, unknown>): BannerItem {
  return {
    id: String(raw.id || ''),
    title: String(raw.title || ''),
    subtitle: String(raw.subtitle || ''),
    badgeText: (raw.badge_text as string) || (raw.badgeText as string) || null,
    linkUrl: (raw.link_url as string) || (raw.linkUrl as string) || null,
    imageUrl: String(raw.image_url || raw.imageUrl || 'https://picsum.photos/seed/banner/1200/500'),
    displayOrder: Number(raw.display_order ?? raw.displayOrder ?? 0),
    active: Boolean(raw.active ?? true),
  };
}

/**
 * Normalizes raw Supabase category
 */
export function normalizeCategory(raw: Record<string, unknown>): CategoryItem {
  return {
    id: String(raw.id || raw.slug || '').toLowerCase(),
    name: String(raw.name || ''),
    icon: String(raw.icon || '📱'),
    displayOrder: Number(raw.display_order ?? raw.displayOrder ?? 0),
    enabled: Boolean(raw.enabled ?? true),
    appCount: typeof raw.appCount === 'number' ? raw.appCount : undefined,
  };
}

/**
 * Normalizes raw Supabase version
 */
export function normalizeVersion(raw: Record<string, unknown>): VersionItem {
  return {
    id: String(raw.id || ''),
    appId: String(raw.app_id || raw.appId || ''),
    versionName: String(raw.version_name || raw.versionName || raw.version || '1.0.0'),
    versionCode: (raw.version_code as string | number) || (raw.versionCode as string | number) || 1,
    releaseNotes: String(raw.release_notes || raw.releaseNotes || raw.changelog || 'Performance improvements and bug fixes.'),
    apkUrl: (raw.apk_url as string) || (raw.apkUrl as string) || null,
    apkSize: (raw.apk_size as string) || (raw.apkSize as string) || null,
    createdAt: String(raw.created_at || raw.createdAt || new Date().toISOString()),
  };
}


// -------------------------------------------------------------
// IN-MEMORY CACHE & PERFORMANCE LAYER
// -------------------------------------------------------------
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const memoryCache = new Map<string, CacheEntry<unknown>>();
const DEFAULT_TTL_MS = 45 * 1000; // 45 seconds cache for blazing fast responses

async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs = DEFAULT_TTL_MS
): Promise<T> {
  const now = Date.now();
  const cached = memoryCache.get(key) as CacheEntry<T> | undefined;

  if (cached && now - cached.timestamp < ttlMs) {
    return cached.data;
  }

  try {
    const data = await fetcher();
    memoryCache.set(key, { data, timestamp: now });
    return data;
  } catch (err) {
    // If error and we have stale cached data, return stale data instead of failing
    if (cached) {
      return cached.data;
    }
    throw err;
  }
}

export function invalidateCache(keyPrefix?: string) {
  if (!keyPrefix) {
    memoryCache.clear();
    return;
  }
  for (const key of memoryCache.keys()) {
    if (key.startsWith(keyPrefix)) {
      memoryCache.delete(key);
    }
  }
}

// -------------------------------------------------------------
// REAL SUPABASE QUERIES (Zero mock data, 100% database driven)
// -------------------------------------------------------------

/**
 * Fetch active banners ordered by display_order (cached)
 */
export async function getActiveBanners(): Promise<BannerItem[]> {
  return cachedFetch('banners:active', async () => {
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Supabase getActiveBanners error:', error.message);
        return [];
      }
      return (data || []).map(normalizeBanner);
    } catch (err) {
      console.error('Error in getActiveBanners:', err);
      return [];
    }
  });
}

/**
 * Fetch enabled categories ordered by display_order (cached)
 */
export async function getCategories(): Promise<CategoryItem[]> {
  return cachedFetch('categories:enabled', async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('enabled', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Supabase getCategories error:', error.message);
        return [];
      }
      return (data || []).map(normalizeCategory);
    } catch (err) {
      console.error('Error in getCategories:', err);
      return [];
    }
  });
}

/**
 * Fetch top downloaded published apps
 */
export async function getTopDownloads(limit = 10): Promise<AppItem[]> {
  const all = await getAllPublishedApps();
  return [...all].sort((a, b) => b.downloads - a.downloads).slice(0, limit);
}

/**
 * Fetch latest releases ordered by created_at or updated_at
 */
export async function getLatestReleases(limit = 6): Promise<AppItem[]> {
  const all = await getAllPublishedApps();
  return [...all]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

/**
 * Fetch spotlight/featured apps
 */
export async function getSpotlightApps(limit = 6): Promise<AppItem[]> {
  const all = await getAllPublishedApps();
  const spotlight = all.filter((a) => a.featured || !!a.bannerUrl || !!a.thumbnailUrl);
  if (spotlight.length > 0) {
    return spotlight.slice(0, limit);
  }
  // Fallback to top downloads
  return all.slice(0, limit);
}

/**
 * Fetch apps by specific category
 */
export async function getAppsByCategory(category: string, limit = 6): Promise<AppItem[]> {
  const all = await getAllPublishedApps();
  const catLower = category.toLowerCase().trim();
  return all
    .filter((a) => (a.category || '').toLowerCase().trim() === catLower)
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, limit);
}

/**
 * Fetch all published apps with internal cache (single source of truth for high speed)
 */
export async function getAllPublishedApps(): Promise<AppItem[]> {
  return cachedFetch('apps:published:all', async () => {
    try {
      const { data, error } = await supabase
        .from('apps')
        .select('*')
        .eq('published', true)
        .order('downloads', { ascending: false });

      if (error) {
        console.error('Supabase getAllPublishedApps error:', error.message);
        return [];
      }
      return (data || []).map(normalizeApp);
    } catch (err) {
      console.error('Error in getAllPublishedApps:', err);
      return [];
    }
  });
}

/**
 * Combined home page data fetcher - ONLY 2-3 super fast queries total!
 */
export async function getHomePageData() {
  return cachedFetch('home:aggregated', async () => {
    const [banners, categories, allApps] = await Promise.all([
      getActiveBanners(),
      getCategories(),
      getAllPublishedApps(),
    ]);

    // Top downloads
    const topApps = [...allApps].sort((a, b) => b.downloads - a.downloads).slice(0, 10);

    // Latest releases
    const latestApps = [...allApps]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6);

    // Spotlight
    const spotlightApps = allApps.filter((a) => a.featured || !!a.bannerUrl || !!a.thumbnailUrl).slice(0, 6);

    // Dynamic category highlights (up to 4 categories)
    const categoryHighlights = categories.slice(0, 4).map((cat) => {
      const catLower = cat.id.toLowerCase().trim();
      const apps = allApps
        .filter((a) => (a.category || '').toLowerCase().trim() === catLower)
        .slice(0, 3);
      return { category: cat, apps };
    });

    return {
      banners,
      categories,
      allApps,
      topApps,
      latestApps,
      spotlightApps: spotlightApps.length > 0 ? spotlightApps : topApps.slice(0, 6),
      categoryHighlights,
    };
  }, 30 * 1000);
}

/**
 * Fetch all published apps with optional category, sort, and search filters
 */
export async function getAllApps({
  category,
  sort = 'popular',
  search,
}: {
  category?: string;
  sort?: string;
  search?: string;
} = {}): Promise<AppItem[]> {
  try {
    let query = supabase
      .from('apps')
      .select('*')
      .eq('published', true);

    if (category && category.trim() !== '') {
      query = query.ilike('category', category.trim());
    }

    if (search && search.trim() !== '') {
      const q = search.trim();
      query = query.or(
        `name.ilike.%${q}%,package_name.ilike.%${q}%,category.ilike.%${q}%,short_description.ilike.%${q}%,description.ilike.%${q}%`
      );
    }

    if (sort === 'newest') {
      query = query.order('created_at', { ascending: false });
    } else if (sort === 'az') {
      query = query.order('name', { ascending: true });
    } else if (sort === 'za') {
      query = query.order('name', { ascending: false });
    } else if (sort === 'rating') {
      query = query.order('rating', { ascending: false });
    } else {
      // Default: Most Popular
      query = query.order('downloads', { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase getAllApps error:', error.message);
      return [];
    }
    return (data || []).map(normalizeApp);
  } catch (err) {
    console.error('Error in getAllApps:', err);
    return [];
  }
}

/**
 * Fetch a single app by slug, id, or package_name (ultra fast with memory cache)
 */
export async function getAppBySlugOrId(idOrSlug: string): Promise<AppItem | null> {
  if (!idOrSlug) return null;

  // 1. First check our already cached all apps list (0ms response time!)
  const allCached = await getAllPublishedApps();
  const found = allCached.find(
    (a) => a.slug === idOrSlug || a.id === idOrSlug || a.packageName === idOrSlug
  );
  if (found) {
    return found;
  }

  // 2. Direct query fallback
  return cachedFetch(`app:${idOrSlug}`, async () => {
    try {
      // Try slug first
      const { data: slugData } = await supabase
        .from('apps')
        .select('*')
        .eq('slug', idOrSlug)
        .eq('published', true)
        .limit(1);

      if (slugData && slugData.length > 0) {
        return normalizeApp(slugData[0]);
      }

      // Try id or package_name
      const { data: idData, error } = await supabase
        .from('apps')
        .select('*')
        .or(`id.eq.${idOrSlug},package_name.eq.${idOrSlug}`)
        .eq('published', true)
        .limit(1);

      if (error || !idData || idData.length === 0) {
        return null;
      }

      return normalizeApp(idData[0]);
    } catch (err) {
      console.error('Error in getAppBySlugOrId:', err);
      return null;
    }
  });
}

/**
 * Fetch version history and release notes from versions table
 */
export async function getAppVersions(appId: string): Promise<VersionItem[]> {
  if (!appId) return [];

  return cachedFetch(`versions:${appId}`, async () => {
    try {
      const { data, error } = await supabase
        .from('versions')
        .select('*')
        .eq('app_id', appId)
        .order('created_at', { ascending: false });

      if (error) {
        return [];
      }
      return (data || []).map(normalizeVersion);
    } catch (err) {
      console.error('Error in getAppVersions:', err);
      return [];
    }
  });
}

/**
 * Increments app downloads in Supabase
 * Tries RPC increment_downloads, falls back to direct update
 */
export async function incrementDownloads(appId: string): Promise<{ success: boolean; newCount?: number }> {
  // Invalidate cache immediately so new download count reflects on next load
  invalidateCache('apps:');
  invalidateCache('home:');
  invalidateCache(`app:${appId}`);

  try {
    // 1. Try Supabase RPC 'increment_downloads'
    const { data: rpcData, error: rpcError } = await supabase.rpc('increment_downloads', {
      app_id: appId,
    });

    if (!rpcError) {
      return { success: true, newCount: typeof rpcData === 'number' ? rpcData : undefined };
    }

    // 2. Direct read + update fallback
    const { data: appData, error: fetchError } = await supabase
      .from('apps')
      .select('downloads')
      .eq('id', appId)
      .single();

    if (fetchError || !appData) {
      return { success: false };
    }

    const currentDownloads = Number(appData.downloads || 0);
    const newDownloads = currentDownloads + 1;

    const { error: updateError } = await supabase
      .from('apps')
      .update({ downloads: newDownloads })
      .eq('id', appId);

    if (updateError) {
      console.error('Failed to update downloads count:', updateError.message);
      return { success: false };
    }

    return { success: true, newCount: newDownloads };
  } catch (err) {
    console.error('Error in incrementDownloads:', err);
    return { success: false };
  }
}

/**
 * Calculate real category counts from published apps
 */
export async function getCategoriesWithCounts(): Promise<CategoryItem[]> {
  try {
    const [categories, apps] = await Promise.all([
      getCategories(),
      getAllApps(),
    ]);

    const countMap: Record<string, number> = {};
    for (const app of apps) {
      const cat = (app.category || 'general').toLowerCase();
      countMap[cat] = (countMap[cat] || 0) + 1;
    }

    return categories.map((cat) => ({
      ...cat,
      appCount: countMap[cat.id.toLowerCase()] || 0,
    }));
  } catch (err) {
    console.error('Error in getCategoriesWithCounts:', err);
    return [];
  }
}
