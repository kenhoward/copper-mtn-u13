export interface Match {
    date: string;
    opponent: string;
    isHome: boolean;
    time: string;
    location: string;
    score: string;
    league: "Indoor" | "Outdoor" | "Tournament";
    goalScorers?: string[];
    notes?: string | null;
    ourScore?: number | null;
    opponentScore?: number | null;
    outcome?: "W" | "L" | "T" | null;
    id?: string;
}
