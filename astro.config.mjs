// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
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
      expressiveCode: {
        themes: ["github-dark"],
        shiki: {
          langs: [
            { ...RPMSpec, aliases: ["rpmspec"] },
            { ...rhai, aliases: ["rhai"] },
          ],
          // Shiki desfults to using Oniguruma with WASM in expressive code, but Cloudflare doesn't support this.
          engine: "javascript",
        },
      },
    }),
    sitemap(),
    icon(),
    react(),
    mdx({
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
