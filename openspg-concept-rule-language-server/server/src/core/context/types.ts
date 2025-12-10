import type {Connection} from 'vscode-languageserver';
import type {Context} from './context';

export type OnDefinition = (ctx: Context) => Parameters<Connection['onDefinition']>[0];
export type OnTypeDefinition = (ctx: Context) => Parameters<Connection['onTypeDefinition']>[0];
export type OnReferences = (ctx: Context) => Parameters<Connection['onReferences']>[0];
export type OnDocumentLinks = (ctx: Context) => Parameters<Connection['onDocumentLinks']>[0];
export type OnDocumentLinkResolve = (ctx: Context) => Parameters<Connection['onDocumentLinkResolve']>[0];
export type OnHover = (ctx: Context) => Parameters<Connection['onHover']>[0];

export type OnDocumentHighlight = (ctx: Context) => Parameters<Connection['onDocumentHighlight']>[0];

export type OnSignatureHelp = (ctx: Context) => Parameters<Connection['onSignatureHelp']>[0];
export type OnImplementation = (ctx: Context) => Parameters<Connection['onImplementation']>[0];
export type OnDocumentSymbol = (ctx: Context) => Parameters<Connection['onDocumentSymbol']>[0];

export type OnDocumentFormatting = (ctx: Context) => Parameters<Connection['onDocumentFormatting']>[0];
export type OnDocumentOnTypeFormatting = (ctx: Context) => Parameters<Connection['onDocumentOnTypeFormatting']>[0];
export type OnDocumentRangeFormatting = (ctx: Context) => Parameters<Connection['onDocumentRangeFormatting']>[0];

export type OnSemanticTokens = Parameters<Connection['languages']['semanticTokens']['on']>[0]

export type OnInitialize = Parameters<Connection['onInitialize']>[0];
export type OnInitialized = Parameters<Connection['onInitialized']>[0];
export type OnExit = Parameters<Connection['onExit']>[0];
