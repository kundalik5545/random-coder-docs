import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions } from "@/lib/layout.shared";
import { backendSource, filterIndexPages } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/backend">) {
    return (
        <DocsLayout tree={filterIndexPages(backendSource.pageTree)} {...baseOptions()}>
            {children}
        </DocsLayout>
    );
}

