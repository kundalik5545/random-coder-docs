import { fumadocsSource, getFumadocsPageImage } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { createRelativeLink } from "fumadocs-ui/mdx";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page(props: PageProps<"/fumadocs/[[...slug]]">) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in?callbackUrl=/fumadocs");
  }

  const params = await props.params;
  const page = fumadocsSource.getPage(params.slug);
  if (!page) return notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(fumadocsSource, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return fumadocsSource.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/fumadocs/[[...slug]]">
): Promise<Metadata> {
  const params = await props.params;
  const page = fumadocsSource.getPage(params.slug);
  if (!page) return notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getFumadocsPageImage(page).url,
    },
  };
}
