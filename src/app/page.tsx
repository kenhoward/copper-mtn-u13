"use client";
import NextMatch, { Match } from "@/components/NextMatch";
// context
import { useGlobal } from "@/context/GlobalContext";
// utils
import { getMatchEffectiveDate } from "@/utils/dateFormatter";
// styles
import styles from "./Landing.module.scss";

export default function Home() {
    const { scheduleArr } = useGlobal();

    const allMatches: Match[] = scheduleArr.sort(
        (a, b) => getMatchEffectiveDate(a).getTime() - getMatchEffectiveDate(b).getTime()
    );

    const currentDate = new Date();
    const upcomingMatches = allMatches.filter((match) => getMatchEffectiveDate(match) >= currentDate);
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
