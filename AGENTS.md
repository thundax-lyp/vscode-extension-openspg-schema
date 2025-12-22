# Repository Guidelines

## Project Structure & Module Organization
This repo is a multi-package workspace for the OpenSPG Schema VS Code extension and its language tooling.

- `vscode-openspg-schema/` — VS Code extension sources (`src/`), TextMate grammars (`syntaxes/`), configuration (`*.configuration.json`), and assets (`resources/`).
- `openspg-schema-language-server/` and `openspg-concept-rule-language-server/` — LSP servers. Server code lives in `server/src/`, client test harnesses in `client/src/` with fixtures in `client/testFixture/`.
- `openspg-schema-antlr4/` and `openspg-concept-rule-antlr4/` — ANTLR4 lexer/parser libs. Grammar files are in `grammar/`, runtime code in `src/`, tests in `test/`.
- `intersystems/` — vendored third‑party projects; generally avoid editing unless required.

## Build, Test, and Development Commands
Run commands from each package directory.

- `vscode-openspg-schema`: `npm run compile` (tsc build), `npm run package` (vsce package), `npm test` (vscode-test).
- `openspg-*-language-server`: `npm run build` (unbuild), `npm test` (e2e via `scripts/e2e.sh`).
- `openspg-*-antlr4`: `npm run build` (unbuild), `npm test` (vitest), `npm run grammar` (regenerate ANTLR output).

## Coding Style & Naming Conventions
- TypeScript is the primary language; JSON and config files use 4‑space indentation in this repo.
- Follow the existing file’s quote/formatting style; use Prettier where provided (ANTLR4 packages include Prettier/ESLint scripts).
- Naming is descriptive and domain‑specific (e.g., `schema-server.ts`, `concept-rule-server.ts`, `*.schema`, `*.rule`).

## Testing Guidelines
- ANTLR4 packages use Vitest with `test/*.test.ts` and snapshot files in `test/__snapshots__/`.
- Language-server clients have mocha-based VS Code tests in `client/src/test/` and fixtures in `client/testFixture/`.
- Extension tests live under `vscode-openspg-schema/test/` with fixture `.schema`/`.rule` files.

## Commit & Pull Request Guidelines
- Git history shows minimal conventions (“init”, version tags). Use short, imperative messages; include package scope when helpful (e.g., `schema-lsp: fix hover`).
- PRs should describe the change, include linked issues if any, and note manual test steps. Provide screenshots or GIFs for UI/grammar changes affecting VS Code behavior.

## Notes & Tips
- Local `.tgz` dependencies in `vscode-openspg-schema/package.json` point to packaged builds; update or rebuild them when changing language servers or ANTLR packages.
