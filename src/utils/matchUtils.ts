import type { Match } from "@/types/match";
import { getMatchEffectiveDate } from "@/utils/dateFormatter";

/**
 * Returns the next `count` upcoming matches (earliest first) relative to `now`.
 * Does a single pass without sorting the entire list.
 */
export function getNextUpcomingMatches(
  matches: Match[],
  count: number = 2,
  now: Date = new Date()
): Match[] {
  const nowTime = now.getTime();
  const best: Array<{ match: Match; time: number }> = [];

  for (const match of matches) {
    const time = getMatchEffectiveDate(match).getTime();
    if (time < nowTime) continue;

    let inserted = false;
    for (let i = 0; i < best.length; i++) {
      if (time < best[i].time) {
        best.splice(i, 0, { match, time });
        inserted = true;
        break;
      }
    }
    if (!inserted) best.push({ match, time });

    if (best.length > count) best.length = count;
  }

  return best.map((x) => x.match);
}
