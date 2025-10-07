import { baseOptions } from "@/lib/layout.shared";
import { blogSource } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";

const BlogLayout = ({ children }: LayoutProps<"/blog">) => {
  return (
    <DocsLayout tree={blogSource.pageTree} {...baseOptions()} links={[]}>
      {children}
    </DocsLayout>
  );
};

export default BlogLayout;
