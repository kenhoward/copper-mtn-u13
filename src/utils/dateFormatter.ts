export function parseMatchDateTime(dateStr: string, timeStr: string): Date {
    // dateStr is in "YYYY-MM-DD" format
    const [year, month, day] = dateStr.split("-").map(Number);
    // timeStr is like "5:10 PM"
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) {
        hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
        hours = 0;
    }
    // Create a date in local time.
    return new Date(year, month - 1, day, hours, minutes, 0, 0);
}

export function getMatchEffectiveDate(match: { date: string; time: string }): Date {
    const dt = parseMatchDateTime(match.date, match.time);
    dt.setHours(dt.getHours() + 1); // add one-hour grace period
    return dt;
}

export function formatDateLocal(dateStr: string): string {
    // dateStr is expected to be in "YYYY-MM-DD" format.
    // Simply rearrange the parts to "MM-DD-YYYY".
    const [year, month, day] = dateStr.split("-");
    return `${month}-${day}-${year}`;
}
