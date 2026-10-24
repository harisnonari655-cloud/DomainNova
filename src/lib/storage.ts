import { RecentSearchItem } from '../types/domain';

const STORAGE_KEYS = {
  FAVORITES: 'domainnova_favorites_v1',
  RECENT_SEARCHES: 'domainnova_recent_searches_v1',
  THEME: 'domainnova_theme_v1',
  STORAGE_OPT_OUT: 'domainnova_privacy_local_storage_opt_out'
};

export function isLocalStorageEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (localStorage.getItem(STORAGE_KEYS.STORAGE_OPT_OUT) === 'true') {
      return false;
    }
    const testKey = '__test_ls__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function setStorageOptOut(optOut: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    if (optOut) {
      localStorage.clear();
      localStorage.setItem(STORAGE_KEYS.STORAGE_OPT_OUT, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.STORAGE_OPT_OUT);
    }
  } catch (err) {
    console.error('Failed to set storage preference', err);
  }
}

export function getFavorites(): string[] {
  if (!isLocalStorageEnabled()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(providerId: string): string[] {
  if (!isLocalStorageEnabled()) return [];
  try {
    const current = getFavorites();
    const updated = current.includes(providerId)
      ? current.filter(id => id !== providerId)
      : [...current, providerId];
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function isFavorite(providerId: string): boolean {
  return getFavorites().includes(providerId);
}

export function getRecentSearches(): RecentSearchItem[] {
  if (!isLocalStorageEnabled()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveRecentSearch(query: string, status?: RecentSearchItem['status']): RecentSearchItem[] {
  if (!isLocalStorageEnabled() || !query) return [];
  try {
    const current = getRecentSearches().filter(item => item.query.toLowerCase() !== query.toLowerCase());
    const newItem: RecentSearchItem = {
      id: `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      query: query.trim(),
      timestamp: Date.now(),
      status
    };
    const updated = [newItem, ...current].slice(0, 10);
    localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function clearRecentSearches(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES);
  } catch (err) {
    console.error('Failed to clear recent searches', err);
  }
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => fallbackCopy(text));
  }
  return Promise.resolve(fallbackCopy(text));
}

function fallbackCopy(text: string): boolean {
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  } catch {
    return false;
  }
}
