"use client";

import { useMemo } from "react";
import NextMatch from "@/components/NextMatch";
import { useGlobal } from "@/context/GlobalContext";
import { useAuth } from "@/context/AuthContext";
import { getNextUpcomingMatches } from "@/utils/matchUtils";
import styles from "./Landing.module.scss";

export default function Home() {
    const { scheduleArr, scheduleLoading } = useGlobal();
    const { currentUser } = useAuth();

    const nextMatches = useMemo(() => getNextUpcomingMatches(scheduleArr, 2), [scheduleArr]);
    const nextMatch = nextMatches[0];

    let heroContent: React.ReactNode;

    if (scheduleLoading) {
        heroContent = (
            <div className={styles.statusCard} role="status" aria-live="polite">
                <div className={styles.spinner} aria-hidden="true" />
                <p className={styles.statusText}>Loading match…</p>
            </div>
        );
    } else if (nextMatch) {
        heroContent = <NextMatch matchData={nextMatch} />;
    } else {
        heroContent = (
            <div className={styles.statusCard} role="status" aria-live="polite">
                <p className={styles.statusText}>No upcoming match available.</p>
            </div>
        );
    }

    return (
        <div className={styles.landing}>
            <div className={styles.hero}>
                <h1>Welcome to Copper Mountain U13</h1>
                {heroContent}
            </div>
        </div>
    );
}
