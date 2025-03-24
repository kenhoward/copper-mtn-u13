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

    // TODO fix sticky header issues
    // useEffect(() => {
    //     const handleScroll = () => {
    //         // TODO make more dynamic off the header height
    //         const scrollThreshold = isMobile ? 70 : 40;
    //         setIsSticky(window.scrollY > scrollThreshold);
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

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
            goalScorers: ["No Data"]
        },
        {
            date: "2025-01-10",
            opponent: "Blast 12B",
            isHome: false,
            time: "5:00 PM",
            location: "Sport City (Indoor)",
            score: "L 0-4",
            league: "Indoor",
            goalScorers: ["No Goals"]
        },
        {
            date: "2025-01-25",
            opponent: "Vipers",
            isHome: true,
            time: "3:40 PM",
            location: "Sport City (Indoor)",
            score: "W 5-1",
            league: "Indoor",
            goalScorers: ["No Data"]
        },
        {
            date: "2025-02-15",
            opponent: "City SC Utah Premier",
            isHome: true,
            time: "5:10 PM",
            location: "Sport City (Indoor)",
            score: "L 3-7",
            league: "Indoor",
            goalScorers: ["Landon - 14'", "Tyler - 26'", "Ollie - 27'"]
        },
        {
            date: "2025-03-01",
            opponent: "SSFC Thunder",
            isHome: false,
            time: "4:25 PM",
            location: "Sport City (Indoor)",
            score: "L 9-0",
            league: "Indoor",
            goalScorers: ["No Goals"]
        },
        {
            date: "2025-03-15",
            opponent: "Blast 12B",
            isHome: true,
            time: "3:45 PM",
            location: "Sport City (Indoor)",
            score: "TBD",
            league: "Indoor",
            goalScorers: [""]
        },
        {
            date: "2025-03-21",
            opponent: "Cobras",
            isHome: true,
            time: "4:00 PM",
            location: "Sport City (Indoor)",
            score: "TBD",
            league: "Indoor",
            goalScorers: [""],
            notes: "Reminder: We have a game scheduled for tomorrow as well."
        },
        {
            date: "2025-03-22",
            opponent: "City SC Elite MM",
            isHome: true,
            time: "6:40 PM",
            location: "Monarch Meadows",
            score: "TBD",
            league: "Outdoor",
            goalScorers: [""],
            notes: "First outdoor match!"
        },
        {
            date: "2025-03-24",
            opponent: "Utah Glory",
            isHome: true,
            time: "6:55 PM",
            location: "Monarch Meadows",
            score: "TBD",
            league: "Outdoor",
            goalScorers: [""],
            notes: "Reminder: We have a game scheduled for tomorrow as well."
        },
        {
            date: "2025-04-25",
            opponent: "Impact",
            isHome: false,
            time: "5:30 PM",
            location: "2323 S 900 E (Fairmont Park)",
            score: "TBD",
            league: "Outdoor",
            goalScorers: [""]
        },
        {
            date: "2025-03-28",
            opponent: "SSFC Thunder",
            isHome: false,
            time: "6:45 PM",
            location: "Sport City (Indoor)",
            score: "TBD",
            league: "Indoor",
            goalScorers: [""]
        },
        {
            date: "2025-03-29",
            opponent: "Impact",
            isHome: true,
            time: "5:15 PM",
            location: "Monarch Meadows Park",
            score: "TBD",
            league: "Outdoor",
            goalScorers: [""]
        },
        {
            date: "2025-04-12",
            opponent: "City SC Elite MM",
            isHome: false,
            time: "2:25 PM",
            location: "Rowland Hall - Soccer Fields",
            score: "TBD",
            league: "Outdoor",
            goalScorers: [""],
            notes: "Near East High & UofU"
        },
        {
            date: "2025-04-19",
            opponent: "River Mountain",
            isHome: false,
            time: "11:45 AM",
            location: "Majestic Elementary - West Jordan",
            score: "TBD",
            league: "Outdoor",
            goalScorers: [""]
        },
        {
            date: "2025-04-26",
            opponent: "City SC Elite JP",
            isHome: false,
            time: "9:55 PM",
            location: "Rowland Hall - Soccer Fields",
            score: "TBD",
            league: "Outdoor",
            goalScorers: [""],
            notes: "Near East High & UofU"
        },
        {
            date: "2025-05-03",
            opponent: "Utah Glory",
            isHome: false,
            time: "11:30 aM",
            location: "Jordan Ridge Park",
            score: "TBD",
            league: "Outdoor",
            goalScorers: [""]
        },
        {
            date: "2025-05-25",
            opponent: "City SC Elite JP",
            isHome: true,
            time: "5:30 PM",
            location: "Canyonview Park",
            score: "TBD",
            league: "Outdoor",
            goalScorers: [""]
        },
        {
            date: "2025-05-07",
            opponent: "River Mountain",
            isHome: true,
            time: "3:50 PM",
            location: "Monarch Meadows Park",
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
