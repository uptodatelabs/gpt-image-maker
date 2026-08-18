# gpt-image-maker

AI image generator web app powered by **Puter.js + OpenAI GPT Image**.
Runs locally with a single command — **zero npm dependencies**.

Puter.js does not work over the `file://` protocol (it throws `Unsupported Protocol` for security reasons).
This package solves that by serving the app over HTTP and opening your browser automatically.

## Quick start

Requires Node.js 18+.

```bash
# Run directly — no install needed
npx gpt-image-maker
```

Or install globally:

```bash
npm install -g gpt-image-maker
gpt-image-maker
```

Your browser opens automatically at `http://127.0.0.1:3000/`.

## CLI options

```
Usage:
  gpt-image-maker [options]

Options:
  -p, --port <n>     Port to listen on (default: 3000)
  -h, --host <addr>  Host to bind (default: 127.0.0.1)
      --no-open      Do not open the browser automatically
      --help         Show this help
```

Example:

```bash
npx gpt-image-maker --port 8080 --no-open
```

## Features

- Text-to-image generation (GPT Image 1 / 1.5 / 2 / 1 Mini)
- Image-to-image editing with reference images (up to 10, drag & drop)
- Quality and aspect-ratio presets
- Test mode (no credits consumed)
- Download / save to Puter / reuse result as reference
- Remaining credit display in the header (signs in first if needed, auto-refreshes after each generation)
- Local history (session only)
- Single-instance guard: starting a second instance is blocked and points you to the running one

## For developers

```bash
npm install       # no-op: zero runtime dependencies
npm start         # same as running the CLI
npm pack --dry-run # preview the published tarball
```

```
├── bin/gpt-image-maker.js   # CLI entry
├── src/server.js            # zero-dependency static HTTP server
├── src/open-browser.js      # cross-platform browser opener
└── public/index.html        # the web app (Puter.js + GPT Image)
```

## Publish to npm

```bash
npm login
npm publish
```

## License

MIT — see [LICENSE](LICENSE).