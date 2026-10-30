import { createHash, createHmac, randomBytes } from "node:crypto";
import { configure as configureRailkitSDK } from "railkit";

const BASE_URL = "https://api.railkit.in";
const SDK_VERSION = "1";
const DEFAULT_SDK_SIGNING_SECRET =
  "97c56e08b27b161124f88acd4f24d1bd50f48075f11dc23b9ea6c0bc9b2f8794";

export const PRIMARY_RAILKIT_KEY =
  process.env.RAILKIT_API_KEY ||
  "irctc_d8167cf94d92d3a5a83a5a2139f9873823e215257d8dc722";

export const RAILKIT_API_KEYS = Array.from(
  new Set(
    [
      process.env.RAILKIT_API_KEY,
      "irctc_d8167cf94d92d3a5a83a5a2139f9873823e215257d8dc722",
      "irctc_20451835ee7fa9026d90f263d327df7aa7e866c0cd585aee",
      "irctc_d2736176c9ea10f80fb61dc03c41522e7553930a39941cdb",
    ].filter(Boolean) as string[]
  )
);

try {
  configureRailkitSDK(PRIMARY_RAILKIT_KEY);
} catch (e) {
  console.warn("Railkit SDK configure warning:", e);
}

// Automatically tracks offset between local machine clock and real upstream server clock
let serverClockOffsetMs = 0;
let hasSyncedClock = false;

export function getServerNowMs(): number {
  return Date.now() + serverClockOffsetMs;
}

export function getServerDate(): Date {
  return new Date(getServerNowMs());
}

/**
 * Formats relative ("today", "yesterday", "tomorrow") or explicit dates into DD-MM-YYYY
 * using the real server IST clock so local machine date skew never breaks live tracking.
 */
export function formatDateForRailKit(rawDate?: string, baseNow?: Date): string {
  // Convert UTC epoch to IST (+05:30)
  const ref = baseNow || getServerDate();
  const istTime = new Date(ref.getTime() + (330 + ref.getTimezoneOffset()) * 60000);

  const fmt = (d: Date) =>
    `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;

  if (!rawDate || rawDate === "today") {
    return fmt(istTime);
  }
  if (rawDate === "yesterday") {
    return fmt(new Date(istTime.getTime() - 86400000));
  }
  if (rawDate === "tomorrow") {
    return fmt(new Date(istTime.getTime() + 86400000));
  }

  if (/^\d{2}-\d{2}-\d{4}$/.test(rawDate)) {
    return rawDate;
  }
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(rawDate)) {
    const [d, m, y] = rawDate.split("/");
    return `${d}-${m}-${y}`;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
    const [y, m, d] = rawDate.split("-");
    return `${d}-${m}-${y}`;
  }

  const MONTHS: Record<string, string> = {
    jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
    jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12",
  };
  const matchDMMMY = rawDate.match(/^(\d{1,2})[-/ ]([a-zA-Z]{3})[-/ ](\d{4})/);
  if (matchDMMMY) {
    const d = matchDMMMY[1].padStart(2, "0");
    const m = MONTHS[matchDMMMY[2].toLowerCase()] || "01";
    const y = matchDMMMY[3];
    return `${d}-${m}-${y}`;
  }

  const parsed = new Date(rawDate);
  if (!isNaN(parsed.getTime())) {
    return fmt(parsed);
  }

  return rawDate;
}

function buildSdkSecurityHeaders(
  method: string,
  path: string,
  apiKey: string,
  payload = "",
  timestampMs = getServerNowMs()
) {
  const timestamp = String(timestampMs);
  const nonce = randomBytes(32).toString("hex");
  const payloadHash = createHash("sha256").update(payload).digest("hex");
  const canonical = [
    method.toUpperCase(),
    path,
    timestamp,
    nonce,
    payloadHash,
    apiKey.trim(),
  ].join("\n");

  const signature = createHmac("sha256", DEFAULT_SDK_SIGNING_SECRET)
    .update(canonical)
    .digest("hex");

  return {
    "x-irctc-sdk-ts": timestamp,
    "x-irctc-sdk-nonce": nonce,
    "x-irctc-sdk-payload-sha256": payloadHash,
    "x-irctc-sdk-signature": signature,
    "x-irctc-sdk-version": SDK_VERSION,
  };
}

function updateClockOffsetFromHeader(dateHeader: string | null): boolean {
  if (!dateHeader) return false;
  const srvMs = new Date(dateHeader).getTime();
  if (isNaN(srvMs)) return false;
  const newOffset = srvMs - Date.now();
  const changedSignificantly = Math.abs(newOffset - serverClockOffsetMs) > 45_000;
  serverClockOffsetMs = newOffset;
  hasSyncedClock = true;
  return changedSignificantly;
}

/**
 * Performs a signed GET request to https://api.railkit.in{path} using the official
 * RailKit v6 SDK HMAC-SHA256 headers, rotating across available API keys and
 * automatically correcting for any local machine clock offset.
 */
export async function railkitSignedGet(
  path: string,
  timeoutMs = 6500
): Promise<any | null> {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  for (const apiKey of RAILKIT_API_KEYS) {
    try {
      const securityHeaders = buildSdkSecurityHeaders("GET", cleanPath, apiKey);
      const res = await fetch(`${BASE_URL}${cleanPath}`, {
        method: "GET",
        headers: {
          "x-api-key": apiKey.trim(),
          Accept: "application/json",
          ...securityHeaders,
        },
        signal: AbortSignal.timeout(timeoutMs),
        cache: "no-store",
      });

      const clockShifted = updateClockOffsetFromHeader(res.headers.get("date"));
      const json = await res.json().catch(() => null);

      if (res.ok && json && json.success !== false) {
        return json;
      }

      // If the first request failed due to local clock skew (e.g. machine date set to future/past),
      // immediately retry once with the synced server timestamp!
      if (clockShifted || (!res.ok && res.headers.get("date"))) {
        const retryHeaders = buildSdkSecurityHeaders("GET", cleanPath, apiKey, "", getServerNowMs());
        const retryRes = await fetch(`${BASE_URL}${cleanPath}`, {
          method: "GET",
          headers: {
            "x-api-key": apiKey.trim(),
            Accept: "application/json",
            ...retryHeaders,
          },
          signal: AbortSignal.timeout(timeoutMs),
          cache: "no-store",
        });
        const retryJson = await retryRes.json().catch(() => null);
        if (retryRes.ok && retryJson && retryJson.success !== false) {
          return retryJson;
        }
      }
    } catch {
      // Try next key
    }
  }

  return null;
}

export function isClockSynced(): boolean {
  return hasSyncedClock;
}
