"use client";
import NextMatch, { Match } from "@/components/NextMatch";
// components
import MainTable from "@/components/MainTable";
import Link from "next/link";
// context
import { useGlobal } from "@/context/GlobalContext";
// styles
import styles from "./Matches.module.scss";

// TODO update when context is added
// TODO Make this DRY (previous matches page)
export default function MatchesPage() {
    const { scheduleArr } = useGlobal();

    // Create an allMatches array by sorting scheduleArr
    const allMatches: Match[] = scheduleArr.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const currentDate = new Date();

    // Filter upcoming matches with a one-hour grace period
    const upcomingMatches = allMatches.filter((match) => {
        const matchDateTime = new Date(`${match.date} ${match.time}`);
        // Adds one hour to allow for actual match times
        matchDateTime.setHours(matchDateTime.getHours() + 1);
        return matchDateTime >= currentDate;
    });

    const nextMatch = upcomingMatches[0];

    return (
        <div className={styles.matchesPage} >
            <h1>Matches </h1>
            < div className={styles.previousMatchesLink} >
                <Link href="/matches/previous" > View Previous Matches </Link>
            </div>
            {nextMatch && <NextMatch matchData={nextMatch} isMatchesPage />}
            <span className={styles.scrollPrompt}>
                Scroll right to see more info
                < i className="fa-solid fa-arrow-right fa-beat-fade" > </i>
            </span>
            < MainTable matches={upcomingMatches} isMatchesPage />
        </div>
    );
}
