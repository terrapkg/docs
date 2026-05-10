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
        {
          icon: "blueSky",
          label: "Bluesky",
          href: "https://bsky.app/profile/terrapkg.bsky.social",
        },
        {
          // It's Misskey but Starlight doesn't currently have an icon for this.
          icon: "mastodon",
          label: "Fyra Labs Misskey",
          href: "https://fedi.fyralabs.com/@terra",
        },
        {
          icon: "twitter",
          label: "Twitter",
          href: "https://twitter.com/terra_repo",
        },
      ],
      sidebar: [
        {
          label: "Welcome",
          items: [{ label: "Introduction", slug: "index" }],
        },
        {
          label: "Reference",
          items: [{ autogenerate: { directory: "reference" } }],
        },
        {
          label: "General",
          items: [{ autogenerate: { directory: "general" } }],
        },
        {
          label: "Using Terra",
          items: [{ autogenerate: { directory: "usage" } }],
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
            // @ts-expect-error TypeScript wants you use JSON.parse(), despite this working perfectly fine.
            { ...RPMSpec, aliases: ["rpmspec"] },
            // @ts-expect-error TypeScript wants you use JSON.parse(), despite this working perfectly fine.
            { ...rhai, aliases: ["rhai"] },
          ],
          // By default Shiki uses Oniguruma with WASM in Expressive Code, Cloudflare does not support this.
          engine: "javascript",
        },
      },
    }),
    sitemap(),
    icon(),
    react(),
    mdx(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare({
    imageService: "compile",
  }),
});
