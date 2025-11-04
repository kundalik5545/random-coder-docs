import { baseOptions } from "@/lib/layout.shared";
import { fumadocsSource, filterIndexPages } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { UserDropdown } from "@/components/user-dropdown";

const FumadocsLayout = ({ children }: LayoutProps<"/fumadocs">) => {
  return (
    <DocsLayout tree={filterIndexPages(fumadocsSource.pageTree)} {...baseOptions()} sidebar={{
      footer: <UserDropdown dropdownPosition="right" />,
    }}>
      {children}
    </DocsLayout>
  );
};

export default FumadocsLayout;
