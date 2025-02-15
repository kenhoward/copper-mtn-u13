"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Match {
    date: string;
    opponent: string;
    isHome: boolean;
    time: string;
    location: string;
    score: string;
    league: "Indoor" | "Outdoor";
    goalScorers?: string[];
    notes?: string;    
}

interface GlobalContextType {
    isSticky: boolean;
    isMobile: boolean;
    scheduleArr: Match[];
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [isSticky, setIsSticky] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    // TODO probably ought to offload to some config
    const magicIsMobileNumber = 600;

    useEffect(() => {
        const handleScroll = () => {
            // TODO make more dynamic off the header height
            const scrollThreshold = isMobile ? 70 : 40;
            setIsSticky(window.scrollY > scrollThreshold);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < magicIsMobileNumber);
        };

        // Check initially
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Temporary schedule data (dummy data)
    const dummySchedule: Match[] = [
        {
            date: "2025-01-03",
            opponent: "City SC Elite 12B",
            isHome: false,
            time: "5:00 PM",
            location: "Sporty City",
            score: "L 4-5",
            league: "Indoor",
            goalScorers: [""]
        },
        {
            date: "2025-01-10",
            opponent: "Blast 12B",
            isHome: false,
            time: "5:00 PM",
            location: "Sport City",
            score: "L 0-4",
            league: "Indoor",
            goalScorers: ["Nate", "Oli", "Oli"]
        },
        {
            date: "2025-01-25",
            opponent: "Vipers",
            isHome: true,
            time: "3:40 PM",
            location: "Sport City",
            score: "W 5-1",
            league: "Indoor",
            goalScorers: [""]
        },
        {
            date: "2025-02-15",
            opponent: "City SC Utah Premier",
            isHome: true,
            time: "5:10 PM",
            location: "Sport City",
            score: "TBD",
            league: "Indoor",
            goalScorers: [""]
        },
        {
            date: "2025-03-01",
            opponent: "SSFC Thunder",
            isHome: false,
            time: "4:25 PM",
            location: "Sport City",
            score: "TBD",
            league: "Indoor",
            goalScorers: [""]
        },
        {
            date: "2025-03-15",
            opponent: "Blast 12B",
            isHome: true,
            time: "3:45 PM",
            location: "Sport City",
            score: "TBD",
            league: "Indoor",
            goalScorers: [""]
        },
        {
            date: "2025-03-21",
            opponent: "Cobras",
            isHome: true,
            time: "4:00 PM",
            location: "Sport City",
            score: "TBD",
            league: "Indoor",
            goalScorers: [""]
        },
        {
            date: "2025-03-28",
            opponent: "SSFC Thunder",
            isHome: false,
            time: "6:45 PM",
            location: "Sport City",
            score: "TBD",
            league: "Indoor",
            goalScorers: [""],
            notes: "Double header Today!"
        },
        {
            date: "2025-03-28",
            opponent: "Impact FA 12B",
            isHome: true,
            time: "2:00 PM",
            location: "Outdoor Field",
            score: "TBD",
            league: "Outdoor",
            goalScorers: [""],
            notes: "Second game of double header"
        },
        {
            date: "2025-04-04",
            opponent: "City SC UT Elite 12B - JP",
            isHome: false,
            time: "3:00 PM",
            location: "Opponent Stadium",
            score: "TBD",
            league: "Outdoor",
            goalScorers: [""]
        },
        {
            date: "2025-04-11",
            opponent: "River Mountain FC B12 White",
            isHome: true,
            time: "1:30 PM",
            location: "Outdoor Field",
            score: "TBD",
            league: "Outdoor",
            goalScorers: [""]
        },
        {
            date: "2025-04-18",
            opponent: "City SC UT Elite 12B - MM",
            isHome: false,
            time: "4:00 PM",
            location: "Opponent Stadium",
            score: "TBD",
            league: "Outdoor",
            goalScorers: [""]
        },
        {
            date: "2025-04-25",
            opponent: "Utah Glory B12 Red JAX",
            isHome: true,
            time: "2:30 PM",
            location: "Outdoor Field",
            score: "TBD",
            league: "Outdoor",
            goalScorers: [""]
        },
    ];

    return (
        <GlobalContext.Provider value={{ isSticky, isMobile, scheduleArr: dummySchedule }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error("YO! useGlobal must be used within a GlobalProvider");
    }
    return context;
};
