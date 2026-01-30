# Repository Guidelines

## Project Structure & Module Organization
- `vscode-openspg-schema/` houses the VS Code extension: source in `src/`, grammars in `syntaxes/`, configs in `*.configuration.json`, and assets in `resources/`.
- `openspg-*-language-server/` contains LSP servers: server code in `server/src/`, client harnesses in `client/src/`, and fixtures in `client/testFixture/`.
- `openspg-*-antlr4/` holds ANTLR tooling: grammars in `grammar/`, runtime code in `src/`, and tests in `test/`.
- `intersystems/` is vendored third-party code; avoid edits unless required.

## Build, Test, and Development Commands
Run commands from the relevant package directory.
- `npm run compile` (`vscode-openspg-schema/`): build TypeScript for the extension.
- `npm run build:cli` (`vscode-openspg-schema/`): build CLI artifacts via `tsup`.
- `npm run package` (`vscode-openspg-schema/`): build VSIX with `vsce`.
- `npm test` (`vscode-openspg-schema/`): run VS Code extension tests.
- `npm run build` (`openspg-*-language-server/`): build language server via `unbuild`.
- `npm test` (`openspg-*-language-server/`): run E2E tests via `scripts/e2e.sh`.
- `npm run build` (`openspg-*-antlr4/`): build ANTLR package via `unbuild`.
- `npm test` (`openspg-*-antlr4/`): run Vitest suites.
- `npm run grammar` (`openspg-*-antlr4/`): regenerate ANTLR outputs.

## Coding Style & Naming Conventions
- TypeScript is the primary language.
- JSON/config files use 4-space indentation.
- Follow existing quote/formatting style; use Prettier/ESLint where provided (ANTLR packages include scripts).
- Naming is descriptive and domain-specific (e.g., `schema-server.ts`, `concept-rule-server.ts`, `*.schema`, `*.rule`).

## Testing Guidelines
- ANTLR packages use Vitest with tests in `test/*.test.ts` and snapshots in `test/__snapshots__/`.
- Language-server clients use mocha-based tests under `client/src/test/` with fixtures in `client/testFixture/`.
- Extension tests live in `vscode-openspg-schema/test/` with `.schema`/`.rule` fixtures.

## Commit & Pull Request Guidelines
- Commit messages are short and imperative; include a package scope when helpful (e.g., `schema-lsp: fix hover`).
- PRs should describe changes, link issues when applicable, and include manual test steps.
- Provide screenshots or GIFs for UI/grammar changes affecting VS Code behavior.

## Generated Assets & Grammar Updates
- If ANTLR grammars change, run `npm run grammar` in the relevant `openspg-*-antlr4/` package and commit regenerated outputs.
