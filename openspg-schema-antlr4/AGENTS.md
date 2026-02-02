# Repository Guidelines

## Project Structure & Module Organization
- This is a multi-package workspace for the OpenSPG Schema VS Code extension and related language tooling.
- `vscode-openspg-schema/` contains the extension (`src/`), grammars (`syntaxes/`), configs (`*.configuration.json`), and assets (`resources/`).
- `openspg-*-language-server/` packages include LSP server code in `server/src/`, client harnesses in `client/src/`, and fixtures in `client/testFixture/`.
- `openspg-*-antlr4/` packages hold ANTLR grammars in `grammar/`, runtime code in `src/`, and tests in `test/`.
- `intersystems/` is vendored; avoid edits unless required.

## Build, Test, and Development Commands
Run commands from the relevant package directory:
- `npm run compile` (`vscode-openspg-schema/`): Build the extension TypeScript.
- `npm run build:cli` (`vscode-openspg-schema/`): Build CLI artifacts with `tsup`.
- `npm run package` (`vscode-openspg-schema/`): Build a VSIX with `vsce`.
- `npm test` (`vscode-openspg-schema/`): Run extension tests.
- `npm run build` (`openspg-*-language-server/`): Build LSP packages via `unbuild`.
- `npm test` (`openspg-*-language-server/`): Run E2E tests via `scripts/e2e.sh`.
- `npm run build` (`openspg-*-antlr4/`): Build ANTLR runtime via `unbuild`.
- `npm test` (`openspg-*-antlr4/`): Run Vitest suites.
- `npm run grammar` (`openspg-*-antlr4/`): Regenerate ANTLR outputs after grammar changes.

## Coding Style & Naming Conventions
- TypeScript is primary. JSON/config files use 4-space indentation.
- Follow existing quote/formatting style; use Prettier/ESLint where available.
- Use descriptive, domain-specific names (e.g., `schema-server.ts`, `concept-rule-server.ts`, `*.schema`, `*.rule`).

## Testing Guidelines
- ANTLR packages use Vitest with tests in `test/*.test.ts` and snapshots in `test/__snapshots__/`.
- Language-server clients use Mocha tests under `client/src/test/` with fixtures in `client/testFixture/`.
- Extension tests live in `vscode-openspg-schema/test/` with `.schema`/`.rule` fixtures.

## Commit & Pull Request Guidelines
- Use short, imperative commit messages; include a package scope when helpful (e.g., `schema-lsp: fix hover`).
- PRs should describe changes, link issues when applicable, and include manual test steps.
- Provide screenshots or GIFs for UI/grammar changes that affect VS Code behavior.

## Generated Assets & Grammar Updates
- If you modify ANTLR grammars, regenerate outputs with `npm run grammar` in the relevant `openspg-*-antlr4/` package and commit the regenerated code.
