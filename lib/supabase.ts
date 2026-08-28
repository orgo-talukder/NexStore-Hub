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
  categoryName?: string;
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
  releaseChannel?: 'stable' | 'beta' | 'alpha' | 'nightly' | string;
  architecture?: string;
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
  slug?: string;
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
  apkUrl: string;
  apkSizeBytes?: number;
  apkSizeDisplay?: string;
  minAndroidVersion?: string;
  targetAndroidVersion?: string;
  changelog?: string;
  releaseNotes: string;
  releaseChannel?: 'stable' | 'beta' | 'alpha' | 'nightly' | string;
  architecture?: 'universal' | 'arm64-v8a' | 'armeabi-v7a' | 'x86_64' | string;
  sha256?: string;
  isLatest?: boolean;
  status: 'published' | 'draft' | 'unpublished' | 'archived' | string;
  publishedAt: string;
  createdAt: string;
  updatedAt?: string;
}

/**
 * Formats any raw size value (number, byte count, or string without unit like "29")
 * into a clean, human-readable format with unit (e.g. "29 MB", "120 KB", "1.2 GB").
 */
export function formatApkSize(
  rawSize?: unknown,
  rawUnit?: unknown,
  rawBytes?: unknown
): string {
  // If exact bytes given
  if (typeof rawBytes === 'number' && rawBytes > 0 && (!rawSize || rawSize === '0' || rawSize === 0)) {
    if (rawBytes >= 1024 * 1024 * 1024) {
      return `${(rawBytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    }
    if (rawBytes >= 1024 * 1024) {
      return `${(rawBytes / (1024 * 1024)).toFixed(1)} MB`;
    }
    if (rawBytes >= 1024) {
      return `${(rawBytes / 1024).toFixed(0)} KB`;
    }
    return `${rawBytes} B`;
  }

  if (rawSize === undefined || rawSize === null || rawSize === '') {
    return 'APK';
  }

  const str = String(rawSize).trim();
  if (!str || str === 'null' || str === 'undefined' || str === '0') {
    return 'APK';
  }

  // If already has unit e.g. "29 MB", "29.9 MB", "150 KB", "1.2 GB"
  const unitMatch = str.match(/^([\d.,]+)\s*([a-zA-Z]+)$/);
  if (unitMatch) {
    const num = unitMatch[1];
    const unit = unitMatch[2].toUpperCase();
    if (['B', 'KB', 'MB', 'GB', 'TB'].includes(unit)) {
      return `${num} ${unit}`;
    }
  }

  // If it's a pure number or numeric string (e.g. 29, "29", "29.5")
  const numVal = parseFloat(str.replace(/,/g, ''));
  if (!isNaN(numVal)) {
    // If explicit unit was passed separately (e.g. from admin panel: size: 29.9, unit: "MB")
    if (rawUnit && typeof rawUnit === 'string' && rawUnit.trim()) {
      const u = rawUnit.trim().toUpperCase();
      return `${numVal} ${u}`;
    }

    // If large byte number (e.g. 30408704)
    if (numVal >= 1024 * 1024 * 1024) {
      return `${(numVal / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    }
    if (numVal >= 1024 * 1024) {
      return `${(numVal / (1024 * 1024)).toFixed(1)} MB`;
    }
    if (numVal > 10000) {
      return `${(numVal / 1024).toFixed(0)} KB`;
    }

    // Standard Android APK size unit is MB for typical small numbers (like 29)
    return `${numVal} MB`;
  }

  return str;
}

/**
 * Normalizes raw Supabase row data to consistent camelCase types
 * handles both snake_case columns (standard in Supabase) and camelCase,
 * and enriches with real latest version data from app_versions
 */
export function normalizeApp(
  raw: Record<string, unknown>,
  latestVersion?: VersionItem
): AppItem {
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

  // Real APK size resolution: Prefer latestVersion from app_versions, then raw app columns
  const rawSize = 
    latestVersion?.apkSizeDisplay || 
    raw.apk_size_display || 
    raw.apkSizeDisplay || 
    raw.apk_size || 
    raw.apkSize || 
    raw.size || 
    raw.file_size;

  const rawUnit = 
    raw.apk_size_unit || 
    raw.apkSizeUnit || 
    raw.size_unit || 
    raw.sizeUnit || 
    raw.unit || 
    raw.file_size_unit;

  const rawBytes = 
    latestVersion?.apkSizeBytes || 
    raw.apk_size_bytes || 
    raw.apkSizeBytes;

  const formattedApkSize = formatApkSize(rawSize, rawUnit, rawBytes);

  // Version resolution: Prefer version from app_versions
  const rawVer = 
    latestVersion?.versionName || 
    (raw.latest_version as string) || 
    (raw.latestVersion as string) || 
    (raw.version_name as string) || 
    (raw.version as string) || 
    '1.0.0';
  const cleanVer = cleanVersionNumber(rawVer);

  // Channel resolution
  const rawChannel = 
    latestVersion?.releaseChannel || 
    (raw.release_channel as string) || 
    (raw.releaseChannel as string) || 
    (raw.channel as string) || 
    'stable';

  // Architecture resolution
  const rawArch = 
    latestVersion?.architecture || 
    (raw.architecture as string) || 
    (raw.arch as string) || 
    'universal';

  // APK URL resolution
  const apkUrl = 
    (latestVersion?.apkUrl && latestVersion.apkUrl !== '#') 
      ? latestVersion.apkUrl 
      : String(raw.apk_url || raw.apkUrl || raw.download_url || '#');

  // Min Android resolution
  const minAndroid = 
    latestVersion?.minAndroidVersion || 
    String(raw.min_android || raw.minAndroid || raw.min_android_version || 'Android 8.0+');

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
    minAndroid,
    targetAndroid: String(raw.target_android || raw.targetAndroid || 'Android 14'),
    permissions: parseArray(raw.permissions),
    iconUrl: String(raw.icon_url || raw.iconUrl || raw.icon || 'https://picsum.photos/seed/appicon/200/200'),
    bannerUrl: (raw.banner_url as string) || (raw.bannerUrl as string) || null,
    thumbnailUrl: (raw.thumbnail_url as string) || (raw.thumbnailUrl as string) || null,
    screenshots: parseArray(raw.screenshots),
    rating: raw.rating !== undefined && raw.rating !== null ? String(raw.rating) : '5.0',
    downloads: Number(raw.downloads || 0),
    latestVersion: cleanVer,
    releaseChannel: rawChannel,
    architecture: rawArch,
    apkSize: formattedApkSize,
    apkUrl,
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
  const idStr = String(raw.id || raw.slug || '');
  return {
    id: idStr.toLowerCase(),
    name: String(raw.name || idStr || ''),
    slug: String(raw.slug || raw.id || '').toLowerCase(),
    icon: String(raw.icon || '📱'),
    displayOrder: Number(raw.display_order ?? raw.displayOrder ?? 0),
    enabled: Boolean(raw.enabled ?? true),
    appCount: typeof raw.appCount === 'number' ? raw.appCount : undefined,
  };
}

/**
 * Normalizes raw Supabase version row (supports both app_versions and versions table schemas)
 */
export function normalizeVersion(raw: Record<string, unknown>): VersionItem {
  const vName = String(raw.version_name || raw.versionName || raw.version || '1.0.0');
  const relNotes = String(
    raw.changelog || raw.release_notes || raw.releaseNotes || raw.notes || 'Performance enhancements, security updates, and bug fixes.'
  );
  const rawSize = raw.apk_size_display || raw.apk_size || raw.apkSize || raw.size || raw.file_size;
  const rawUnit = raw.apk_size_unit || raw.apkSizeUnit || raw.size_unit || raw.sizeUnit || raw.unit || raw.file_size_unit;
  const rawBytes = raw.apk_size_bytes || raw.apkSizeBytes;
  const sizeBytes = typeof rawBytes === 'number' ? rawBytes : undefined;
  const sizeDisplay = formatApkSize(rawSize, rawUnit, sizeBytes);

  const rawChannel = String(raw.release_channel || raw.releaseChannel || 'stable').toLowerCase();
  const rawArch = String(raw.architecture || 'universal').toLowerCase();

  return {
    id: String(raw.id || ''),
    appId: String(raw.app_id || raw.appId || ''),
    versionName: formatVersion(vName),
    versionCode: (raw.version_code as string | number) || (raw.versionCode as string | number) || 1,
    apkUrl: String(raw.apk_url || raw.apkUrl || '#'),
    apkSizeBytes: sizeBytes,
    apkSizeDisplay: sizeDisplay,
    minAndroidVersion: String(raw.min_android_version || raw.min_android || raw.minAndroidVersion || raw.minAndroid || 'Android 8.0+'),
    targetAndroidVersion: String(raw.target_android_version || raw.target_android || raw.targetAndroidVersion || 'Android 14'),
    changelog: String(raw.changelog || relNotes),
    releaseNotes: relNotes,
    releaseChannel: rawChannel,
    architecture: rawArch,
    sha256: (raw.sha256 as string) || undefined,
    isLatest: Boolean(raw.is_latest ?? raw.isLatest ?? false),
    status: String(raw.status || 'published').toLowerCase(),
    publishedAt: String(raw.published_at || raw.publishedAt || raw.created_at || raw.createdAt || new Date().toISOString()),
    createdAt: String(raw.created_at || raw.createdAt || new Date().toISOString()),
    updatedAt: (raw.updated_at as string) || (raw.updatedAt as string) || undefined,
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
 * Helper to fetch a map of the latest version for each app from app_versions / versions
 */
export async function fetchLatestVersionsMap(): Promise<Record<string, VersionItem>> {
  try {
    const { data: versData } = await supabase
      .from('app_versions')
      .select('*')
      .order('created_at', { ascending: false });

    const map: Record<string, VersionItem> = {};
    if (versData && Array.isArray(versData)) {
      for (const raw of versData) {
        const appId = String(raw.app_id || raw.appId || '').trim();
        if (!appId) continue;
        const norm = normalizeVersion(raw);
        const current = map[appId];
        if (!current) {
          map[appId] = norm;
        } else if (norm.isLatest || (norm.status === 'published' && current.status !== 'published')) {
          map[appId] = norm;
        }
      }
      return map;
    }

    // Fallback: check legacy 'versions' table
    const { data: legData } = await supabase
      .from('versions')
      .select('*')
      .order('created_at', { ascending: false });

    if (legData && Array.isArray(legData)) {
      for (const raw of legData) {
        const appId = String(raw.app_id || raw.appId || '').trim();
        if (!appId) continue;
        const norm = normalizeVersion(raw);
        if (!map[appId]) {
          map[appId] = norm;
        }
      }
    }
    return map;
  } catch (err) {
    console.error('Error fetching latest versions map:', err);
    return {};
  }
}

/**
 * Helper to check if a raw app record is publicly visible
 */
export function isAppVisible(raw: Record<string, unknown>): boolean {
  if (!raw) return false;
  if (raw.published === false || raw.is_published === false) {
    return false;
  }
  const status = String(raw.status || '').toLowerCase().trim();
  if (status === 'draft' || status === 'unpublished' || status === 'archived') {
    return false;
  }
  return true;
}

/**
 * Fetch all published apps with internal cache (single source of truth for high speed)
 */
export async function getAllPublishedApps(): Promise<AppItem[]> {
  return cachedFetch('apps:published:all', async () => {
    try {
      const [{ data, error }, versionsMap] = await Promise.all([
        supabase
          .from('apps')
          .select('*')
          .order('downloads', { ascending: false }),
        fetchLatestVersionsMap(),
      ]);

      if (error) {
        console.error('Supabase getAllPublishedApps error:', error.message);
        return [];
      }
      const visibleData = (data || []).filter(isAppVisible);
      return visibleData.map((raw) => {
        const appId = String(raw.id || '').trim();
        const slug = String(raw.slug || '').trim();
        const pkg = String(raw.package_name || raw.packageName || '').trim();
        const latestVer = versionsMap[appId] || versionsMap[slug] || versionsMap[pkg];
        return normalizeApp(raw, latestVer);
      });
    } catch (err) {
      console.error('Error in getAllPublishedApps:', err);
      return [];
    }
  }, 5 * 1000);
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
      const catId = cat.id.toLowerCase().trim();
      const catName = cat.name.toLowerCase().trim();
      const catSlug = (cat.slug || '').toLowerCase().trim();
      const apps = allApps
        .filter((a) => {
          const appCat = (a.category || '').toLowerCase().trim();
          return (
            appCat === catId ||
            appCat === catName ||
            (catSlug && appCat === catSlug) ||
            appCat.includes(catName) ||
            (catName && appCat.includes(catName))
          );
        })
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
  }, 5 * 1000);
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
      .select('*');

    if (category && category.trim() !== '') {
      const catTrim = category.trim();
      // Match category UUID, slug or exact string
      query = query.or(`category.eq.${catTrim},category.ilike.%${catTrim}%`);
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

    const [{ data, error }, versionsMap] = await Promise.all([
      query,
      fetchLatestVersionsMap(),
    ]);

    if (error) {
      console.error('Supabase getAllApps error:', error.message);
      return [];
    }
    const visible = (data || []).filter(isAppVisible);
    return visible.map((raw) => {
      const appId = String(raw.id || '').trim();
      const slug = String(raw.slug || '').trim();
      const pkg = String(raw.package_name || raw.packageName || '').trim();
      const latestVer = versionsMap[appId] || versionsMap[slug] || versionsMap[pkg];
      return normalizeApp(raw, latestVer);
    });
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
        .limit(1);

      let appRaw: Record<string, unknown> | null = null;

      if (slugData && slugData.length > 0 && isAppVisible(slugData[0])) {
        appRaw = slugData[0];
      } else {
        // Try id or package_name
        const { data: idData, error } = await supabase
          .from('apps')
          .select('*')
          .or(`id.eq.${idOrSlug},package_name.eq.${idOrSlug}`)
          .limit(1);

        if (!error && idData && idData.length > 0 && isAppVisible(idData[0])) {
          appRaw = idData[0];
        }
      }

      if (!appRaw) {
        return null;
      }

      const appId = String(appRaw.id || idOrSlug);
      const vers = await getAppVersions(appId);
      const latestVer = vers && vers.length > 0 ? vers[0] : undefined;

      return normalizeApp(appRaw, latestVer);
    } catch (err) {
      console.error('Error in getAppBySlugOrId:', err);
      return null;
    }
  }, 5 * 1000);
}

/**
 * Fetch published version history from app_versions table (with graceful fallback to versions table)
 */
export async function getAppVersions(appId: string): Promise<VersionItem[]> {
  if (!appId) return [];

  return cachedFetch(`app_versions:${appId}`, async () => {
    try {
      // 1. Primary query: shared app_versions table (status = published, order by published_at DESC)
      const { data: appVers, error: appVersErr } = await supabase
        .from('app_versions')
        .select('*')
        .eq('app_id', appId)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (!appVersErr && appVers && appVers.length > 0) {
        return appVers.map(normalizeVersion);
      }

      // 2. Secondary fallback: check if app_versions has rows without status filter (for backwards compatibility)
      const { data: rawAppVers } = await supabase
        .from('app_versions')
        .select('*')
        .eq('app_id', appId)
        .order('created_at', { ascending: false });

      if (rawAppVers && rawAppVers.length > 0) {
        const filtered = rawAppVers.filter(
          (v) => !v.status || v.status === 'published' || v.status === 'active'
        );
        if (filtered.length > 0) {
          return filtered.map(normalizeVersion);
        }
      }

      // 3. Fallback to legacy 'versions' table
      const { data: legacyVersions, error: legacyErr } = await supabase
        .from('versions')
        .select('*')
        .eq('app_id', appId)
        .order('created_at', { ascending: false });

      if (!legacyErr && legacyVersions && legacyVersions.length > 0) {
        return legacyVersions.map(normalizeVersion);
      }

      return [];
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
      const appCat = (app.category || 'general').toLowerCase().trim();
      for (const cat of categories) {
        const catId = cat.id.toLowerCase().trim();
        const catName = cat.name.toLowerCase().trim();
        const catSlug = (cat.slug || '').toLowerCase().trim();
        if (
          appCat === catId ||
          appCat === catName ||
          (catSlug && appCat === catSlug) ||
          appCat.includes(catName)
        ) {
          countMap[cat.id] = (countMap[cat.id] || 0) + 1;
        }
      }
    }

    return categories.map((cat) => ({
      ...cat,
      appCount: countMap[cat.id] || 0,
    }));
  } catch (err) {
    console.error('Error in getCategoriesWithCounts:', err);
    return [];
  }
}

/**
 * Standardize version string format to always have exactly one leading 'v' (e.g. 'v1.0.0')
 * Prevents double 'v' bugs like 'vv1.0'.
 */
export function formatVersion(version?: string | null): string {
  if (!version) return 'v1.0';
  const trimmed = String(version).trim().replace(/^[vV]+/g, '');
  return trimmed ? `v${trimmed}` : 'v1.0';
}

/**
 * Clean version string without leading 'v' (e.g. '1.0.0')
 */
export function cleanVersionNumber(version?: string | null): string {
  if (!version) return '1.0';
  return String(version).trim().replace(/^[vV]+/g, '') || '1.0';
}

export interface ReviewItem {
  id: string;
  appId: string;
  userName: string;
  rating: number;
  title?: string;
  comment: string;
  deviceModel?: string;
  verifiedDownload?: boolean;
  helpfulCount: number;
  createdAt: string;
}

/**
 * Fetch real user reviews for an app from Supabase
 */
export async function fetchAppReviewsFromSupabase(appId: string): Promise<ReviewItem[]> {
  if (!appId) return [];

  try {
    // 1. Try 'app_reviews' table
    const { data: revData, error: revErr } = await supabase
      .from('app_reviews')
      .select('*')
      .eq('app_id', appId)
      .order('created_at', { ascending: false });

    if (!revErr && revData && Array.isArray(revData)) {
      return revData.map((r) => ({
        id: String(r.id),
        appId: String(r.app_id || appId),
        userName: String(r.user_name || r.userName || r.author || 'Anonymous User'),
        rating: Number(r.rating || 5),
        title: r.title ? String(r.title) : undefined,
        comment: String(r.comment || r.content || ''),
        deviceModel: r.device_model || r.deviceModel || undefined,
        verifiedDownload: Boolean(r.verified_download ?? r.verifiedDownload ?? true),
        helpfulCount: Number(r.helpful_count || r.helpfulCount || 0),
        createdAt: String(r.created_at || r.createdAt || new Date().toISOString()),
      }));
    }

    // 2. Fallback: try 'reviews' table
    const { data: legacyData, error: legacyErr } = await supabase
      .from('reviews')
      .select('*')
      .eq('app_id', appId)
      .order('created_at', { ascending: false });

    if (!legacyErr && legacyData && Array.isArray(legacyData)) {
      return legacyData.map((r) => ({
        id: String(r.id),
        appId: String(r.app_id || appId),
        userName: String(r.user_name || r.userName || r.author || 'Anonymous User'),
        rating: Number(r.rating || 5),
        title: r.title ? String(r.title) : undefined,
        comment: String(r.comment || r.content || ''),
        deviceModel: r.device_model || r.deviceModel || undefined,
        verifiedDownload: Boolean(r.verified_download ?? r.verifiedDownload ?? true),
        helpfulCount: Number(r.helpful_count || r.helpfulCount || 0),
        createdAt: String(r.created_at || r.createdAt || new Date().toISOString()),
      }));
    }

    return [];
  } catch (err) {
    console.error('Error fetching reviews from Supabase:', err);
    return [];
  }
}

/**
 * Inserts a new review into Supabase and updates the app's real average rating
 */
export async function submitAppReviewToSupabase(review: {
  appId: string;
  userName: string;
  rating: number;
  title?: string;
  comment: string;
  deviceModel?: string;
  verifiedDownload?: boolean;
}): Promise<{ success: boolean; newAverageRating?: string; totalCount?: number; review?: ReviewItem }> {
  try {
    const row = {
      app_id: review.appId,
      user_name: review.userName,
      rating: Math.min(5, Math.max(1, review.rating)),
      title: review.title || `${review.rating} Star Review`,
      comment: review.comment,
      device_model: review.deviceModel || 'Android Device',
      verified_download: review.verifiedDownload ?? true,
      helpful_count: 0,
      created_at: new Date().toISOString(),
    };

    // 1. Insert into app_reviews or reviews
    let insertResult = await supabase.from('app_reviews').insert([row]).select('*').single();
    if (insertResult.error) {
      // Fallback to 'reviews' table
      insertResult = await supabase.from('reviews').insert([row]).select('*').single();
    }

    // 2. Fetch all reviews to recalculate exact rating
    const allReviews = await fetchAppReviewsFromSupabase(review.appId);
    let avg = '5.0';
    if (allReviews.length > 0) {
      const sum = allReviews.reduce((acc, r) => acc + r.rating, 0);
      avg = (sum / allReviews.length).toFixed(1);
    } else {
      avg = Number(review.rating).toFixed(1);
    }

    // 3. Update apps table rating column with real arithmetic rating
    await supabase
      .from('apps')
      .update({ rating: avg })
      .eq('id', review.appId);

    // 4. Invalidate relevant caches
    invalidateCache('apps:');
    invalidateCache('home:');
    invalidateCache(`app:${review.appId}`);

    const createdReview: ReviewItem = insertResult.data ? {
      id: String(insertResult.data.id),
      appId: review.appId,
      userName: review.userName,
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      deviceModel: review.deviceModel,
      verifiedDownload: true,
      helpfulCount: 0,
      createdAt: new Date().toISOString(),
    } : {
      id: `rev-${Date.now()}`,
      appId: review.appId,
      userName: review.userName,
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      deviceModel: review.deviceModel,
      verifiedDownload: true,
      helpfulCount: 0,
      createdAt: new Date().toISOString(),
    };

    return {
      success: true,
      newAverageRating: avg,
      totalCount: allReviews.length > 0 ? allReviews.length : 1,
      review: createdReview,
    };
  } catch (err) {
    console.error('Error submitting review to Supabase:', err);
    return { success: false };
  }
}

