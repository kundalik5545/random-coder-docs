import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions } from "@/lib/layout.shared";
import { UserDropdown } from "@/components/user-dropdown";
import { filterIndexPages } from "@/lib/source";
import Link from "next/link";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in?callbackUrl=/updates");
    }

    return (
        <DocsLayout
            tree={filterIndexPages({ children: [] })}
            {...baseOptions()}
            sidebar={{
                footer: <UserDropdown dropdownPosition="right" />,
            }}
        >
            <div className="container mx-auto mt-2">
                <NavLinksComponent />
                {children}
            </div>
        </DocsLayout>
    );
}
const NavLinks = [
    {
        label: "Todo Items",
        href: "/updates/todo-items",
    },
    {
        label: "Daily Notes",
        href: "/updates/daily-notes",
    },
    {
        label: "Daily Updates",
        href: "/updates/daily-updates",
    },
    {
        label: "Copy Paste Materials",
        href: "/updates/copy-paste-materials",
    },
]

const NavLinksComponent = () => {
    return (
        <div className="flex flex-row gap-2 mb-4">
            {NavLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2 p-2 rounded-md hover:bg-gray-200"

                >
                    {link.label}
                </Link>
            ))}
        </div>
    )
}