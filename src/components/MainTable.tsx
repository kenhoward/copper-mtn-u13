"use client";
import { Match } from "./NextMatch";
import styles from "./MainTable.module.scss";

interface MainTableProps {
    matches: Match[];
}

const MainTable = ({ matches }: MainTableProps) => {
    return (
        <table className={styles.mainTable}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Opponent</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Score</th>
                    <th>League</th>
                </tr>
            </thead>
            <tbody>
                {matches.map((match, index) => (
                    <tr key={index}>
                        <td>{match.date}</td>
                        <td>{match.isHome ? `v. ${match.opponent}` : `@ ${match.opponent}`}</td>
                        <td>{match.time}</td>
                        <td>{match.location}</td>
                        <td>{match.score}</td>
                        <td>{match.league}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MainTable;
