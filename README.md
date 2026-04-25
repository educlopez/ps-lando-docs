# ps-lando-docs

Documentation site for [`ps-lando`](https://github.com/educlopez/ps-lando) — the CLI for spinning up PrestaShop + Panda + Easy Builder sandboxes locally.

Live: _coming soon_

## Stack

- [Fumadocs](https://fumadocs.dev) on Next.js 16 (App Router)
- Tailwind CSS v4
- MDX for content
- Auto-generated `llms.txt` for LLM crawlers

## Develop

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

## Build

```bash
pnpm build
pnpm start
```

## Content layout

```
content/docs/
├── index.mdx                    # /docs landing
├── getting-started/             # quickstart, install, etc.
├── guides/                      # task-oriented walkthroughs
├── reference/                   # commands, flags, recipes catalog
└── kb/                          # technical knowledge base (schema drift, races, etc.)
```

Each section has a `meta.json` controlling sidebar order.

## Branding

- Wordmark: `ps-lando` in JetBrains Mono.
- Accent: warm orange (Panda-tinted).
- Default theme: dark mode, terminal-friendly.

## Contributing

PRs welcome — for now mostly content fixes. Open an issue if something is wrong or missing.

## License

MIT.
