"use client";

import Link from "next/link";
import { LogIn } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function LoginIcon() {
    const { data: session, isPending } = authClient.useSession();

    // Don't show login icon if user is authenticated
    if (isPending || session?.user) {
        return null;
    }

    return (
        <Link
            href="/sign-in"
            className="flex items-center justify-center rounded-md p-2 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground focus:outline-none focus:ring-2 focus:ring-fd-ring"
            aria-label="Sign in"
        >
            <LogIn className="h-5 w-5" />
        </Link>
    );
}

