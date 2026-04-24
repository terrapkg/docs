[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)[![License: GPL-3.0-or-later](https://img.shields.io/badge/License-GPL3.0-blue.svg)](https://choosealicense.com/licenses/gpl-3.0)

# The Terra Docs
This repository hosts the files for the documentation found on https://docs.terrapkg.com for the Terra repository.

From Fedoraland with love.

## Contributing
Steps to contributing or building the site found below.

### Dependencies
To start, you will need [Bun](https://bun.com). Install it via any means of your choosing, and luckily, it's in Terra!

### Building
Below are some commands to either build the site to test your changes or to help you out.

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun ci`                  | Installs dependencies                            |
| `bun run dev`             | Starts a local dev server at `localhost:4321`    |
| `bun run build`           | Build the production site to `./dist/`           |
| `bun run preview`         | Preview your build locally                       |
| `bun run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun run astro -- --help` | Get help using the Astro CLI                     |

To learn more about Starlight and Astro, check out the below:

- [Starlight documentation](https://starlight.astro.build)
- [Astro documentation](https://docs.astro.build)
- [Astro Discord server](https://astro.build/chat)
