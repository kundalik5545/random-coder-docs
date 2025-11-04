import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions } from "@/lib/layout.shared";
import { automationSource, filterIndexPages } from "@/lib/source";
import { UserDropdown } from "@/components/user-dropdown";

export default function Layout({ children }: LayoutProps<"/automation">) {
    return (
        <DocsLayout tree={filterIndexPages(automationSource.pageTree)} {...baseOptions()}
            sidebar={{
                footer: <UserDropdown dropdownPosition="right" />,
            }}
        >
            {children}
        </DocsLayout>
    );
}

