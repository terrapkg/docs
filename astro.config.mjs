// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import astroExpressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import mermaid from "astro-mermaid";
import tailwindcss from "@tailwindcss/vite";
import RPMSpec from "./components/spec.json";
import rhai from "./components/rhai.json";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://docs.terrapkg.com",

  trailingSlash: "never",

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
        {
          icon: "discord",
          label: "Fyra Labs Discord",
          href: "https://fyralabs.com/discord",
        },
      ],
      sidebar: [
        {
          label: "Welcome",
          items: [{ label: "Introduction", slug: "index" }],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
        {
          label: "General",
          autogenerate: { directory: "general" },
        },
        {
          label: "Using Terra",
          autogenerate: { directory: "usage" },
        },
        {
          label: "Contributing",
          items: [
            { label: "Getting Started", slug: "contributing/contributing" },
            { label: "Policies", slug: "contributing/policies" },
            {
              label: "Guidelines",
              items: [
                { label: "General Guidelines", slug: "contributing/guidelines" },
                {
                  label: "Special Guidelines",
                  items: ["contributing/appstream"],
                },
              ],
            },
            { label: "Autoupdating Packages", slug: "contributing/autoupdate" },
            { label: "Custom RPM Macros", slug: "contributing/srpm" },
          ],
        },
      ],
      lastUpdated: true,
      editLink: {
        baseUrl: "https://github.com/terrapkg/docs",
      },
    }),
    sitemap(),
    // TODO: Starlight's expressiveCode settings are currently not applying
    astroExpressiveCode({
      themes: ["github-dark"],
      shiki: {
        langs: [
          { ...RPMSpec, aliases: ["rpmspec"] },
          { ...rhai, aliases: ["rhai"] },
        ],
        // By default Shiki uses Oniguruma with WASM in Expressive Code, Cloudflare does not support this.
        engine: "javascript",
      },
      frames: false,
    }),
    icon(),
    react(),
    mdx(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});
