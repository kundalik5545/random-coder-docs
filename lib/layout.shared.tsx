import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Book, BookIcon } from "lucide-react";
import Link from "next/link";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 * Blog Layout: app/blog/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-blocks-icon lucide-blocks"
          >
            <path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2" />
            <rect x="14" y="2" width="8" height="8" rx="1" />
          </svg>
          <Link href={"/"}>Random Coders</Link>
        </>
      ),
    },
    links: [
      {
        icon: <BookIcon />,
        text: "Blog",
        url: "/blog",
        active: "nested-url",
      },
      {
        icon: <Book />,
        text: "FumaDocs",
        url: "/fumadocs",
        active: "nested-url",
      },
    ],
    githubUrl: "https://github.com/kundalik5545/random-coder-docs",
  };
}
