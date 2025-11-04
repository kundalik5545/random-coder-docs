"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut, MoreVertical } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function SidebarUser() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { data: session, isPending } = authClient.useSession();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                    router.refresh();
                },
            },
        });
        setIsOpen(false);
    };

    if (isPending || !session?.user) {
        return null;
    }

    const userName = session.user.name || session.user.email || "User";

    return (
        <div className="relative border-t border-fd-border p-4" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-fd-accent focus:outline-none focus:ring-2 focus:ring-fd-ring"
                aria-label="User menu"
                aria-expanded={isOpen}
            >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fd-primary text-fd-primary-foreground">
                    {session.user.image ? (
                        <img
                            src={session.user.image}
                            alt={userName}
                            className="h-8 w-8 rounded-full"
                        />
                    ) : (
                        <User className="h-4 w-4" />
                    )}
                </div>
                <span className="flex-1 truncate text-left text-sm font-medium text-fd-foreground">
                    {userName}
                </span>
                <MoreVertical className="h-4 w-4 shrink-0 text-fd-muted-foreground" />
            </button>

            {isOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 rounded-md border border-fd-border bg-fd-background shadow-lg z-50">
                    <div className="p-2">
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center gap-2 rounded-md px-3 py-2 text-sm text-fd-foreground transition-colors hover:bg-fd-accent focus:outline-none focus:ring-2 focus:ring-fd-ring"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

