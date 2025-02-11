"use client";
import NextMatch from "@/components/NextMatch";
import styles from "./Landing.module.scss";

export default function Home() {
    return (
        <div className={styles.landing}>
            <div className={styles.hero}>
                <h1>Welcome to Copper Mountain U13</h1>
                <NextMatch />
            </div>
        </div>
    );
}
