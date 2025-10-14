"use client";
import React, { useMemo, useState, useEffect } from "react";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import styles from "@/app/admin/Admin.module.scss";

type League = "Indoor" | "Outdoor";
type Outcome = "W" | "L" | "T";

function toAmPm(hhmm: string): string {
    const [hStr, mStr] = hhmm.split(":");
    if (!hStr || !mStr) return hhmm;
    let h = parseInt(hStr, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${mStr} ${ampm}`;
}

export default function AddMatchForm() {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [opponent, setOpponent] = useState("");
    const [isHome, setIsHome] = useState(true);
    const [location, setLocation] = useState("");
    const [league, setLeague] = useState<League>("Indoor");

    // structured scoring
    const [ourScore, setOurScore] = useState<string>("");
    const [opponentScore, setOpponentScore] = useState<string>("");

    const [notes, setNotes] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // auto-dismiss success
    useEffect(() => {
        if (!success) return;
        const t = setTimeout(() => setSuccess(null), 3000);
        return () => clearTimeout(t);
    }, [success]);

    // Past vs future
    const isPast = useMemo(() => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const d = new Date(date + "T00:00:00");
        return d.getTime() < today.getTime();
    }, [date]);

    // Basic required fields
    const baseOk =
        /^\d{4}-\d{2}-\d{2}$/.test(date) &&
        opponent.trim().length > 0 &&
        location.trim().length > 0 &&
        time.trim().length > 0 &&
        (league === "Indoor" || league === "Outdoor");

    // Score validation only if past
    const scoresOk = useMemo(() => {
        if (!isPast) return true;
        if (ourScore.trim() === "" || opponentScore.trim() === "") return false;
        const a = Number(ourScore);
        const b = Number(opponentScore);
        return Number.isInteger(a) && Number.isInteger(b) && a >= 0 && b >= 0;
    }, [isPast, ourScore, opponentScore]);

    const requiredOk = baseOk && scoresOk;

    // derive outcome + legacy score string (for compatibility)
    const derived = useMemo(() => {
        if (!isPast) {
            return { outcome: null as Outcome | null, scoreString: "TBD" };
        }
        const a = Number(ourScore);
        const b = Number(opponentScore);
        if (!Number.isFinite(a) || !Number.isFinite(b)) {
            return { outcome: null as Outcome | null, scoreString: "" };
        }
        const outcome: Outcome = a > b ? "W" : a < b ? "L" : "T";
        return { outcome, scoreString: `${outcome} ${a}-${b}` };
    }, [isPast, ourScore, opponentScore]);

    const resetForm = () => {
        setDate("");
        setTime("");
        setOpponent("");
        setIsHome(true);
        setLocation("");
        setLeague("Indoor");
        setOurScore("");
        setOpponentScore("");
        setNotes("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!requiredOk) {
            setError("Please fill all required fields.");
            return;
        }

        // coerce scores for payload
        const a = isPast ? Number(ourScore) : null;
        const b = isPast ? Number(opponentScore) : null;

        const payload: any = {
            date: date.trim(),
            opponent: opponent.trim(),
            isHome,
            time: toAmPm(time.trim()),
            location: location.trim(),
            league,
            ourScore: a,
            opponentScore: b,
            outcome: derived.outcome,
            score: derived.scoreString,
            notes: notes.trim() || null,
            _createdAt: serverTimestamp(),
        };

        try {
            setSubmitting(true);
            await addDoc(collection(db, "schedule"), payload);
            setSuccess("Match added to schedule!");
            resetForm();
        } catch (err: any) {
            console.error("Error adding match:", err?.code, err?.message);
            setError(
                err?.code === "permission-denied"
                    ? "Permission denied. Check Firestore rules or your login state."
                    : `Could not save the match. (${err?.code || "unknown"})`
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className={styles.cardForm} onSubmit={handleSubmit}>
            <h2 className={styles.sectionTitle}>Add a Match</h2>

            <div className={styles.twoCol}>
                <label className={styles.label}>
                    <span>Date*</span>
                    <input
                        type="date"
                        className={styles.input}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </label>

                <label className={styles.label}>
                    <span>Time*</span>
                    <input
                        type="time"
                        className={styles.input}
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        step={300}
                        required
                    />
                </label>
            </div>

            <div className={styles.twoCol}>
                <label className={styles.label}>
                    <span>Opponent*</span>
                    <input
                        type="text"
                        className={styles.input}
                        value={opponent}
                        onChange={(e) => setOpponent(e.target.value)}
                        required
                    />
                </label>

                <label className={styles.label}>
                    <span>Location*</span>
                    <input
                        type="text"
                        className={styles.input}
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </label>
            </div>

            <div className={styles.twoCol}>
                <label className={styles.label}>
                    <span>Home / Away*</span>
                    <select
                        className={styles.input}
                        value={isHome ? "home" : "away"}
                        onChange={(e) => setIsHome(e.target.value === "home")}
                    >
                        <option value="home">Home</option>
                        <option value="away">Away</option>
                    </select>
                </label>

                <label className={styles.label}>
                    <span>League*</span>
                    <select
                        className={styles.input}
                        value={league}
                        onChange={(e) => setLeague(e.target.value as League)}
                    >
                        <option value="Indoor">Indoor</option>
                        <option value="Outdoor">Outdoor</option>
                    </select>
                </label>
            </div>

            {/* Scores only if date is in the past */}
            {isPast ? (
                <div className={styles.twoCol}>
                    <label className={styles.label}>
                        <span>Our Score*</span>
                        <input
                            type="number"
                            inputMode="numeric"
                            className={styles.input}
                            min={0}
                            step={1}
                            value={ourScore}
                            onChange={(e) => setOurScore(e.target.value)}
                            required
                        />
                    </label>

                    <label className={styles.label}>
                        <span>Opponent Score*</span>
                        <input
                            type="number"
                            inputMode="numeric"
                            className={styles.input}
                            min={0}
                            step={1}
                            value={opponentScore}
                            onChange={(e) => setOpponentScore(e.target.value)}
                            required
                        />
                    </label>
                </div>
            ) : (
                <div className={styles.infoBanner}>
                    Date is today or in the future — result and scores will be saved as <strong>TBD</strong>.
                </div>
            )}

            <label className={styles.label}>
                <span>Notes</span>
                <textarea
                    className={styles.textarea}
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </label>

            {error && <div className={styles.errorBanner}>{error}</div>}
            {success && <div className={styles.successBanner}>{success}</div>}

            <button type="submit" className={styles.submitButton} disabled={submitting}>
                {submitting ? "Saving..." : "Add Match"}
            </button>

            <button type="button" className={styles.clearButton} onClick={resetForm} disabled={submitting}>
                Clear Form
            </button>
        </form>
    );
}
