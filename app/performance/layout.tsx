import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions } from "@/lib/layout.shared";
import { performanceSource, filterIndexPages } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/performance">) {
    return (
        <DocsLayout tree={filterIndexPages(performanceSource.pageTree)} {...baseOptions()}>
            {children}
        </DocsLayout>
    );
}

