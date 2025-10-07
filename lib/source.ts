import { docs, blogCollection } from "@/.source";
import { type InferPageType, loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { createMDXSource } from "fumadocs-mdx";

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

// Open Graph image generation example
// See https://fumadocs.dev/docs/headless/og for more info
export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `/og/docs/${segments.join("/")}`,
  };
}

// LLM text generation example
// See https://fumadocs.dev/docs/headless/llm for more info
export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}

// export const blog = loader({
//   baseUrl: "/blog",
//   source: createMDXSource(blogPost),
// });

export const blogSource = loader({
  baseUrl: "/blog",
  source: blogCollection.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getBlogPageImage(page: InferPageType<typeof blogSource>) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `/og/blog/${segments.join("/")}`,
  };
}

export async function getBlogLLMText(page: InferPageType<typeof blogSource>) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}
