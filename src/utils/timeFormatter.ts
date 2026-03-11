export function toAmPm(hhmm: string): string {
    const [hStr, mStr] = hhmm.split(":");
    if (!hStr || !mStr) return hhmm;
    let h = Number(hStr);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${mStr} ${ampm}`;
}
