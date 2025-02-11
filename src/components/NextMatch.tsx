"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./NextMatch.module.scss";

interface Match {
    date: string;
    location: string;
    homeOrAway: string
    opponent: string;
}

const NextMatch = () => {
    const [match, setMatch] = useState<Match | null>(null);

    useEffect(() => {
        // ! temporary until I get matches all figured out
        const fetchNextMatch = async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setMatch({
                date: "Saturday, March 15, 2025, 10:00 AM",
                location: "Copper Mountain Home Field",
                homeOrAway: "Blue",
                opponent: "Impact FC 12B",
            });
        };
        fetchNextMatch();
    }, []);

    
    if (!match) return <p className={styles.loading}>Loading next game information...</p>;

    return (
        <div className={styles.mainContent}>
            <div className={styles.nextMatch}>
                <h2>Next Game</h2>
                <p>
                    <span><i className="fa-regular fa-calendar"></i></span> {match.date}
                </p>
                <p>
                    <span><i className="fa-solid fa-map-location-dot"></i></span> {match.location}
                </p>
                <p>
                    <span><i className="fa-solid fa-futbol"></i></span> v. {match.opponent}
                </p>
                <p>
                    <span><i className="fa-solid fa-shirt"></i></span> Wear {match.homeOrAway}
                </p>
                <Link className={styles.moreInfo} href="/matches">
                    See full match details <i className="fa-solid fa-arrow-right fa-beat"></i>
                </Link>
            </div>
        </div>
    );
};

export default NextMatch;
