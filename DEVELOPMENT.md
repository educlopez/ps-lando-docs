# Development notes

Internal notes for working on the `ps-lando-docs` site itself (the published
docs live in `content/docs/`).

## Stack

- Next.js 15 + Fumadocs UI
- Tailwind CSS
- Bilingual content (`*.mdx` for English, `*.es.mdx` for Spanish) under
  `content/docs/`. Locale meta files: `meta.json` (EN), `meta.es.json` (ES).
- Marketing strings live in `lib/i18n/dict.ts`.

## Local commands

```bash
pnpm install
pnpm dev          # Next.js dev server
pnpm typecheck    # tsc --noEmit
pnpm build        # production build
```

## Branching

- `main` is auto-deployed to Vercel.
- Feature branches stay local until reviewed; push only when ready to merge.

## Deferred TODOs

### Cross-repo flag-table cross-check workflow

> **Status: deferred (decided at v1.0.0-rc.1).**
>
> The original SDD proposal for `pslando-zero-config` (PR7-T9) called for a
> GitHub Actions workflow that pulls the latest `ps-lando` tarball from npm,
> runs `ps-lando --help --log-format=json`, parses `content/docs/reference/flags.mdx`
> (and the `.es.mdx` mirror), and asserts the flag tables stay in sync. A
> failing diff would block PR merges.
>
> The decision at the v1.0.0-rc.1 cut was to defer this until at least v1.1.
> Reasons:
>
> 1. The flag surface is in flux during the v1.0 RC window — pinning a
>    cross-check now would generate noise as flags shift.
> 2. The `ps-lando` repo's own CI (vitest suite) already exercises the
>    `REMOVED_FLAGS` table verbatim and the exit-code map, which gives us the
>    other half of the contract from the CLI side.
> 3. Bilingual MDX parsing for the cross-check would need a tiny purpose-built
>    extractor (the EN / ES files diverge on column headers; only the flag
>    name + type + default columns need to match).
>
> When we revisit this, the rough sketch is:
>
> ```yaml
> # .github/workflows/docs-cross-check.yml (NOT YET WRITTEN)
> name: docs cross-check
> on: [pull_request]
> jobs:
>   flags:
>     runs-on: ubuntu-latest
>     steps:
>       - uses: actions/checkout@v4
>       - uses: actions/setup-node@v4
>         with: { node-version: 20 }
>       - run: npx ps-lando@latest --help --log-format=json > /tmp/help.json
>       - run: node scripts/cross-check-flags.mjs /tmp/help.json content/docs/reference/flags.mdx
>       - run: node scripts/cross-check-flags.mjs /tmp/help.json content/docs/reference/flags.es.mdx --locale=es
> ```
>
> Until that ships, the docs author flow is:
>
> 1. After every CLI release, manually diff `pnpm dlx ps-lando --help` against
>    `content/docs/reference/flags.mdx`.
> 2. Open an issue if anything drifts.
