"use client";
import NextMatch, { Match } from "@/components/NextMatch";
// components
import MainTable from "@/components/MainTable";
import Link from "next/link";
// context
import { useGlobal } from "@/context/GlobalContext";
// utils
import { getMatchEffectiveDate } from "@/utils/dateFormatter";
// styles
import styles from "./Matches.module.scss";

// TODO update when context is added
// TODO Make this DRY (previous matches page)
export default function MatchesPage() {
    const { scheduleArr } = useGlobal();

    const allMatches: Match[] = [...scheduleArr].sort(
        (a, b) => getMatchEffectiveDate(a).getTime() - getMatchEffectiveDate(b).getTime()
    );

    const currentDate = new Date();
    const upcomingMatches = allMatches.filter((match) => getMatchEffectiveDate(match) >= currentDate);
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
