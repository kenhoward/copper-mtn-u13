"use client";
import SeasonTable, { SeasonData } from "@/components/SeasonTable";
import styles from "./Table.module.scss";

const season2024: SeasonData[] = [
    {
        team: "Copper Mountain 12 WM",
        record: "W-7 L-0 T-1",
        games: ["1", "3", "3", "3", "3", "3", "3", "3"],
        totalPoints: 22,
        goalDiff: 23,
        goalsAgainst: 4,
        goalsFor: 25,
        shutOuts: 5,
    },
    {
        team: "Evanston Express 12B (Ind)",
        record: "W-6 L-1 T-1",
        games: ["1", "3", "3", "3", "3", "3", "3", "0"],
        totalPoints: 19,
        goalDiff: 22,
        goalsAgainst: 3,
        goalsFor: 25,
        shutOuts: 6,
    },
    {
        team: "Summit FC B12 - AN (Metro)",
        record: "W-3 L-4 T-1",
        games: ["3", "1", "0", "3", "0", "3", "0", "0"],
        totalPoints: 10,
        goalDiff: -10,
        goalsAgainst: 27,
        goalsFor: 12,
        shutOuts: 0,
    },
    {
        team: "WJFC U13 NP",
        record: "W-2 L-6 T-0",
        games: ["0", "0", "0", "3", "0", "0", "0", "3"],
        totalPoints: 6,
        goalDiff: -13,
        goalsAgainst: 32,
        goalsFor: 9,
        shutOuts: 1,
    },
    {
        team: "Murray S.C. Orange B12 CG",
        record: "W-0 L-7 T-1",
        games: ["1", "0", "0", "0", "0", "0", "0", "0"],
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
        record: "1-0-0",
        games: ["-", "3", "-", "-", "-", "-", "-", "-"],
        totalPoints: 0,
        goalDiff: 0,
        goalsAgainst: 0,
        goalsFor: 0,
        shutOuts: 0,
    },
    {
        team: "City SC UT Elite 12B-JP",
        record: "0-1-1",
        games: ["1", "0", "-", "-", "-", "-", "-", "-"],
        totalPoints: 1,
        goalDiff: -4,
        goalsAgainst: 7,
        goalsFor: 3,
        shutOuts: 0,
    },
    {
        team: "River Mountain FC B12 White",
        record: "1-0-0",
        games: ["-", "3", "-", "-", "-", "-", "-", "-"],
        totalPoints: 3,
        goalDiff: 4,
        goalsAgainst: 1,
        goalsFor: 4,
        shutOuts: 0,
    },
    {
        team: "City SC UT Elite 12B-MM",
        record: "0-1-1",
        games: ["1", "0", "-", "-", "-", "-", "-", "-"],
        totalPoints: 1,
        goalDiff: -1,
        goalsAgainst: 4,
        goalsFor: 3,
        shutOuts: 0,
    },
    {
        team: "Utah Glory B12 Red JAX",
        record: "0-0-1",
        games: ["-", "0", "-", "-", "-", "-", "-", "-"],
        totalPoints: 0,
        goalDiff: -1,
        goalsAgainst: 5,
        goalsFor: 4,
        shutOuts: 0,
    },
    {
        team: "Copper Mountain 12 WM",
        record: "2-1-0",
        games: ["3", "3", "0", "-", "-", "-", "-", "-"],
        totalPoints: 6,
        goalDiff: 2,
        goalsAgainst: 5,
        goalsFor: 6,
        shutOuts: 0,
    },
];

const sortTeamsByPoints = (seasonData: SeasonData[]): SeasonData[] => {
    return seasonData.sort((a, b) => b.totalPoints - a.totalPoints);
};

export default function TablePage() {
    return (
        <div className={styles.tablePage}>
            <h1>Season Records</h1>
            <SeasonTable title="Division E (2024)" data={sortTeamsByPoints(season2024)} />
            <SeasonTable title="Division D (2025)" data={sortTeamsByPoints(season2025)} />
        </div>
    );
}
