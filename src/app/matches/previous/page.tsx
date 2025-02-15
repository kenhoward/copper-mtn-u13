"use client";
// components
import MainTable from "@/components/MainTable";
import { Match } from "@/components/NextMatch";
import Link from "next/link";
// context
import { useGlobal } from "@/context/GlobalContext";
// styles
import styles from "./PreviousMatches.module.scss";

export default function PreviousMatchesPage() {
    const { scheduleArr } = useGlobal();

    const allMatches: Match[] = scheduleArr.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const currentDate = new Date();

    // Filter previous matches by combining date and time then adding a one-hour grace period.
    const previousMatches = allMatches.filter((match) => {
        const matchDateTime = new Date(`${match.date} ${match.time}`);
        matchDateTime.setHours(matchDateTime.getHours() + 1);
        return matchDateTime < currentDate;
    });

    // TODO I need to fix the scroll on previous matches on mobile
    return (
        <div className={styles.previousMatchesPage} >
            <h1>Previous Matches </h1>
            < Link className={styles.backLink} href="/matches" >
                Back to Matches
            </Link>
            {
                previousMatches.length > 0 ? (
                    <MainTable matches={previousMatches} isPreviousMatchesPage />
                ) : (
                    <p>No previous matches available.</p>
                )
            }
        </div>
    );
}
