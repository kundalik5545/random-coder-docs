import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions } from "@/lib/layout.shared";
import { frontendSource, filterIndexPages } from "@/lib/source";
import { UserDropdown } from "@/components/user-dropdown";

export default function Layout({ children }: LayoutProps<"/frontend">) {
    return (
        <DocsLayout tree={filterIndexPages(frontendSource.pageTree)} {...baseOptions()}
            sidebar={{
                footer: <UserDropdown dropdownPosition="right" />,
            }}
        >
            {children}
        </DocsLayout>
    );
}

