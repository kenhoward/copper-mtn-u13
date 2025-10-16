"use client";
import { Match } from "./NextMatch";
import { getMatchEffectiveDate } from '@/utils/dateFormatter';
import styles from "./MainTable.module.scss";

interface MainTableProps {
    matches: Match[];
    isMatchesPage?: boolean;
    isPreviousMatchesPage?: boolean;
}

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
                            {!isPreviousMatchesPage && <th>Notes</th>}
                            {!isMatchesPage && <th>Score</th>}
                            {isPreviousMatchesPage && <th>Goal Scorers</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((match, index) => {
                            const dateObj = getMatchEffectiveDate(match);
                            const monthName = dateObj.toLocaleDateString("en-US", {
                            month: "short",
                            });
                            const dayNumber = dateObj.getDate();
                            const dayName = dateObj.toLocaleDateString("en-US", {
                            weekday: "short",
                            });
                            return (
                            <tr key={index}>
                                <td>
                                <div className={styles.dateContainer}>
                                    <div className={styles.dayName}>{dayName},</div>
                                    <div className={styles.monthName}>{monthName}</div>
                                    <div className={styles.dayNumber}>{dayNumber}</div>
                                </div>
                                </td>
                                <td>
                                {match.isHome
                                    ? `v. ${match.opponent}`
                                    : `@ ${match.opponent}`}
                                </td>
                                {!isPreviousMatchesPage && <td>{match.time}</td>}
                                {!isPreviousMatchesPage && (
                                <td>{match.isHome ? "Blue" : "White"}</td>
                                )}
                                {!isPreviousMatchesPage && <td>{match.location}</td>}
                                {!isPreviousMatchesPage && <td>{match.notes}</td>}
                                {!isMatchesPage && <td>{match.score}</td>}
                                {isPreviousMatchesPage && (
                                <td>{match.goalScorers?.join(" | ")}</td>
                                )}
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MainTable;
