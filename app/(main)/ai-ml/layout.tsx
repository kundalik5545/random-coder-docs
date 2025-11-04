import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions } from "@/lib/layout.shared";
import { aiMlSource, filterIndexPages } from "@/lib/source";
import { UserDropdown } from "@/components/user-dropdown";

export default function Layout({ children }: LayoutProps<"/ai-ml">) {
    return (
        <DocsLayout tree={filterIndexPages(aiMlSource.pageTree)} {...baseOptions()} sidebar={{
            footer: <UserDropdown dropdownPosition="right" />,
        }}>
            {children}
        </DocsLayout>
    );
}

