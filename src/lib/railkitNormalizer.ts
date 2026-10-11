import { isRailQuickAvailable } from "@/lib/railquickAvailability";

export interface NormalizedStation {
  code: string;
  name: string;
  platform?: string;
  distanceKm?: number;
  scheduledArrival?: string;
  actualArrival?: string;
  scheduledDeparture?: string;
  actualDeparture?: string;
  delayText?: string;
  delayMinutes?: number;
  state: "completed" | "current" | "upcoming";
  deliveryAvailable: boolean;
}

export interface NormalizedPassenger {
  number: number;
  coach: string;
  seat: string;
  berthType?: string;
  status: string;
  bookingStatus?: string;
  details?: string;
}

export interface NormalizedLiveTelemetry {
  statusNote: string;
  currentStation: string;
  currentStationCode?: string;
  nextStation?: string;
  nextStationCode?: string;
  previousStation?: string;
  previousStationCode?: string;
  statusText: string;
  delay?: number;
  distanceCovered?: number;
  distanceRemaining?: number;
  totalDistance?: number;
  progress?: number; // 0 - 100
  currentSpeed?: string;
  journeyState: "live" | "completed" | "upcoming" | "not_running";
  lastUpdated?: string;
  stations: NormalizedStation[];
}

export interface NormalizedJourneyData {
  pnr?: string;
  train: {
    number: string;
    name: string;
    type?: string;
  };
  journey: {
    date: string;
    source: string;
    sourceCode: string;
    destination: string;
    destinationCode: string;
    boardingPoint?: string;
    boardingPointCode?: string;
    class?: string;
    quota?: string;
    chartStatus?: string;
    fare?: number;
    distance?: number;
  };
  passenger: {
    coach: string;
    seat: string;
    berthType?: string;
    status: string;
    bookingStatus?: string;
    passengersList: NormalizedPassenger[];
  };
  live: NormalizedLiveTelemetry | null;
}

/**
 * Normalizes raw RailKit PNR API response into verified journey data.
 * Zero fabrication: returns null if raw data is missing or invalid.
 */
export function normalizePNRResponse(raw: any, pnr: string): NormalizedJourneyData | null {
  if (!raw) return null;
  const pnrData = raw?.data || raw;
  if (!pnrData || typeof pnrData !== "object") return null;

  // Verify train details
  const trainNumber =
    pnrData?.train?.number ||
    pnrData?.train_number ||
    pnrData?.trainNumber ||
    pnrData?.trainNo ||
    "";

  if (!trainNumber) return null;

  const trainName =
    pnrData?.train?.name ||
    pnrData?.train_name ||
    pnrData?.trainName ||
    `Train ${trainNumber}`;

  // Journey details
  const sourceName =
    pnrData?.journey?.source?.name ||
    pnrData?.journey?.boardingPoint?.name ||
    pnrData?.boarding_station ||
    pnrData?.from_station_name ||
    "Origin";

  const sourceCode =
    pnrData?.journey?.source?.code ||
    pnrData?.journey?.boardingPoint?.code ||
    pnrData?.from_station_code ||
    pnrData?.boarding_station_code ||
    "";

  const destName =
    pnrData?.journey?.destination?.name ||
    pnrData?.reservation_upto ||
    pnrData?.to_station_name ||
    "Destination";

  const destCode =
    pnrData?.journey?.destination?.code ||
    pnrData?.to_station_code ||
    "";

  const journeyDate =
    pnrData?.journey?.dateOfJourney ||
    pnrData?.date_of_journey ||
    pnrData?.doj ||
    "";

  const travelClass = pnrData?.journey?.class || pnrData?.class || pnrData?.travel_class || "";
  const quota = pnrData?.journey?.quota || pnrData?.quota || "";
  const chartStatus = pnrData?.chart?.status || pnrData?.chart_prepared || "";
  const fare = pnrData?.booking?.fare || pnrData?.booking?.ticketFare || undefined;
  const distance = pnrData?.journey?.distance || undefined;

  // Passenger list normalization
  const rawPassengers =
    pnrData?.passengers ||
    pnrData?.passenger_list ||
    pnrData?.passengerDetails ||
    [];

  let passengersList: NormalizedPassenger[] = [];

  const BERTH_MAP: Record<string, string> = {
    LB: "Lower Berth",
    MB: "Middle Berth",
    UB: "Upper Berth",
    SL: "Side Lower",
    SU: "Side Upper",
    WS: "Window Seat",
    SM: "Side Middle",
    CP: "Cabin / Coupe",
  };

  if (Array.isArray(rawPassengers) && rawPassengers.length > 0) {
    passengersList = rawPassengers.map((p: any, idx: number) => {
      const coach =
        p?.current?.coach ||
        p?.booking?.coach ||
        p?.coach ||
        p?.coach_position ||
        "";
      const seat = String(
        p?.current?.berthNo ??
        p?.booking?.berthNo ??
        p?.berth_number ??
        p?.berth ??
        p?.seat ??
        ""
      );
      const rawBerth =
        p?.current?.berthCode ||
        p?.booking?.berthCode ||
        p?.berth_type ||
        p?.berthType ||
        "";
      const berthType = BERTH_MAP[rawBerth.toUpperCase()]
        ? `${BERTH_MAP[rawBerth.toUpperCase()]} (${rawBerth.toUpperCase()})`
        : rawBerth;

      const rawStatus =
        p?.current?.status ||
        p?.booking?.status ||
        p?.current_status ||
        p?.status ||
        "";
      const status = rawStatus === "CNF" ? "CONFIRMED" : rawStatus;

      const details =
        p?.current?.details ||
        p?.booking?.details ||
        "";

      return {
        number: idx + 1,
        coach,
        seat,
        berthType,
        status,
        bookingStatus: p?.booking?.status || "",
        details,
      };
    });
  }

  const primary = passengersList[0] || {
    number: 1,
    coach: "",
    seat: "",
    berthType: "",
    status: "",
    bookingStatus: "",
  };

  return {
    pnr,
    train: {
      number: trainNumber,
      name: trainName,
    },
    journey: {
      date: journeyDate,
      source: sourceName,
      sourceCode,
      destination: destName,
      destinationCode: destCode,
      boardingPoint: pnrData?.journey?.boardingPoint?.name,
      boardingPointCode: pnrData?.journey?.boardingPoint?.code,
      class: travelClass,
      quota,
      chartStatus: typeof chartStatus === "string" ? chartStatus : chartStatus ? "Chart Prepared" : undefined,
      fare,
      distance,
    },
    passenger: {
      coach: primary.coach,
      seat: primary.seat,
      berthType: primary.berthType,
      status: primary.status,
      bookingStatus: primary.bookingStatus,
      passengersList,
    },
    live: null,
  };
}

/**
 * Normalizes raw RailKit Live Train status response.
 * Maps exact timeline, speed, progress, halts without fabricating any field.
 */
export function normalizeLiveTrainResponse(raw: any, trainNumber: string, date?: string): NormalizedJourneyData | null {
  if (!raw) return null;
  const trainData = raw?.data || raw;
  if (!trainData || typeof trainData !== "object") return null;

  const realTrainNo = String(trainData.trainNo || trainData.train_number || trainNumber);
  const realTrainName = String(trainData.trainName || trainData.train_name || `Train ${realTrainNo}`);
  const journeyDate = String(trainData.date || date || "");

  const statusNote = trainData.statusNote || "";
  const lastUpdated = trainData.lastUpdate || "";
  const totalDistance = typeof trainData.totalDistanceKm === "number" ? trainData.totalDistanceKm : undefined;
  const avgSpeed = trainData.averageSpeedKmph ? `${trainData.averageSpeedKmph} km/h` : undefined;

  // Progress metrics from RailKit
  const progressObj = trainData.progress;
  const progressPct = typeof progressObj?.percent === "number"
    ? progressObj.percent
    : typeof progressObj?.percentage === "number"
    ? progressObj.percentage
    : undefined;

  const distanceCovered = typeof progressObj?.currentDistanceKm === "number"
    ? progressObj.currentDistanceKm
    : undefined;

  const distanceRemaining = typeof progressObj?.distanceRemainingKm === "number"
    ? progressObj.distanceRemainingKm
    : undefined;

  const rawJourneyStatus = progressObj?.journeyStatus || "";
  const journeyState: "live" | "completed" | "upcoming" | "not_running" =
    rawJourneyStatus === "completed"
      ? "completed"
      : rawJourneyStatus === "upcoming"
      ? "upcoming"
      : rawJourneyStatus === "not_running"
      ? "not_running"
      : "live";

  // Map timeline
  const rawTimeline = Array.isArray(trainData.timeline)
    ? trainData.timeline
    : Array.isArray(trainData.stations)
    ? trainData.stations
    : [];

  // Filter to stoppages / halts for clean passenger journey, or all timeline if only few
  const stoppageStations = rawTimeline.filter((item: any) => item.type === "stoppage");
  const stationsToUse = stoppageStations.length > 0 ? stoppageStations : rawTimeline;

  const stations: NormalizedStation[] = stationsToUse.map((item: any) => {
    const code = item.stationCode || item.code || "";
    const name = item.stationName || item.name || code;
    const platform = item.platform || undefined;
    const distanceKm = typeof item.distanceKm === "number"
      ? item.distanceKm
      : item.distanceKm
      ? parseInt(item.distanceKm, 10)
      : undefined;

    const scheduledArrival = item.arrival?.scheduled !== "SRC" && item.arrival?.scheduled !== "--"
      ? item.arrival?.scheduled
      : undefined;
    const actualArrival = item.arrival?.actual !== "SRC" && item.arrival?.actual !== "--"
      ? item.arrival?.actual
      : undefined;

    const scheduledDeparture = item.departure?.scheduled !== "DSTN" && item.departure?.scheduled !== "--"
      ? item.departure?.scheduled
      : undefined;
    const actualDeparture = item.departure?.actual !== "DSTN" && item.departure?.actual !== "--"
      ? item.departure?.actual
      : undefined;

    const delayText = item.arrival?.delay || item.departure?.delay || undefined;

    const state: "completed" | "current" | "upcoming" =
      item.status === "passed"
        ? "completed"
        : item.status === "current"
        ? "current"
        : "upcoming";

    return {
      code,
      name,
      platform,
      distanceKm,
      scheduledArrival,
      actualArrival,
      scheduledDeparture,
      actualDeparture,
      delayText,
      state,
      deliveryAvailable: isRailQuickAvailable(realTrainNo, code),
    };
  });

  // Extract source & destination from stations
  const firstStation = stations[0];
  const lastStation = stations[stations.length - 1];

  const sourceName = firstStation?.name || "Origin";
  const sourceCode = firstStation?.code || "";
  const destName = lastStation?.name || "Destination";
  const destCode = lastStation?.code || "";

  // Derive current location headline
  const currentStn = stations.find((s) => s.state === "current");
  const passedStations = stations.filter((s) => s.state === "completed");
  const upcomingStations = stations.filter((s) => s.state === "upcoming");

  const prevStn = passedStations.length > 0 ? passedStations[passedStations.length - 1] : undefined;
  const nextStn = upcomingStations.length > 0 ? upcomingStations[0] : undefined;

  let currentStationTitle = "";
  if (statusNote) {
    currentStationTitle = statusNote;
  } else if (currentStn) {
    currentStationTitle = `At ${currentStn.name} (${currentStn.code})`;
  } else if (nextStn) {
    currentStationTitle = `Approaching ${nextStn.name} (${nextStn.code})`;
  } else if (journeyState === "completed") {
    currentStationTitle = `Journey Completed at ${destName}`;
  } else {
    currentStationTitle = `In Transit on Route`;
  }

  // Derive delay minutes from statusNote or delayText if parseable
  let delayMinutes: number | undefined = undefined;
  if (statusNote) {
    const delayMatch = statusNote.match(/Delay:\s*(\d+):(\d+)|Delay:\s*(\d+)\s*min/i);
    if (delayMatch) {
      if (delayMatch[1] && delayMatch[2]) {
        delayMinutes = parseInt(delayMatch[1], 10) * 60 + parseInt(delayMatch[2], 10);
      } else if (delayMatch[3]) {
        delayMinutes = parseInt(delayMatch[3], 10);
      }
    }
  }

  const statusText =
    delayMinutes !== undefined && delayMinutes > 0
      ? `${delayMinutes} min late`
      : delayMinutes === 0
      ? "Running On Time"
      : statusNote
      ? "Live Status Updated"
      : "Running";

  const liveTelemetry: NormalizedLiveTelemetry = {
    statusNote,
    currentStation: currentStationTitle,
    currentStationCode: trainData.currentStationCode || currentStn?.code,
    nextStation: nextStn?.name,
    nextStationCode: nextStn?.code,
    previousStation: prevStn?.name,
    previousStationCode: prevStn?.code,
    statusText,
    delay: delayMinutes,
    distanceCovered,
    distanceRemaining,
    totalDistance,
    progress: progressPct,
    currentSpeed: avgSpeed,
    journeyState,
    lastUpdated,
    stations,
  };

  return {
    train: {
      number: realTrainNo,
      name: realTrainName,
    },
    journey: {
      date: journeyDate,
      source: sourceName,
      sourceCode,
      destination: destName,
      destinationCode: destCode,
    },
    passenger: {
      coach: "",
      seat: "",
      status: "",
      passengersList: [],
    },
    live: liveTelemetry,
  };
}
