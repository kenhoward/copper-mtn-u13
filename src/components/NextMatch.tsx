"use client";
import Link from "next/link";
import styles from "./NextMatch.module.scss";

export interface Match {
    date: string;
    opponent: string;
    isHome: boolean;
    time: string;
    location: string;
    score: string;
    goalScorers?: string[];
    notes?: string;
    league: "Indoor" | "Outdoor";
}

interface NextMatchProps {
    matchData?: Match;
    isMatchesPage?: boolean;
}

const NextMatch = ({ matchData, isMatchesPage }: NextMatchProps) => {
    if (!matchData) return <p>No upcoming match available.</p>;

    return (
        <div className={styles.nextMatch}>
            <h2>Next Game</h2>
            <div className={styles.nextMatchDetails}>
                <p>
                    <i className="fa-regular fa-calendar"></i><b>Date:</b> {matchData.date}
                </p>
                <p>
                    <i className="fa-solid fa-futbol"></i><b>Opponent:</b>{" "}
                    {matchData.isHome ? `v. ${matchData.opponent}` : `@ ${matchData.opponent}`}
                </p>
                <p>
                    <i className="fa-regular fa-clock"></i><b>Time:</b> {matchData.time}
                </p>
                <p>
                    <i className="fa-solid fa-map-location-dot"></i><b>Location:</b> {matchData.location}
                </p>
                {/* <p>
                    <i className="fa-solid fa-table-cells"></i><b>Score:</b> {matchData.score}
                </p> */}
                <p>
                    <i className="fa-solid fa-cloud-sun"></i><b>League:</b> {matchData.league}
                </p>
            </div>
            {!isMatchesPage && (
                <Link className={styles.moreInfo} href="/matches">
                    See full match details <i className="fa-solid fa-arrow-right fa-beat"></i>
                </Link>
            )}
        </div>
    );
};

export default NextMatch;
