import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions } from "@/lib/layout.shared";
import { performanceSource, filterIndexPages } from "@/lib/source";
import { UserDropdown } from "@/components/user-dropdown";

export default function Layout({ children }: LayoutProps<"/performance">) {
    return (
        <DocsLayout tree={filterIndexPages(performanceSource.pageTree)} {...baseOptions()} sidebar={{
            footer: <UserDropdown dropdownPosition="right" />,
        }}>
            {children}
        </DocsLayout>
    );
}

