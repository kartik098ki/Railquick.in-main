export interface TrainSuggestion {
  trainNo: string;
  trainName: string;
  route: string;
}

interface CacheEntry {
  trains: TrainSuggestion[];
  timestamp: number;
}

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const STORAGE_PREFIX = "rq_train_search_v1:";

const memoryCache = new Map<string, CacheEntry>();
const inFlightRequests = new Map<string, Promise<TrainSuggestion[]>>();

/**
 * Normalizes a train search query for consistent cache keys and deduplication.
 */
export function normalizeTrainQuery(raw: string): string {
  return raw.trim().replace(/\s+/g, " ").toLowerCase();
}

/**
 * Validates whether a query is complete enough to trigger a live search API request.
 * - Rejects empty strings or very short partial strings.
 * - For purely numeric queries (train numbers), requires all 5 digits so typing
 *   incomplete numbers like "1", "12", "120", "1200" does not fire API calls
 *   until the full train number is written.
 * - For text/name queries, requires at least 3 alphanumeric characters.
 */
export function isValidTrainSearchQuery(raw: string, allowFourDigitOnSubmit = false): boolean {
  const normalized = normalizeTrainQuery(raw);
  if (!normalized) {
    return false;
  }

  // If the user is typing a train number (digits only), wait until full 5 digits are entered
  // (or 4-5 digits when explicitly submitted)
  if (/^\d+$/.test(normalized)) {
    return allowFourDigitOnSubmit
      ? normalized.length >= 4 && normalized.length <= 5
      : normalized.length === 5;
  }

  if (normalized.length < 3) {
    return false;
  }

  // Must contain at least 3 letters/digits for a train name search
  const alphaNumCount = (normalized.match(/[a-z0-9]/g) || []).length;
  return alphaNumCount >= 3;
}

/**
 * Returns cached train suggestions if available and fresh.
 */
export function getCachedTrainSuggestions(rawQuery: string): TrainSuggestion[] | null {
  const key = normalizeTrainQuery(rawQuery);
  if (!key) return null;

  const mem = memoryCache.get(key);
  if (mem && Date.now() - mem.timestamp < CACHE_TTL_MS) {
    return mem.trains;
  }

  if (typeof window !== "undefined") {
    try {
      const rawStored = window.sessionStorage.getItem(STORAGE_PREFIX + key);
      if (rawStored) {
        const parsed = JSON.parse(rawStored) as CacheEntry;
        if (
          parsed &&
          Array.isArray(parsed.trains) &&
          Date.now() - parsed.timestamp < CACHE_TTL_MS
        ) {
          memoryCache.set(key, parsed);
          return parsed.trains;
        }
      }
    } catch {
      // Ignore storage access errors
    }
  }

  return null;
}

/**
 * Stores successful train search results in memory and sessionStorage.
 */
export function setCachedTrainSuggestions(
  rawQuery: string,
  trains: TrainSuggestion[]
): void {
  const key = normalizeTrainQuery(rawQuery);
  if (!key) return;

  const entry: CacheEntry = {
    trains,
    timestamp: Date.now(),
  };

  memoryCache.set(key, entry);

  if (typeof window !== "undefined") {
    try {
      window.sessionStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(entry));
    } catch {
      // Ignore storage quota errors
    }
  }
}

/**
 * Fetches train suggestions with caching, in-flight request deduplication,
 * and AbortSignal support for cancelling stale requests.
 */
export async function searchTrainsOptimized(
  rawQuery: string,
  externalSignal?: AbortSignal,
  allowFourDigitOnSubmit = false
): Promise<TrainSuggestion[]> {
  const key = normalizeTrainQuery(rawQuery);
  if (!isValidTrainSearchQuery(key, allowFourDigitOnSubmit)) {
    return [];
  }

  // 1. Reuse cached result if available
  const cached = getCachedTrainSuggestions(key);
  if (cached !== null) {
    return cached;
  }

  // 2. Reuse in-flight request for identical normalized query
  const existingInFlight = inFlightRequests.get(key);
  if (existingInFlight) {
    return existingInFlight;
  }

  // 3. Perform network request
  const requestPromise = (async (): Promise<TrainSuggestion[]> => {
    try {
      const res = await fetch(
        `/api/railkit/search?query=${encodeURIComponent(key)}`,
        {
          method: "GET",
          signal: externalSignal,
        }
      );

      if (!res.ok) {
        return [];
      }

      const json = await res.json();
      if (json && json.success && Array.isArray(json.trains)) {
        setCachedTrainSuggestions(key, json.trains);
        return json.trains;
      }
      return [];
    } finally {
      inFlightRequests.delete(key);
    }
  })();

  inFlightRequests.set(key, requestPromise);
  return requestPromise;
}
