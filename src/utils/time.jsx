// utils/time.ts
import { zonedTimeToUtc, formatInTimeZone } from "date-fns-tz";

const IST = "Asia/Kolkata";

/** Convert a slot stored in IST to a label in a target TZ */
export function slotToLabelInTZ(
  dateYYYYMMDD, // e.g., "2025-08-17"
  start, // e.g., "14:30:00"
  end, // e.g., "15:00:00"
  targetTz, // e.g., "America/New_York"
  withDate = true,
) {
  const startUtc = zonedTimeToUtc(`${dateYYYYMMDD} ${start}`, IST);
  const endUtc = zonedTimeToUtc(`${dateYYYYMMDD} ${end}`, IST);

  const startFmt = withDate ? "dd MMM yyyy, hh:mm a" : "hh:mm a";
  const endFmt = "hh:mm a zzz";

  const s = formatInTimeZone(startUtc, targetTz, startFmt);
  const e = formatInTimeZone(endUtc, targetTz, endFmt);
  return `${s} – ${e}`;
}

// [
//     {
//         "label": "August 2025",
//         "value": "2025-08",
//         "year": 2025,
//         "monthNum": 8
//     },
//     {
//         "label": "September 2025",
//         "value": "2025-09",
//         "year": 2025,
//         "monthNum": 9
//     },
//     {
//         "label": "October 2025",
//         "value": "2025-10",
//         "year": 2025,
//         "monthNum": 10
//     }
// ]
