import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions } from "@/lib/layout.shared";
import { aiMlSource, filterIndexPages } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/ai-ml">) {
    return (
        <DocsLayout tree={filterIndexPages(aiMlSource.pageTree)} {...baseOptions()}>
            {children}
        </DocsLayout>
    );
}

