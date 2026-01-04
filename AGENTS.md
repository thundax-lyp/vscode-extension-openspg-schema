# Repository Guidelines

## Project Structure & Module Organization
This repository is a multi-package workspace for the OpenSPG Schema VS Code extension and its language tooling.

- `vscode-openspg-schema/`: VS Code extension (`src/`), TextMate grammars (`syntaxes/`), configurations (`*.configuration.json`), assets (`resources/`).
- `openspg-schema-language-server/` and `openspg-concept-rule-language-server/`: LSP servers with server code in `server/src/`, client harnesses in `client/src/`, fixtures in `client/testFixture/`.
- `openspg-schema-antlr4/` and `openspg-concept-rule-antlr4/`: ANTLR grammars in `grammar/`, runtime code in `src/`, tests in `test/`.
- `intersystems/`: vendored third-party projects; avoid edits unless necessary.

## Build, Test, and Development Commands
Run commands from the relevant package directory.

- `npm run compile` (in `vscode-openspg-schema/`): TypeScript build.
- `npm run package` (in `vscode-openspg-schema/`): Build VSIX via `vsce`.
- `npm test` (in `vscode-openspg-schema/`): VS Code extension tests.
- `npm run build` (in `openspg-*-language-server/`): Build via `unbuild`.
- `npm test` (in `openspg-*-language-server/`): E2E via `scripts/e2e.sh`.
- `npm run build` (in `openspg-*-antlr4/`): Build via `unbuild`.
- `npm test` (in `openspg-*-antlr4/`): Vitest suite.
- `npm run grammar` (in `openspg-*-antlr4/`): Regenerate ANTLR outputs.

## Coding Style & Naming Conventions
- TypeScript is primary; JSON/config files use 4-space indentation.
- Follow existing file quote style and formatting; use Prettier where provided (ANTLR4 packages include Prettier/ESLint scripts).
- Naming is descriptive and domain-specific (e.g., `schema-server.ts`, `concept-rule-server.ts`, `*.schema`, `*.rule`).

## Testing Guidelines
- ANTLR4 packages use Vitest: `test/*.test.ts` and snapshots in `test/__snapshots__/`.
- Language-server clients use mocha tests in `client/src/test/` with fixtures in `client/testFixture/`.
- Extension tests live under `vscode-openspg-schema/test/` with `.schema`/`.rule` fixtures.

## Commit & Pull Request Guidelines
- Commit messages are short and imperative; include package scope when helpful (e.g., `schema-lsp: fix hover`).
- PRs should describe changes, link issues when applicable, and include manual test steps. Provide screenshots/GIFs for UI or grammar changes affecting VS Code behavior.

## Dependency Notes
- `vscode-openspg-schema/package.json` uses local `.tgz` dependencies; rebuild/update them when changing language servers or ANTLR packages.
