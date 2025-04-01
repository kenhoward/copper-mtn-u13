"use client";
import { Match } from "./NextMatch";
import { parseMatchDateTime } from "../utils/dateFormatter";
import styles from "./MainCard.module.scss";

interface MainCardProps {
    matches: Match[];
}

const MainCard = ({ matches }: MainCardProps) => {
    return (
        <div className={styles.cardList}>
            {matches.map((match, index) => (
                <Card key={index} match={match} />
            ))}
        </div>
    );
};

interface CardProps {
    match: Match;
}

const Card = ({ match }: CardProps) => {
    const dateObj = parseMatchDateTime(match.date, match.time);
    const monthName = dateObj.toLocaleDateString("en-US", { month: "short" });
    const dayNumber = dateObj.getDate();
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });
    const blueJersey = "#0984e3";
    const whiteJersey = "#f5f6fa";

    return (
        <div className={styles.matchCard}>
            <div className={styles.cardContent}>
                <div className={styles.cardDate}>
                    <div className={styles.monthName}>{monthName}</div>
                    <div className={styles.dayNumber}>{dayNumber}</div>
                    <div className={styles.dayName}>{dayName}</div>
                </div>

                <div className={styles.cardInfo}>
                    <div className={styles.time}>
                        <i className="fa-regular fa-clock"></i> {match.time}
                    </div>
                    <div className={styles.opponent}>
                        <i className="fa-solid fa-futbol"></i>{" "}
                        {match.isHome ? `v. ${match.opponent}` : `@ ${match.opponent}`}
                    </div>
                    <div className={styles.location}>
                        <i className="fa-solid fa-map-location-dot"></i> {match.location}
                    </div>
                </div>

                <div className={styles.cardJersey}>
                    <div className={styles.jerseyColor}>
                        {match.isHome ? "BLUE" : "WHITE"}
                    </div>
                    <i
                        className="fa-solid fa-shirt"
                        style={
                            match.isHome
                                ? { color: blueJersey, backgroundColor: "#c7ecee" }
                                : { color: whiteJersey, backgroundColor: "#95a5a6" }
                        }
                    ></i>
                </div>
            </div>
        </div>
    );
};

export default MainCard;
