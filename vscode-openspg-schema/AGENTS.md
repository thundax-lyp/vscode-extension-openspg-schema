# Repository Guidelines

## Project Structure & Module Organization
This guide only covers the `vscode-openspg-schema/` package.
- Source code: `vscode-openspg-schema/src/`
- Grammars: `vscode-openspg-schema/syntaxes/`
- Configs: `vscode-openspg-schema/*.configuration.json`
- Assets: `vscode-openspg-schema/resources/`
- Tests: `vscode-openspg-schema/test/`

## Build, Test, and Development Commands
Run commands from `vscode-openspg-schema/`.
- `npm run compile`: build TypeScript for the extension.
- `npm run build:cli`: build CLI artifacts via `tsup`.
- `npm run package`: build VSIX with `vsce`.
- `npm test`: run VS Code extension tests.

## Coding Style & Naming Conventions
- TypeScript is the primary language.
- JSON/config files use 4-space indentation.
- Follow existing quote/formatting style; use Prettier/ESLint if configured.
- Naming is descriptive and domain-specific (e.g., `schema-server.ts`, `*.schema`, `*.rule`).

## Testing Guidelines
- Extension tests live in `vscode-openspg-schema/test/` with `.schema`/`.rule` fixtures.
- Run with `npm test` from the package directory.

## Commit & Pull Request Guidelines
- Commit messages are short and imperative; include a package scope when helpful (e.g., `extension: fix hover`).
- PRs should describe changes, link issues when applicable, and include manual test steps.
- Provide screenshots or GIFs for UI/grammar changes affecting VS Code behavior.
