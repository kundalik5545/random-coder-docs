"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function LoginIcon() {
    const [mounted, setMounted] = useState(false);
    const { data: session, isPending } = authClient.useSession();

    // Handle client-side mounting to prevent hydration issues
    useEffect(() => {
        setMounted(true);
    }, []);

    // Don't render anything until mounted on client (prevents hydration mismatch)
    if (!mounted) {
        return null;
    }

    // Don't show login icon if user is authenticated
    // Show during loading state to prevent flicker
    if (isPending || session?.user) {
        return null;
    }

    return (
        <Link
            href="/sign-in"
            className="p-2"
            aria-label="Sign in"
        >
            <button className="flex items-center justify-center rounded-md p-2 bg-fd-primary text-fd-primary-foreground transition-colors hover:bg-fd-primary/80 focus:outline-none focus:ring-2 focus:ring-fd-ring">
                <LogIn className="h-5 w-5" />
                <span className="hidden md:block text-sm font-medium pl-2">
                    Login
                </span>
            </button>
        </Link>
    );
}

