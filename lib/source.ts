import {
  docs,
  blogCollection,
  fumadocsCollection,
  automationCollection,
  frontendCollection,
  backendCollection,
  sqlCollection,
  performanceCollection,
  aiMlCollection,
} from "@/.source";
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

// ---------------------------------------------------------------------//
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

// ---------------------------------------------------------------------//
// Fumadocs collection
export const fumadocsSource = loader({
  baseUrl: "/fumadocs",
  source: fumadocsCollection.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getFumadocsPageImage(
  page: InferPageType<typeof fumadocsSource>
) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `/og/fumadocs/${segments.join("/")}`,
  };
}

export async function getFumadocsLLMText(
  page: InferPageType<typeof fumadocsSource>
) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}

// ---------------------------------------------------------------------//
// Automation collection
export const automationSource = loader({
  baseUrl: "/automation",
  source: automationCollection.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getAutomationPageImage(
  page: InferPageType<typeof automationSource>
) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `/og/automation/${segments.join("/")}`,
  };
}

export async function getAutomationLLMText(
  page: InferPageType<typeof automationSource>
) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}

// ---------------------------------------------------------------------//
// Frontend collection
export const frontendSource = loader({
  baseUrl: "/frontend",
  source: frontendCollection.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getFrontendPageImage(
  page: InferPageType<typeof frontendSource>
) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `/og/frontend/${segments.join("/")}`,
  };
}

export async function getFrontendLLMText(
  page: InferPageType<typeof frontendSource>
) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}

// ---------------------------------------------------------------------//
// Backend collection
export const backendSource = loader({
  baseUrl: "/backend",
  source: backendCollection.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getBackendPageImage(page: InferPageType<typeof backendSource>) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `/og/backend/${segments.join("/")}`,
  };
}

export async function getBackendLLMText(
  page: InferPageType<typeof backendSource>
) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}

// ---------------------------------------------------------------------//
// SQL collection
export const sqlSource = loader({
  baseUrl: "/sql",
  source: sqlCollection.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getSqlPageImage(page: InferPageType<typeof sqlSource>) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `/og/sql/${segments.join("/")}`,
  };
}

export async function getSqlLLMText(page: InferPageType<typeof sqlSource>) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}

// ---------------------------------------------------------------------//
// Performance collection
export const performanceSource = loader({
  baseUrl: "/performance",
  source: performanceCollection.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getPerformancePageImage(
  page: InferPageType<typeof performanceSource>
) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `/og/performance/${segments.join("/")}`,
  };
}

export async function getPerformanceLLMText(
  page: InferPageType<typeof performanceSource>
) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}

// ---------------------------------------------------------------------//
// AI/ML collection
export const aiMlSource = loader({
  baseUrl: "/ai-ml",
  source: aiMlCollection.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getAiMlPageImage(page: InferPageType<typeof aiMlSource>) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `/og/ai-ml/${segments.join("/")}`,
  };
}

export async function getAiMlLLMText(page: InferPageType<typeof aiMlSource>) {
  const processed = await page.data.getText("processed");

  return `# ${page.data.title} (${page.url})

${processed}`;
}

// ---------------------------------------------------------------------//
// Utility function to filter out index pages from pageTree
export function filterIndexPages(tree: any): any {
  if (!tree) return tree;

  // Handle Root type (has name and children)
  if (tree.children && Array.isArray(tree.children)) {
    return {
      ...tree,
      children: tree.children
        .filter((item: any) => {
          // Filter out index pages
          if (item.type === "page") {
            // Check if this is an index page by examining the URL
            const url = item.url || "";
            // Remove trailing slashes and split
            const pathParts = url.replace(/\/$/, "").split("/").filter(Boolean);
            const lastPart = pathParts[pathParts.length - 1];

            // Exclude if:
            // 1. Last part is "index"
            // 2. The name is "index" (common in Fumadocs)
            // 3. URL matches exactly the base path (index page)
            if (
              lastPart === "index" ||
              item.name === "index" ||
              (pathParts.length === 1 && item.type === "page")
            ) {
              return false;
            }
          }
          return true;
        })
        .map((item: any) => {
          // Recursively filter children
          if (item.children && Array.isArray(item.children)) {
            return {
              ...item,
              children: filterIndexPages({ children: item.children }).children,
            };
          }
          return item;
        }),
    };
  }

  return tree;
}

// ---------------------------------------------------------------------//
