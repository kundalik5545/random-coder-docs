import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions } from "@/lib/layout.shared";
import { source, filterIndexPages } from "@/lib/source";
import { UserDropdown } from "@/components/user-dropdown";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={filterIndexPages(source.pageTree)}
      {...baseOptions()}
      sidebar={{
        footer: <UserDropdown dropdownPosition="right" />,
      }}
    >
      {children}
    </DocsLayout>
  );
}
