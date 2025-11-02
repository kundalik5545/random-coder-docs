import { baseOptions } from "@/lib/layout.shared";
import { blogSource, filterIndexPages } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";

const BlogLayout = ({ children }: LayoutProps<"/blog">) => {
  return (
    <DocsLayout tree={filterIndexPages(blogSource.pageTree)} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
};

export default BlogLayout;
