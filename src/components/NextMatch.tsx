// src/components/NextMatch.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./NextMatch.module.scss";

export interface Match {
    date: string;
    opponent: string;
    isHome: boolean;
    time: string;
    location: string;
    score: string;
    league: "Indoor" | "Outdoor";
    notes?: string;
}

interface NextMatchProps {
    matchData?: Match;
}

const NextMatch = ({ matchData }: NextMatchProps) => {
    const [match, setMatch] = useState<Match | null>(matchData || null);

    useEffect(() => {
        // Only fetch if no match data is passed in.
        if (!matchData) {
            const fetchNextMatch = async () => {
                // TODO Remove this once context has been added
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setMatch({
                    date: "2025-03-15",
                    opponent: "Blast 12B",
                    isHome: true,
                    time: "3:45 PM",
                    location: "Sport City",
                    score: "TBD",
                    league: "Indoor",
                });
            };
            fetchNextMatch();
        }
    }, [matchData]);

    if (!match) return <p>Loading next game information...</p>;

    return (
        <div className={styles.nextMatch}>
            <h2>Next Game</h2>
            <p>
                <i className="fa-regular fa-calendar"></i><b>Date:</b> {match.date}
            </p>
            <p>
                <i className="fa-solid fa-futbol"></i><b>Opponent:</b>{" "}
                {match.isHome ? `v. ${match.opponent}` : `@ ${match.opponent}`}
            </p>
            <p>
                <i className="fa-regular fa-clock"></i><b>Time:</b> {match.time}
            </p>
            <p>
                <i className="fa-solid fa-map-location-dot"></i><b>Location:</b> {match.location}
            </p>
            <p>
                <i className="fa-solid fa-table-cells"></i><b>Score:</b> {match.score}
            </p>
            <p>
                <i className="fa-solid fa-cloud-sun"></i><b>League:</b> {match.league}
            </p>
            <Link className={styles.moreInfo} href="/matches">
                See full match details <i className="fa-solid fa-arrow-right fa-beat"></i>
            </Link>
        </div>
    );
};

export default NextMatch;
