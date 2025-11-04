import { baseOptions } from "@/lib/layout.shared";
import { blogSource, filterIndexPages } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { UserDropdown } from "@/components/user-dropdown";

const BlogLayout = ({ children }: LayoutProps<"/blog">) => {
  return (
    <DocsLayout tree={filterIndexPages(blogSource.pageTree)} {...baseOptions()}
      sidebar={{
        footer: <UserDropdown dropdownPosition="right" />,
      }}
    >
      {children}
    </DocsLayout>
  );
};

export default BlogLayout;
