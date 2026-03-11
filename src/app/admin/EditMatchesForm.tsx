"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { DocumentData, UpdateData } from "firebase/firestore";
import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useGlobal } from "@/context/GlobalContext";
import { getMatchEffectiveDate } from "@/utils/dateFormatter";
import { toAmPm } from "@/utils/timeFormatter";
import type { Match } from "@/types/match";
import styles from "@/app/admin/Admin.module.scss";

type EditBucket = "upcoming" | "past";
type League = Match["league"];
type Outcome = "W" | "L" | "T";

interface GoalRow {
    name: string;
    minute: string;
}

const NO_DATA = "No Data";
const NO_GOALS = "No Goals";

function to24Hour(timeStr: string): string {
    const raw = timeStr.trim();

    const ampmMatch = raw.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (ampmMatch) {
        const minute = ampmMatch[2];
        const modifier = ampmMatch[3].toUpperCase();
        let hour = Number(ampmMatch[1]);
        if (modifier === "PM" && hour !== 12) hour += 12;
        if (modifier === "AM" && hour === 12) hour = 0;
        return `${String(hour).padStart(2, "0")}:${minute}`;
    }

    const twentyFourMatch = raw.match(/^([01]?\d|2[0-3]):([0-5]\d)$/);
    if (twentyFourMatch) {
        return `${String(Number(twentyFourMatch[1])).padStart(2, "0")}:${twentyFourMatch[2]}`;
    }

    return "";
}

function isLeague(value: string): value is League {
    return value === "Indoor" || value === "Outdoor" || value === "Tournament";
}

function getTodayIso(): string {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function normalizeGoalTag(value: string): string {
    return value.trim().toLowerCase();
}

function parseGoalRows(goalScorers: string[] | undefined): GoalRow[] {
    if (!Array.isArray(goalScorers)) return [];

    return goalScorers
        .map((entry) => {
            const clean = entry.trim();
            if (!clean) return null;
            if (normalizeGoalTag(clean) === NO_DATA.toLowerCase()) return null;
            if (normalizeGoalTag(clean) === NO_GOALS.toLowerCase()) return null;

            const matched = clean.match(/^(.*?)\s*-\s*(\d{1,3})'?$/);
            if (matched) {
                return { name: matched[1].trim(), minute: matched[2] };
            }

            return { name: clean, minute: "" };
        })
        .filter((row): row is GoalRow => Boolean(row));
}

function buildGoalScorers(ourGoals: number, noGoalData: boolean, goalRows: GoalRow[]): string[] {
    if (ourGoals === 0) return [NO_GOALS];
    if (noGoalData) return [NO_DATA];
    return goalRows.map((row) => `${row.name.trim()} - ${Number(row.minute)}'`);
}

function getOutcome(ourScore: number, opponentScore: number): Outcome {
    if (ourScore > opponentScore) return "W";
    if (ourScore < opponentScore) return "L";
    return "T";
}

function formatMatchOption(match: Match): string {
    const dateObj = getMatchEffectiveDate(match);
    const dateLabel = dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    const locationPrefix = match.isHome ? "v." : "@";
    return `${dateLabel} ${locationPrefix} ${match.opponent}`;
}

export default function EditMatchesForm() {
    const { scheduleArr, scheduleLoading } = useGlobal();
    const [bucket, setBucket] = useState<EditBucket>("upcoming");
    const [selectedMatchId, setSelectedMatchId] = useState("");

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [opponent, setOpponent] = useState("");
    const [isHome, setIsHome] = useState(true);
    const [location, setLocation] = useState("");
    const [league, setLeague] = useState<League>("Indoor");
    const [ourScore, setOurScore] = useState("");
    const [opponentScore, setOpponentScore] = useState("");
    const [goalRows, setGoalRows] = useState<GoalRow[]>([]);
    const [noGoalData, setNoGoalData] = useState(false);
    const [notes, setNotes] = useState("");

    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleteConfirming, setDeleteConfirming] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const { upcomingMatches, pastMatches } = useMemo(() => {
        const now = new Date();
        const sorted = [...scheduleArr]
            .filter((match) => Boolean(match.id))
            .sort((a, b) => getMatchEffectiveDate(a).getTime() - getMatchEffectiveDate(b).getTime());

        const upcoming = sorted.filter((match) => getMatchEffectiveDate(match) >= now);
        const past = sorted.filter((match) => getMatchEffectiveDate(match) < now).reverse();

        return { upcomingMatches: upcoming, pastMatches: past };
    }, [scheduleArr]);

    const visibleMatches = bucket === "upcoming" ? upcomingMatches : pastMatches;

    useEffect(() => {
        if (visibleMatches.length === 0) {
            if (selectedMatchId) setSelectedMatchId("");
            return;
        }

        const found = visibleMatches.some((match) => match.id === selectedMatchId);
        if (!found) setSelectedMatchId(visibleMatches[0].id ?? "");
    }, [visibleMatches, selectedMatchId]);

    const selectedMatch = useMemo(
        () => visibleMatches.find((match) => match.id === selectedMatchId),
        [visibleMatches, selectedMatchId]
    );

    const hydrateFromMatch = useCallback((match: Match) => {
        const existingOurScore = match.ourScore;
        const existingGoalRows = parseGoalRows(match.goalScorers);
        const hasNoData = Array.isArray(match.goalScorers)
            ? match.goalScorers.some((x) => normalizeGoalTag(x) === NO_DATA.toLowerCase())
            : false;

        setDate(match.date ?? "");
        setTime(to24Hour(match.time ?? ""));
        setOpponent(match.opponent ?? "");
        setIsHome(Boolean(match.isHome));
        setLocation(match.location ?? "");
        setLeague(isLeague(match.league) ? match.league : "Indoor");
        setOurScore(existingOurScore == null ? "" : String(existingOurScore));
        setOpponentScore(match.opponentScore == null ? "" : String(match.opponentScore));
        setNoGoalData(hasNoData);
        setGoalRows(existingGoalRows);
        setNotes(match.notes ?? "");
    }, []);

    useEffect(() => {
        if (!selectedMatch) return;
        hydrateFromMatch(selectedMatch);
        setError(null);
        setSuccess(null);
    }, [selectedMatch, hydrateFromMatch]);

    useEffect(() => {
        if (!success) return;
        const t = setTimeout(() => setSuccess(null), 3000);
        return () => clearTimeout(t);
    }, [success]);

    useEffect(() => {
        setDeleteConfirming(false);
    }, [bucket, selectedMatchId]);

    useEffect(() => {
        if (bucket !== "past" || noGoalData) return;
        const parsed = Number(ourScore);
        const goalCount = Number.isInteger(parsed) && parsed > 0 ? parsed : 0;

        setGoalRows((prev) => {
            const next = [...prev];
            if (goalCount > next.length) {
                while (next.length < goalCount) next.push({ name: "", minute: "" });
            } else if (goalCount < next.length) {
                next.length = goalCount;
            }
            return next;
        });
    }, [bucket, ourScore, noGoalData]);

    const baseFieldsValid = useMemo(() => {
        return (
            /^\d{4}-\d{2}-\d{2}$/.test(date) &&
            /^\d{2}:\d{2}$/.test(time) &&
            opponent.trim().length > 0 &&
            location.trim().length > 0 &&
            isLeague(league)
        );
    }, [date, time, opponent, location, league]);

    const upcomingDateValid = useMemo(() => {
        if (bucket !== "upcoming") return true;
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
        return date >= getTodayIso();
    }, [bucket, date]);

    const scoresValid = useMemo(() => {
        if (bucket !== "past") return true;
        if (ourScore.trim() === "" || opponentScore.trim() === "") return false;
        const our = Number(ourScore);
        const their = Number(opponentScore);
        return Number.isInteger(our) && our >= 0 && Number.isInteger(their) && their >= 0;
    }, [bucket, ourScore, opponentScore]);

    const goalsValid = useMemo(() => {
        if (bucket !== "past") return true;

        const our = Number(ourScore);
        if (!Number.isInteger(our) || our < 0) return false;
        if (our === 0) return true;
        if (noGoalData) return true;
        if (goalRows.length !== our) return false;

        return goalRows.every((row) => {
            const minuteNum = Number(row.minute);
            return row.name.trim().length > 0 && Number.isInteger(minuteNum) && minuteNum >= 0 && minuteNum <= 120;
        });
    }, [bucket, ourScore, noGoalData, goalRows]);

    const outcomePreview = useMemo(() => {
        if (bucket !== "past") return null;
        const our = Number(ourScore);
        const their = Number(opponentScore);
        if (!Number.isInteger(our) || our < 0 || !Number.isInteger(their) || their < 0) return null;
        const outcome = getOutcome(our, their);
        return `${outcome} ${our}-${their}`;
    }, [bucket, ourScore, opponentScore]);

    const isValid = Boolean(selectedMatch?.id) && baseFieldsValid && upcomingDateValid && scoresValid && goalsValid;
    const isBusy = submitting || deleting;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setDeleteConfirming(false);
        setError(null);
        setSuccess(null);

        if (!selectedMatch?.id) {
            setError("Select a match to edit.");
            return;
        }

        if (!isValid) {
            setError("Please fill all required fields before saving.");
            return;
        }

        const payload: UpdateData<DocumentData> = {
            date: date.trim(),
            time: toAmPm(time.trim()),
            opponent: opponent.trim(),
            isHome,
            location: location.trim(),
            league,
            notes: notes.trim() || null,
            _updatedAt: serverTimestamp(),
        };

        if (bucket === "past") {
            const our = Number(ourScore);
            const their = Number(opponentScore);
            const outcome = getOutcome(our, their);

            payload.ourScore = our;
            payload.opponentScore = their;
            payload.outcome = outcome;
            payload.score = `${outcome} ${our}-${their}`;
            payload.goalScorers = buildGoalScorers(our, noGoalData, goalRows);
        }

        try {
            setSubmitting(true);
            await updateDoc(doc(db, "schedule", selectedMatch.id), payload);
            setSuccess(`Updated ${selectedMatch.opponent}.`);
        } catch (err: any) {
            console.error("Error updating match:", err?.code, err?.message);
            setError(
                err?.code === "permission-denied"
                    ? "Permission denied. Check Firestore rules or your login state."
                    : `Could not update the match. (${err?.code || "unknown"})`
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        setError(null);
        setSuccess(null);

        if (!selectedMatch?.id) {
            setError("Select a match to delete.");
            return;
        }

        if (!deleteConfirming) {
            setDeleteConfirming(true);
            return;
        }

        try {
            setDeleting(true);
            const deletedLabel = selectedMatch.opponent;
            await deleteDoc(doc(db, "schedule", selectedMatch.id));
            setSuccess(`Deleted ${deletedLabel}.`);
            setDeleteConfirming(false);
        } catch (err: any) {
            console.error("Error deleting match:", err?.code, err?.message);
            setError(
                err?.code === "permission-denied"
                    ? "Permission denied. Check Firestore rules or your login state."
                    : `Could not delete the match. (${err?.code || "unknown"})`
            );
        } finally {
            setDeleting(false);
        }
    };

    const handleReloadSelected = () => {
        if (!selectedMatch) return;
        hydrateFromMatch(selectedMatch);
        setDeleteConfirming(false);
        setError(null);
        setSuccess(null);
    };

    const noMatchesInBucket = !scheduleLoading && visibleMatches.length === 0;

    return (
        <form className={`${styles.cardForm} ${styles.editCardForm}`} onSubmit={handleSubmit}>
            <h2 className={styles.sectionTitle}>Edit Matches</h2>
            <p className={styles.subtleText}>Switch between upcoming and past matches, then update the selected game.</p>

            <div className={styles.toggleGroup} role="tablist" aria-label="Match type toggle">
                <button
                    type="button"
                    className={`${styles.toggleButton} ${bucket === "upcoming" ? styles.toggleButtonActive : ""}`}
                    onClick={() => setBucket("upcoming")}
                    aria-pressed={bucket === "upcoming"}
                >
                    Upcoming ({upcomingMatches.length})
                </button>
                <button
                    type="button"
                    className={`${styles.toggleButton} ${bucket === "past" ? styles.toggleButtonActive : ""}`}
                    onClick={() => setBucket("past")}
                    aria-pressed={bucket === "past"}
                >
                    Past ({pastMatches.length})
                </button>
            </div>

            {scheduleLoading ? (
                <div className={styles.infoBanner}>Loading matches...</div>
            ) : noMatchesInBucket ? (
                <div className={styles.infoBanner}>No {bucket} matches available to edit.</div>
            ) : (
                <>
                    <label className={styles.label}>
                        <span>Select Match*</span>
                        <select
                            className={styles.input}
                            value={selectedMatchId}
                            onChange={(e) => setSelectedMatchId(e.target.value)}
                        >
                            {visibleMatches.map((match) => (
                                <option key={match.id} value={match.id}>
                                    {formatMatchOption(match)}
                                </option>
                            ))}
                        </select>
                    </label>

                    {selectedMatch && (
                        <div className={styles.matchMeta}>
                            Editing {selectedMatch.isHome ? "home" : "away"} game vs {selectedMatch.opponent}
                        </div>
                    )}

                    <fieldset className={styles.fieldSet} disabled={!selectedMatch || isBusy}>
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
                                    step={300}
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
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
                                    <option value="Tournament">Tournament</option>
                                </select>
                            </label>
                        </div>

                        {bucket === "past" ? (
                            <>
                                <div className={styles.twoCol}>
                                    <label className={styles.label}>
                                        <span>Our Score*</span>
                                        <input
                                            type="number"
                                            inputMode="numeric"
                                            min={0}
                                            step={1}
                                            className={styles.input}
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
                                            min={0}
                                            step={1}
                                            className={styles.input}
                                            value={opponentScore}
                                            onChange={(e) => setOpponentScore(e.target.value)}
                                            required
                                        />
                                    </label>
                                </div>

                                {outcomePreview && <div className={styles.outcomePreview}>Outcome will save as {outcomePreview}</div>}

                                {Number(ourScore) === 0 ? (
                                    <div className={styles.infoBanner}>No team goals entered. Goal scorers will save as “No Goals”.</div>
                                ) : (
                                    <>
                                        <label className={styles.inlineCheck}>
                                            <input
                                                type="checkbox"
                                                className={styles.noDataCheckbox}
                                                checked={noGoalData}
                                                onChange={(e) => setNoGoalData(e.target.checked)}
                                            />
                                            <span style={{ marginLeft: 8 }}>No Available Goal Data</span>
                                        </label>

                                        {noGoalData ? (
                                            <div className={styles.infoBanner}>Goal scorers will save as “No Data”.</div>
                                        ) : (
                                            Number(ourScore) > 0 && (
                                                <div>
                                                    <div className={styles.label} style={{ marginBottom: "0.25rem" }}>
                                                        <span>
                                                            Goal Scorers ({goalRows.length} goal{goalRows.length === 1 ? "" : "s"})
                                                        </span>
                                                    </div>
                                                    {goalRows.map((row, idx) => (
                                                        <div key={idx} className={styles.twoCol} style={{ marginBottom: "0.5rem" }}>
                                                            <input
                                                                type="text"
                                                                className={styles.input}
                                                                placeholder={`Goal ${idx + 1}`}
                                                                value={row.name}
                                                                onChange={(e) => {
                                                                    const nextName = e.target.value;
                                                                    setGoalRows((prev) => {
                                                                        const next = [...prev];
                                                                        next[idx] = { ...next[idx], name: nextName };
                                                                        return next;
                                                                    });
                                                                }}
                                                                required
                                                            />
                                                            <input
                                                                type="number"
                                                                inputMode="numeric"
                                                                className={styles.input}
                                                                placeholder="Minute"
                                                                min={0}
                                                                max={120}
                                                                step={1}
                                                                value={row.minute}
                                                                onChange={(e) => {
                                                                    const nextMinute = e.target.value;
                                                                    setGoalRows((prev) => {
                                                                        const next = [...prev];
                                                                        next[idx] = { ...next[idx], minute: nextMinute };
                                                                        return next;
                                                                    });
                                                                }}
                                                                required
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                        )}
                                    </>
                                )}
                            </>
                        ) : (
                            <div className={styles.infoBanner}>
                                Upcoming matches can only update pre-game details. To edit results, switch to the Past tab.
                            </div>
                        )}

                        <label className={styles.label}>
                            <span>Notes</span>
                            <textarea className={styles.textarea} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
                        </label>
                    </fieldset>
                </>
            )}

            {!upcomingDateValid && bucket === "upcoming" && (
                <div className={styles.errorBanner}>
                    Upcoming edits must keep the date on or after today. Move this match to the Past tab if it has concluded.
                </div>
            )}

            {error && <div className={styles.errorBanner}>{error}</div>}
            {success && <div className={styles.successBanner}>{success}</div>}

            <button type="submit" className={styles.submitButton} disabled={!isValid || isBusy || noMatchesInBucket}>
                {submitting ? "Saving..." : "Save Changes"}
            </button>

            <div className={styles.formActionsRow}>
                <button
                    type="button"
                    className={`${styles.clearButton} ${styles.noTopMargin}`}
                    onClick={handleReloadSelected}
                    disabled={!selectedMatch || isBusy}
                >
                    Reload Selected Match
                </button>

                <div className={styles.formActionsRight}>
                    {deleteConfirming && (
                        <button
                            type="button"
                            className={`${styles.clearButton} ${styles.noTopMargin}`}
                            onClick={() => setDeleteConfirming(false)}
                            disabled={isBusy}
                        >
                            Cancel
                        </button>
                    )}

                    <button
                        type="button"
                        className={deleteConfirming ? styles.confirmDeleteButton : styles.deleteButton}
                        onClick={handleDelete}
                        disabled={!selectedMatch || isBusy || noMatchesInBucket}
                    >
                        {deleting ? "Deleting..." : deleteConfirming ? "Confirm Delete" : "Delete Match"}
                    </button>
                </div>
            </div>
        </form>
    );
}
