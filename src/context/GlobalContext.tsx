"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { db } from "@/firebase";
import { collection, onSnapshot, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import type { Match } from "@/types/match";

interface GlobalContextType {
    isSticky: boolean;
    isMobile: boolean;
    scheduleArr: Match[];
    scheduleLoading: boolean;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [isSticky] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [scheduleArr, setScheduleArr] = useState<Match[]>([]);
    const [scheduleLoading, setScheduleLoading] = useState(true);
    const magicIsMobileNumber = 768;

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < magicIsMobileNumber);
        handleResize(); // initial
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // ---- Firestore: live schedule subscription ----
    useEffect(() => {
        setScheduleLoading(true);
        const ref = collection(db, "schedule");
        const unsub = onSnapshot(
            ref,
            (snap) => {
                const next: Match[] = snap.docs.map(mapDocToMatch);
                setScheduleArr(next);
                setScheduleLoading(false);
            },
            (err) => {
                console.error("[GlobalContext] schedule onSnapshot error:", err);
                setScheduleArr([]); // fail-safe
                setScheduleLoading(false);
            }
        );
        return () => unsub();
    }, []);

    return (
        <GlobalContext.Provider value={{ isSticky, isMobile, scheduleArr, scheduleLoading }}>
            {children}
        </GlobalContext.Provider>
    );
};

// --- helpers ---
function mapDocToMatch(doc: QueryDocumentSnapshot<DocumentData>): Match {
    const d = doc.data() || {};
    // Normalize to your contract; provide safe fallbacks
    const ourScore = isNum(d.ourScore) ? Number(d.ourScore) : null;
    const opponentScore = isNum(d.opponentScore) ? Number(d.opponentScore) : null;
    const outcome = d.outcome ?? null;

    // Derive `score` if missing but outcome + scores exist
    const normalizedScore =
        typeof d.score === "string" && d.score.length > 0
            ? d.score
            : outcome && ourScore != null && opponentScore != null
                ? `${outcome} ${ourScore}-${opponentScore}`
                : "TBD";

    return {
        id: doc.id,
        date: String(d.date ?? ""),
        time: String(d.time ?? ""),
        opponent: String(d.opponent ?? ""),
        isHome: Boolean(d.isHome),
        location: String(d.location ?? ""),
        league: (d.league as Match["league"]) ?? "Outdoor",
        goalScorers: Array.isArray(d.goalScorers) ? d.goalScorers as string[] : undefined,
        notes: d.notes ?? null,
        ourScore,
        opponentScore,
        outcome,
        score: normalizedScore,
    };
}

function isNum(v: unknown): boolean {
    return typeof v === "number" || (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v)));
}

export const useGlobal = () => {
    const ctx = useContext(GlobalContext);
    if (!ctx) throw new Error("YO! useGlobal must be used within a GlobalProvider");
    return ctx;
};
