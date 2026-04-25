// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import mermaid from "astro-mermaid";
import tailwindcss from "@tailwindcss/vite";
import RPMSpec from "./components/spec.json";
import rhai from "./components/rhai.json";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.terrapkg.com",

  integrations: [
    mermaid(),
    starlight({
      title: "Terra Documentation",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/terrapkg",
        },
      ],
      sidebar: [
        {
          label: "Welcome",
          items: [
            { label: "Introduction", slug: "index" }
          ],
          label: "General",
          items: [
            { label: "Infrastructure", slug: "misc/infrastructure" }
          ],
          label: "Using Terra",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Install Terra", slug: "usage/installing" },
            { label: "Lifecycle", slug: "usage/lifecycle" }
          ],
          label: "Contributing",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Contributing", slug: "contributing/contributing" },
            { label: "Policies", slug: "contributing/policies" },
            { label: "Guidelines", slug: "contributing/guidelines" },
            { label: "AppStream Guidelines", slug: "contributing/appstream" }
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
    sitemap(),
    expressiveCode(),
    icon(),
    react(),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        langs: [
          { ...RPMSpec, aliases: ["rpmspec"] },
          { ...rhai, aliases: ["rhai"] },
        ],
      },
    }),
  ],


  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});
