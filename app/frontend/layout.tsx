import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions } from "@/lib/layout.shared";
import { frontendSource, filterIndexPages } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/frontend">) {
    return (
        <DocsLayout tree={filterIndexPages(frontendSource.pageTree)} {...baseOptions()}>
            {children}
        </DocsLayout>
    );
}

