"use client";
// components
import MainTable from "@/components/MainTable";
import { Match } from "@/components/NextMatch";
import Link from "next/link";
// context
import { useGlobal } from "@/context/GlobalContext";
// utils
import { getMatchEffectiveDate } from "@/utils/dateFormatter";
// styles
import styles from "./PreviousMatches.module.scss";

export default function PreviousMatchesPage() {
    const { scheduleArr } = useGlobal();

    const allMatches: Match[] = [...scheduleArr].sort(
        (a, b) => getMatchEffectiveDate(a).getTime() - getMatchEffectiveDate(b).getTime()
    );

    const currentDate = new Date();
    const previousMatches = allMatches.filter((match) => getMatchEffectiveDate(match) < currentDate).reverse();

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
