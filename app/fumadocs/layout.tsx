import { baseOptions } from "@/lib/layout.shared";
import { fumadocsSource, filterIndexPages } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";

const FumadocsLayout = ({ children }: LayoutProps<"/fumadocs">) => {
  return (
    <DocsLayout tree={filterIndexPages(fumadocsSource.pageTree)} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
};

export default FumadocsLayout;
