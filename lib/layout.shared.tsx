import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import {
  Book,
  BookIcon,
  Zap,
  Monitor,
  Server,
  Database,
  Gauge,
  Brain,
  ListTodo,
  Notebook,
} from "lucide-react";
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
        <span className="flex items-center space-x-2 group text-2xl font-bold hover:no-underline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-blocks-icon lucide-blocks transition-colors group-hover:text-primary"
          >
            <path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2" />
            <rect x="14" y="2" width="8" height="8" rx="1" />
          </svg>
          <span>Random Coders</span>
        </span>
      ),
    },
    links: [
      {
        icon: <BookIcon />,
        text: "Docs",
        url: "/docs",
        active: "nested-url",
      },
      {
        icon: <BookIcon />,
        text: "Blog",
        url: "/blog",
        active: "nested-url",
      },
      {
        icon: <ListTodo />,
        text: "Updates",
        url: "/updates/todo-items",
        active: "nested-url",
      },
      {
        icon: <Zap />,
        text: "Automation",
        url: "/automation",
        active: "nested-url",
      },
      {
        icon: <Monitor />,
        text: "Frontend",
        url: "/frontend",
        active: "nested-url",
      },
      {
        icon: <Server />,
        text: "Backend",
        url: "/backend",
        active: "nested-url",
      },
      {
        icon: <Database />,
        text: "SQL",
        url: "/sql",
        active: "nested-url",
      },
      {
        icon: <Gauge />,
        text: "Performance",
        url: "/performance",
        active: "nested-url",
      },
      {
        icon: <Brain />,
        text: "AI/ML",
        url: "/ai-ml",
        active: "nested-url",
      },
    ],
    githubUrl: "https://github.com/kundalik5545/random-coder-docs",
  };
}
