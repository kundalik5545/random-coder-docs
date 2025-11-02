import {
    automationSource,
    getAutomationPageImage,
} from "@/lib/source";
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

export default async function Page(
    props: PageProps<"/automation/[[...slug]]">
) {
    const params = await props.params;
    const page = automationSource.getPage(params.slug);
    if (!page) return notFound();
    const MDX = page.data.body;

    return (
        <DocsPage toc={page.data.toc} full={page.data.full}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription>{page.data.description}</DocsDescription>
            <DocsBody>
                <MDX
                    components={getMDXComponents({
                        a: createRelativeLink(automationSource, page),
                    })}
                />
            </DocsBody>
        </DocsPage>
    );
}

export async function generateStaticParams() {
    return automationSource.generateParams();
}

export async function generateMetadata(
    props: PageProps<"/automation/[[...slug]]">
): Promise<Metadata> {
    const params = await props.params;
    const page = automationSource.getPage(params.slug);
    if (!page) return notFound();

    return {
        title: page.data.title,
        description: page.data.description,
        openGraph: {
            images: getAutomationPageImage(page).url,
        },
    };
}

