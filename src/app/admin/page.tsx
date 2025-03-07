"use client";
import React, { useState } from "react";
import styles from "./Admin.module.scss";

export default function AdminPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // place holder logic until firebase implementation
        console.log("Email:", email, "Password:", password);
    };

    return (
        <div className={styles.adminContainer}>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    required
                />
                <button type="submit" className={styles.submitButton} disabled>
                    Submit
                </button>
                <p className={styles.footerText}>Admin access only</p>
            </form>
        </div>
    );
}
