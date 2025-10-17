"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "./LoginForm";
import AddMatchForm from "./AddMatchForm";
import styles from "./Admin.module.scss";

export default function AdminPage() {
    const { currentUser } = useAuth();

    return (
        <div className={styles.adminContainer}>
            {!currentUser ? (
                <LoginForm />
            ) : (
                <div className={styles.grid}>
                    <AddMatchForm />
                    {/* Future: <EditMatchesCard /> <BulkImportCard /> etc. */}
                </div>
            )}
        </div>
    );
}
