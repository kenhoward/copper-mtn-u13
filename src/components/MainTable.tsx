"use client";
import { Match } from "./NextMatch";
import styles from "./MainTable.module.scss";

interface MainTableProps {
    matches: Match[];
    isMatchesPage?: boolean;
    isPreviousMatchesPage?: boolean;
}

// TODO fix previous matches scroll
const MainTable = ({
    matches,
    isMatchesPage,
    isPreviousMatchesPage,
}: MainTableProps) => {
    return (
        <div className={styles.tableWrapper}>
            <div className={styles.tableContainer}>
                <table className={styles.mainTable}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Opponent</th>
                            {!isPreviousMatchesPage && <th>Time</th>}
                            {!isPreviousMatchesPage && <th>Jersey Color</th>}
                            {!isPreviousMatchesPage && <th>Location</th>}
                            {!isMatchesPage && <th>Score</th>}
                            {isPreviousMatchesPage && <th>Goal Scorers</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((match, index) => (
                            <tr key={index}>
                                <td>{new Date(match.date).toLocaleDateString()}</td>
                                <td>
                                    {match.isHome ? `v. ${match.opponent}` : `@ ${match.opponent}`}
                                </td>
                                {!isPreviousMatchesPage && <td>{match.time}</td>}
                                {!isPreviousMatchesPage && <td>{match.isHome ? "Blue" : "White"}</td>}
                                {!isPreviousMatchesPage && <td>{match.location}</td>}
                                {!isMatchesPage && <td>{match.score}</td>}
                                {isPreviousMatchesPage && <td>{match.goalScorers?.join(", ")}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.scrollIndicator} />
        </div>
    );
};

export default MainTable;
