/**
 * RailQuick Delivery Availability Configuration & Helper
 * Centralized logic to verify if RailQuick on-seat delivery is active.
 */

// Supported trains configuration (easy to expand)
export const SUPPORTED_DELIVERY_TRAINS = new Set<string>([
  // Example initial delivery trains can be added here
  // e.g., "12004", "12952"
]);

// Supported stations configuration
export const SUPPORTED_DELIVERY_STATIONS = new Set<string>([
  // e.g., "NDLS", "CNB", "LKO"
]);

/**
 * Checks if RailQuick on-seat delivery is available for a train and optional station.
 * Returns false unless explicitly configured in supported sets.
 */
export function isRailQuickAvailable(trainNumber?: string, stationCode?: string): boolean {
  if (!trainNumber) return false;
  const cleanTrain = trainNumber.trim().replace(/\D/g, "");

  if (SUPPORTED_DELIVERY_TRAINS.has(cleanTrain)) {
    return true;
  }

  if (stationCode && SUPPORTED_DELIVERY_STATIONS.has(stationCode.toUpperCase().trim())) {
    return true;
  }

  return false;
}

export function getSupportedTrains(): string[] {
  return Array.from(SUPPORTED_DELIVERY_TRAINS);
}

export function getSupportedStations(): string[] {
  return Array.from(SUPPORTED_DELIVERY_STATIONS);
}
