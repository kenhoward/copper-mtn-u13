// src/app/Providers.tsx
"use client";

import { AuthProvider } from "@/context/AuthContext";
import { GlobalProvider } from "@/context/GlobalContext";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <GlobalProvider>{children}</GlobalProvider>
        </AuthProvider>
    );
}
