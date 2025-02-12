"use client";
import MainTable from "@/components/MainTable";
import { Match } from "@/components/NextMatch";
import Link from "next/link";
import styles from "./PreviousMatches.module.scss";

//* Data contract that will come from Firebase
// TODO add this to context
const scheduleArr: Match[] = [
    {
        date: "2025-01-03",
        opponent: "City SC Elite 12B",
        isHome: false,
        time: "5:00 PM",
        location: "Sporty City",
        score: "L 4-5",
        league: "Indoor",
    },
    {
        date: "2025-01-10",
        opponent: "Blast 12B",
        isHome: false,
        time: "5:00 PM",
        location: "Sport City",
        score: "L 0-4",
        league: "Indoor",
    },
    {
        date: "2025-01-25",
        opponent: "Vipers",
        isHome: true,
        time: "3:40 PM",
        location: "Sport City",
        score: "W 5-1",
        league: "Indoor",
    },
    {
        date: "2025-02-15",
        opponent: "City SC Utah Premier",
        isHome: true,
        time: "5:10 PM",
        location: "Sport City",
        score: "TBD",
        league: "Indoor",
    },
    {
        date: "2025-03-01",
        opponent: "SSFC Thunder",
        isHome: false,
        time: "4:25 PM",
        location: "Sport City",
        score: "TBD",
        league: "Indoor",
    },
    {
        date: "2025-03-15",
        opponent: "Blast 12B",
        isHome: true,
        time: "3:45 PM",
        location: "Sport City",
        score: "TBD",
        league: "Indoor",
    },
    {
        date: "2025-03-21",
        opponent: "Cobras",
        isHome: true,
        time: "4:00 PM",
        location: "Sport City",
        score: "TBD",
        league: "Indoor",
    },
    {
        date: "2025-03-28",
        opponent: "SSFC Thunder",
        isHome: false,
        time: "6:45 PM",
        location: "Sport City",
        score: "TBD",
        league: "Indoor",
    },
    {
        date: "2025-03-28",
        opponent: "Impact FA 12B",
        isHome: true,
        time: "2:00 PM",
        location: "Outdoor Field",
        score: "TBD",
        league: "Outdoor",
    },
    {
        date: "2025-04-04",
        opponent: "City SC UT Elite 12B - JP",
        isHome: false,
        time: "3:00 PM",
        location: "Opponent Stadium",
        score: "TBD",
        league: "Outdoor",
    },
    {
        date: "2025-04-11",
        opponent: "River Mountain FC B12 White",
        isHome: true,
        time: "1:30 PM",
        location: "Outdoor Field",
        score: "TBD",
        league: "Outdoor",
    },
    {
        date: "2025-04-18",
        opponent: "City SC UT Elite 12B - MM",
        isHome: false,
        time: "4:00 PM",
        location: "Opponent Stadium",
        score: "TBD",
        league: "Outdoor",
    },
    {
        date: "2025-04-25",
        opponent: "Utah Glory B12 Red JAX",
        isHome: true,
        time: "2:30 PM",
        location: "Outdoor Field",
        score: "TBD",
        league: "Outdoor",
    },
]

// TODO update when context is added
// TODO Make this DRY (matches page)
const allMatches: Match[] = scheduleArr.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
);

const currentDate = new Date();
// TODO may do this differently with context
const previousMatches = allMatches.filter(
    (match) => new Date(match.date) < currentDate
);

export default function PreviousMatchesPage() {
    return (
        <div className={styles.previousMatchesPage}>
            <h1>Previous Matches</h1>
            {previousMatches.length > 0 ? (
                <MainTable matches={previousMatches} />
            ) : (
                <p>No previous matches available.</p>
            )}
            <Link className={styles.backLink}  href="/matches">
                Back to Matches
            </Link>
        </div>
    );
}
