"use client";
import React, { useContext } from "react";
// context
import { useGlobal } from '../context/GlobalContext';
// styles
import styles from "./SeasonTable.module.scss";

export interface SeasonData {
    team: string;
    record: string;
    games: string[];
    totalPoints: number;
    goalDiff: number;
    goalsAgainst: number;
    goalsFor: number;
    shutOuts: number;
}

export interface SeasonTableProps {
    title: string;
    data: SeasonData[];
}

const SeasonTable: React.FC<SeasonTableProps> = ({ title, data }) => {
    const { isMobile } = useGlobal();

    return (
        <div className={styles.seasonTableContainer}>
            <div className={styles.responsiveTableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>{title}</th>
                            <th>Win-Loss-Tie</th>
                            {!isMobile && (
                                <>
                                    <th>1</th>
                                    <th>2</th>
                                    <th>3</th>
                                    <th>4</th>
                                    <th>5</th>
                                    <th>6</th>
                                    <th>7</th>
                                    <th>8</th>
                                    <th>Total Points</th>
                                    <th>Goal Diff</th>
                                    <th>Goals Against</th>
                                    <th>Goals For</th>
                                    <th>Shut Outs</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                <td>{row.team}</td>
                                <td>{row.record}</td>
                                {!isMobile && (
                                    <>
                                        {row.games.map((g, i) => (
                                            <td key={i}>{g}</td>
                                        ))}
                                        <td>{row.totalPoints}</td>
                                        <td>{row.goalDiff}</td>
                                        <td>{row.goalsAgainst}</td>
                                        <td>{row.goalsFor}</td>
                                        <td>{row.shutOuts}</td>                                    
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SeasonTable;
