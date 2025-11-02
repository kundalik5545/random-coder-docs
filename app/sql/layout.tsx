import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions } from "@/lib/layout.shared";
import { sqlSource, filterIndexPages } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/sql">) {
    return (
        <DocsLayout tree={filterIndexPages(sqlSource.pageTree)} {...baseOptions()}>
            {children}
        </DocsLayout>
    );
}

