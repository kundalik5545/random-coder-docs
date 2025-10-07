import { blogSource, getBlogPageImage, getPageImage } from "@/lib/source";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import NotFound from "@/app/(home)/not-found";

export default async function Page(props: PageProps<"/blog/[[...slug]]">) {
  const params = await props.params;
  const page = blogSource.getPage(params.slug);
  if (!page) return <NotFound />;

  console.log("page", page);

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(blogSource, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return blogSource.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/blog/[[...slug]]">
): Promise<Metadata> {
  const params = await props.params;
  const page = blogSource.getPage(params.slug);
  if (!page) return notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getBlogPageImage(page).url,
    },
  };
}
