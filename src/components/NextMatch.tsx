"use client";
import Link from "next/link";
import { parseMatchDateTime } from "../utils/dateFormatter";
import type { Match } from "@/types/match";
import styles from "./NextMatch.module.scss";

interface NextMatchProps {
    matchData?: Match;
    isMatchesPage?: boolean;
}

const NextMatch = ({ matchData, isMatchesPage }: NextMatchProps) => {
    if (!matchData) return <p>No upcoming match available.</p>;

    const dateObj = parseMatchDateTime(matchData.date, matchData.time);
    const monthName = dateObj.toLocaleDateString("en-US", { month: "short" });
    const dayNumber = dateObj.getDate();
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });

    return (
        <div className={styles.nextMatch}>
            <h2>Next Game</h2>
            <div className={styles.nextMatchDetails}>
                <p>
                    <i className="fa-regular fa-calendar"></i><b>Date:</b>
                    <span className={styles.dateContainer}>
                        {dayName}, {monthName} {dayNumber}
                    </span>
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
                <p>
                    <i className="fa-solid fa-shirt"></i><b>Jersey:</b> {matchData.isHome ? "Blue" : "White"}
                </p>
                {matchData.notes && (
                    <p>
                        <i className="fa-solid fa-comment fa-bounce"></i><b>Notes</b> {matchData.notes}
                    </p>
                )}
            </div>
            {!isMatchesPage && (
                <Link className={styles.moreInfo} href="/matches">
                    See all match details <i className="fa-solid fa-arrow-right fa-beat"></i>
                </Link>
            )}
        </div>
    );
};

export default NextMatch;
