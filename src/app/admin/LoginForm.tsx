"use client";
import React, { useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "@/app/admin/Admin.module.scss";

interface LoginFormProps {
    onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const isValidPassword = (val: string) => val.length >= 6;

    const formValid = useMemo(
        () => isValidEmail(email) && isValidPassword(password),
        [email, password]
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formValid) {
            setError("Please enter a valid email and a password of at least 6 characters.");
            return;
        }

        try {
            setSubmitting(true);
            await login(email.trim(), password);

            // clear inputs on success
            setEmail("");
            setPassword("");

            onSuccess?.();
        } catch (err: any) {
            let msg = "Login failed. Please try again.";
            const code = err?.code as string | undefined;

            if (code === "auth/invalid-credential" || code === "auth/invalid-login-credentials") {
                msg = "Incorrect email or password.";
            } else if (code === "auth/user-disabled") {
                msg = "This account has been disabled.";
            } else if (code === "auth/too-many-requests") {
                msg = "Too many attempts. Please wait a bit and try again.";
            }
            setError(msg);
            console.info("Firebase auth error:", code ?? err?.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
            <h1 className={styles.title}>Login</h1>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                autoComplete="username"
                required
                aria-invalid={email.length > 0 && !isValidEmail(email)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                autoComplete="current-password"
                required
                aria-invalid={password.length > 0 && !isValidPassword(password)}
            />

            {error && <div className={styles.errorBanner}>{error}</div>}

            <button type="submit" className={styles.submitButton} disabled={submitting}>
                {submitting ? "Signing in..." : "Submit"}
            </button>

            <p className={styles.footerText}>Admin access only</p>
        </form>
    );
}
