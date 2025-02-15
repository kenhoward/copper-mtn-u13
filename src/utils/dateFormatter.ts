export function parseMatchDateTime(dateStr: string, timeStr: string): Date {
    // dateStr is expected to be in ISO format, e.g., "2025-01-03"
    // timeStr is expected to be in 12-hour format, e.g., "5:00 PM"
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) {
        hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
        hours = 0;
    }
    const date = new Date(dateStr);
    date.setHours(hours, minutes, 0, 0);
    return date;
}

export function getMatchEffectiveDate(match: { date: string; time: string }): Date {
    const dt = parseMatchDateTime(match.date, match.time);
    // Adding in a one-hour grace period (to account for the match time)
    dt.setHours(dt.getHours() + 1);
    return dt;
}
