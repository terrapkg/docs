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
          label: "Navigation",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Index", slug: "index" },
            { label: "FAQ", slug: "faq" },
            { label: "Installing", slug: "installing" }
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
