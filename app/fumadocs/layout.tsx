import { baseOptions } from "@/lib/layout.shared";
import { fumadocsSource } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { Book, BookIcon } from "lucide-react";

const FumadocsLayout = ({ children }: LayoutProps<"/fumadocs">) => {
  const base = baseOptions();
  return (
    <DocsLayout
      tree={fumadocsSource.pageTree}
      {...base}
      nav={{
        ...base.nav,
      }}
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
};

export default FumadocsLayout;
