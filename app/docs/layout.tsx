import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions } from "@/lib/layout.shared";
import { source, filterIndexPages } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout tree={filterIndexPages(source.pageTree)} {...baseOptions()} >
      {children}
    </ DocsLayout>
  );
}
