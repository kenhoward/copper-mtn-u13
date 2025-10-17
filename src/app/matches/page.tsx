"use client";
import NextMatch from "@/components/NextMatch";
import MainTable from "@/components/MainTable";
import MainCard from "@/components/MainCard";
import Link from "next/link";
import { useGlobal } from "@/context/GlobalContext";
import { getMatchEffectiveDate } from "@/utils/dateFormatter";
import type { Match } from "@/types/match";
import styles from "./Matches.module.scss";

export default function MatchesPage() {
    const { scheduleArr, isMobile } = useGlobal();

    const allMatches: Match[] = [...scheduleArr].sort(
        (a, b) => getMatchEffectiveDate(a).getTime() - getMatchEffectiveDate(b).getTime()
    );

    const currentDate = new Date();
    const upcomingMatches = allMatches.filter(
        (match) => getMatchEffectiveDate(match) >= currentDate
    );
    const nextMatch = upcomingMatches[0];

    const tableMatches = nextMatch ? upcomingMatches.slice(1) : upcomingMatches;

    return (
        <div className={styles.matchesPage}>
            <h1>Matches</h1>
            <div className={styles.previousMatchesLink}>
                <Link href="/matches/previous">View Previous Matches</Link>
            </div>
            {nextMatch && <NextMatch matchData={nextMatch} isMatchesPage />}
            {isMobile ? (
                <MainCard matches={tableMatches} />
            ) : (
                <MainTable matches={tableMatches} isMatchesPage />
            )}
        </div>
    );
}
