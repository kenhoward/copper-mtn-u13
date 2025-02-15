"use client";
import NextMatch, { Match } from "@/components/NextMatch";
import { useGlobal } from "@/context/GlobalContext";
import styles from "./Landing.module.scss";

export default function Home() {
    const { scheduleArr } = useGlobal();

    // Create an allMatches array by sorting scheduleArr
    const allMatches: Match[] = scheduleArr.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const currentDate = new Date();

    // Filter upcoming matches with a one-hour grace period
    const upcomingMatches = allMatches.filter((match) => {
        // Combine date and time (e.g., "02-15-2025 5:10 PM")
        const matchDateTime = new Date(`${match.date} ${match.time}`);
        // Add one hour so that a match is considered past one hour after its scheduled start
        matchDateTime.setHours(matchDateTime.getHours() + 1);
        return matchDateTime >= currentDate;
    });

    const nextMatch = upcomingMatches[0];

    return (
        <div className={styles.landing}>
            <div className={styles.hero}>
                <h1>Welcome to Copper Mountain U13</h1>
                {nextMatch ? (
                    <NextMatch matchData={nextMatch} />
                ) : (
                    <p>No upcoming match available.</p>
                )}
            </div>
        </div>
    );
}
