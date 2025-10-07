import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { Book, BookIcon } from "lucide-react";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      links={[
        {
          icon: <BookIcon />,
          text: "Blog",
          url: "/blog",
          active: "nested-url",
        },
        {
          icon: <BookIcon />,
          text: "Docs",
          url: "/docs",
          active: "nested-url",
        },
        {
          icon: <Book />,
          text: "FumaDocs",
          url: "/fumadocs",
          active: "nested-url",
        },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
