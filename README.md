[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)[![License: GPL-3.0-or-later](https://img.shields.io/badge/License-GPL3.0-blue.svg)](https://choosealicense.com/licenses/gpl-3.0)

# The Terra Docs

This repository hosts the files for the documentation found on https://docs.terrapkg.com for the Terra repository.

From Fedoraland with love.

## Contributing

Steps to contributing or building the site found below.

### Dependencies

To start, you will need [PNPM](https://pnpm.io/). Install it via any means of your choosing.

### Building

Below are some commands to either build the site to test your changes or to help you out.

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts a local dev server at `localhost:4321`    |
| `pnpm run build`           | Build the production site to `./dist/`           |
| `pnpm run preview`         | Preview your build locally                       |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |

### Translation

<!-- TODO: Make a docs contributor guide page. -->

The Terra docs use [Lunaria](https://lunaria.dev) to help with translation. If you would like to help translate them into your language, please do!

First, add your desired translation language to `lunaria.config.json` inside of `"locales": []`. The format is as follows:

```json
"locales": [
  {
    "label": "Language",
    "lang": "lang"
  },
  {
    "label": "Language With Dialect",
    "lang": "lang-co"
  },
]
```

<!-- TODO: Host a key for this ourselves in the contributor guide page. -->

Please see [this page](https://www.andiamo.co.uk/resources/iso-language-codes) for the format of the short form aliases, which are a combination of the ISO 639 language codes and the ISO 3166 country codes.

Then, add your locale to the `locales` config in `astro.config.mjs` like this:

```js
locales: {
  lang: {
    label: "Language",
    lang: "lang",
  },
},
```

Afterwards, add a `lang.json` file to `src/content/i18n`. You can then customize the translated UI strings (recommended) following [this guide](https://starlight.astro.build/guides/i18n/#translate-starlights-ui). If you want to opt out of translating UI strings and use the fallback strings, simply use `{}` as the contents of the file.

Finally, add a translation for the page title to `astro.config.mjs`. The format is as follows:

```js
{
  label: "Page",
  translations: {
    lang: "Translated Title",
  }
}
```

The path translated pages must go in is `src/content/docs/<language>/<path>` with `<language>` being the shorthand of the language and `<path>` being the original path of the file. For example, the file `src/content/docs/reference/faq.mdx` translated into German would have to go into `src/content/docs/de/reference/faq.mdx`.

## Reference

To learn more about the tools this site is built on, check out the below:

- [Starlight documentation](https://starlight.astro.build/getting-started)
- [Astro documentation](https://docs.astro.build)
- [Astro Discord server](https://astro.build/chat)
- [Lunaria documentation](https://lunaria.dev/getting-started)
