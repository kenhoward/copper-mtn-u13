"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./NextMatch.module.scss";

interface Match {
    date: string;
    location: string;
    opponent: string;
}

const NextMatch = () => {
    const [match, setMatch] = useState<Match | null>(null);

    useEffect(() => {
        const fetchNextMatch = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setMatch({
                date: "Saturday, March 15, 2025, 10:00 AM",
                location: "Copper Mountain Home Field",
                opponent: "Eagles FC U13",
            });
        };
        fetchNextMatch();
    }, []);

    if (!match) return <p className={styles.loading}>Loading next game information...</p>;

    return (
        <div className={styles.nextMatch}>
            <h2>Next Game</h2>
            <p>
                <span>Date:</span> {match.date}
            </p>
            <p>
                <span>Location:</span> {match.location}
            </p>
            <p>
                <span>Opponent:</span> {match.opponent}
            </p>
            <Link className={styles.moreInfo}  href="/matches">
                See full match details
            </Link>
        </div>
    );
};

export default NextMatch;
