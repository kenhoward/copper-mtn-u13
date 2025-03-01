"use client";
import SeasonTable, { SeasonData } from "@/components/SeasonTable";
import styles from "./Table.module.scss";

const season2024: SeasonData[] = [
    {
        team: "Copper Mountain 12 WM",
        record: "W-7 L-0 T-1",
        games: ["3", "3", "3", "3", "3", "3", "3", "-"],
        totalPoints: 22,
        goalDiff: 23,
        goalsAgainst: 4,
        goalsFor: 25,
        shutOuts: 5,
    },
    {
        team: "Evanston Express 12B (Ind)",
        record: "W-6 L-1 T-1",
        games: ["3", "3", "3", "3", "3", "-", "-", "-"],
        totalPoints: 19,
        goalDiff: 22,
        goalsAgainst: 3,
        goalsFor: 25,
        shutOuts: 6,
    },
    {
        team: "Summit FC B12 - AN (Metro)",
        record: "W-3 L-4 T-1",
        games: ["3", "1", "0", "3", "-", "-", "-", "-"],
        totalPoints: 10,
        goalDiff: -10,
        goalsAgainst: 27,
        goalsFor: 12,
        shutOuts: 2,
    },
    {
        team: "WJFC U13 NP",
        record: "W-2 L-6 T-0",
        games: ["0", "3", "0", "0", "3", "-", "-", "-"],
        totalPoints: 6,
        goalDiff: -13,
        goalsAgainst: 32,
        goalsFor: 9,
        shutOuts: 1,
    },
    {
        team: "Murray S.C. Orange B12 CG",
        record: "W-0 L-7 T-1",
        games: ["0", "0", "0", "0", "0", "-", "-", "-"],
        totalPoints: 1,
        goalDiff: -22,
        goalsAgainst: 41,
        goalsFor: 7,
        shutOuts: 0,
    },
];

const season2025: SeasonData[] = [
    {
        team: "Impact FA 12B",
        record: "0-0-0",
        games: ["-", "-", "-", "-", "-", "-", "-", "-"],
        totalPoints: 0,
        goalDiff: 0,
        goalsAgainst: 0,
        goalsFor: 0,
        shutOuts: 0,
    },
    {
        team: "City SC UT Elite 12B-JP",
        record: "0-0-0",
        games: ["-", "-", "-", "-", "-", "-", "-", "-"],
        totalPoints: 0,
        goalDiff: 0,
        goalsAgainst: 0,
        goalsFor: 0,
        shutOuts: 0,
    },
    {
        team: "River Mountain FC B12 White",
        record: "0-0-0",
        games: ["-", "-", "-", "-", "-", "-", "-", "-"],
        totalPoints: 0,
        goalDiff: 0,
        goalsAgainst: 0,
        goalsFor: 0,
        shutOuts: 0,
    },
    {
        team: "City SC UT Elite 12B-MM",
        record: "0-0-0",
        games: ["-", "-", "-", "-", "-", "-", "-", "-"],
        totalPoints: 0,
        goalDiff: 0,
        goalsAgainst: 0,
        goalsFor: 0,
        shutOuts: 0,
    },
    {
        team: "Utah Glory B12 Red JAX",
        record: "0-0-0",
        games: ["-", "-", "-", "-", "-", "-", "-", "-"],
        totalPoints: 0,
        goalDiff: 0,
        goalsAgainst: 0,
        goalsFor: 0,
        shutOuts: 0,
    },
    {
        team: "Copper Mountain 12 WM",
        record: "0-0-0",
        games: ["-", "-", "-", "-", "-", "-", "-", "-"],
        totalPoints: 0,
        goalDiff: 0,
        goalsAgainst: 0,
        goalsFor: 0,
        shutOuts: 0,
    },
];

export default function TablePage() {
    return (
        <div className={styles.tablePage}>
            <h1>Season Records</h1>
            <SeasonTable title="Division E (2024)" data={season2024} />
            <SeasonTable title="Division D (2025)" data={season2025} />
        </div>
    );
}
