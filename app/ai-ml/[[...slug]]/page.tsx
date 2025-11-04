import { aiMlSource, getAiMlPageImage } from "@/lib/source";
import {
    DocsBody,
    DocsDescription,
    DocsPage,
    DocsTitle,
} from "fumadocs-ui/page";
import { notFound, redirect } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page(props: PageProps<"/ai-ml/[[...slug]]">) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in?callbackUrl=/ai-ml");
    }

    const params = await props.params;
    const page = aiMlSource.getPage(params.slug);
    if (!page) return notFound();
    const MDX = page.data.body;

    return (
        <DocsPage toc={page.data.toc} full={page.data.full}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription>{page.data.description}</DocsDescription>
            <DocsBody>
                <MDX
                    components={getMDXComponents({
                        a: createRelativeLink(aiMlSource, page),
                    })}
                />
            </DocsBody>
        </DocsPage>
    );
}

export async function generateStaticParams() {
    return aiMlSource.generateParams();
}

export async function generateMetadata(
    props: PageProps<"/ai-ml/[[...slug]]">
): Promise<Metadata> {
    const params = await props.params;
    const page = aiMlSource.getPage(params.slug);
    if (!page) return notFound();

    return {
        title: page.data.title,
        description: page.data.description,
        openGraph: {
            images: getAiMlPageImage(page).url,
        },
    };
}

