"use client";
import MainTable from "@/components/MainTable";
import Link from "next/link";
import { useGlobal } from "@/context/GlobalContext";
import { getMatchEffectiveDate } from "@/utils/dateFormatter";
import type { Match } from "@/types/match";
import styles from "./PreviousMatches.module.scss";

export default function PreviousMatchesPage() {
    const { scheduleArr, scheduleLoading } = useGlobal();

    if (scheduleLoading) {
        return (
            <div className={styles.previousMatchesPage}>
                <h1>Previous Matches</h1>
                <Link className={styles.backLink} href="/matches">Back to Matches</Link>
                <div className={styles.skeletonTable} />
            </div>
        );
    }

    const allMatches: Match[] = [...scheduleArr].sort(
        (a, b) => getMatchEffectiveDate(a).getTime() - getMatchEffectiveDate(b).getTime()
    );

    const currentDate = new Date();
    const previousMatches = allMatches
        .filter((m) => getMatchEffectiveDate(m) < currentDate)
        .reverse();

    return (
        <div className={styles.previousMatchesPage}>
            <h1>Previous Matches</h1>
            <Link className={styles.backLink} href="/matches">Back to Matches</Link>
            {previousMatches.length > 0 ? (
                <MainTable matches={previousMatches} isPreviousMatchesPage />
            ) : (
                <p>No previous matches available.</p>
            )}
        </div>
    );
}
