"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut, MoreVertical } from "lucide-react";
import { authClient } from "@/lib/auth-client";

type DropdownPosition =
    | "bottom"
    | "right"
    | "bottom-left"
    | "bottom-right";

// dropdownPosition: "bottom" (navbar: dialog below), "right" (sidebar: to the right), others fallback for compatibility
export function UserDropdown({
    dropdownPosition = "bottom",
}: { dropdownPosition?: DropdownPosition }) {
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

    // Position logic
    // - "bottom": dropdown appears below the trigger (for navbars at top)
    // - "right": dropdown appears to right of trigger (for sidebar left)
    // - "bottom-left"/"bottom-right": legacy/fallback, handled as before
    let dropdownPositionClasses = "";
    if (dropdownPosition === "bottom") {
        dropdownPositionClasses =
            "left-1/2 -translate-x-1/2 top-full mt-2";
    } else if (dropdownPosition === "right") {
        dropdownPositionClasses =
            "left-full top-1/2 -translate-y-18 ml-2";
    } else if (dropdownPosition === "bottom-right") {
        dropdownPositionClasses =
            "right-0 top-full mt-2";
    } else {
        // bottom-left or default
        dropdownPositionClasses =
            "left-0 top-full mt-2";
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-fd-accent focus:outline-none focus:ring-2 focus:ring-fd-ring"
                aria-label="User menu"
                aria-expanded={isOpen}
            >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-fd-primary text-fd-primary-foreground">
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
                <span className="hidden md:block text-sm font-medium text-fd-foreground">
                    {userName}
                </span>
                <MoreVertical className="h-4 w-4 text-fd-muted-foreground" />
            </button>

            {isOpen && (
                <div
                    className={`absolute z-50 w-48 rounded-md border border-fd-border bg-fd-background shadow-lg ${dropdownPositionClasses} ${dropdownPosition === "right" ? "" : ""
                        }`}
                >
                    <div className="p-2">
                        <div className="px-3 py-2 text-sm font-medium text-fd-foreground border-b border-fd-border">
                            {userName}
                        </div>
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
