import { SemanticTokenModifiers, SemanticTokenTypes, TextDocumentSyncKind } from 'vscode-languageserver';
import { Context, OnInitialize } from '../context';

export const onInitialize =
    (_: Context): OnInitialize =>
    async () => {
        return {
            serverInfo: {
                name: 'OpenSPG Concept Rule Language Server'
            },
            capabilities: {
                textDocumentSync: {
                    save: true,
                    openClose: true,
                    change: TextDocumentSyncKind.Incremental,
                    willSave: false,
                    willSaveWaitUntil: false
                },
                // Tell the client that this server supports code completion.
                // completionProvider: {
                //   triggerCharacters: ['.', '"', `'`, '*', ' '],
                // },
                signatureHelpProvider: {
                    triggerCharacters: ['(', ',']
                },
                documentSymbolProvider: true,
                semanticTokensProvider: {
                    legend: {
                        tokenTypes: Object.values(SemanticTokenTypes),
                        tokenModifiers: Object.values(SemanticTokenModifiers)
                    },
                    range: false,
                    full: true
                },
                diagnosticProvider: {
                    interFileDependencies: true,
                    workspaceDiagnostics: false
                },
                // typeDefinitionProvider: true,
                // definitionProvider: true,
                // referencesProvider: true,
                // hoverProvider: true,
                foldingRangeProvider: true,
                documentLinkProvider: {
                    resolveProvider: true
                },
                // codeLensProvider: {
                //   resolveProvider: false,
                //   workDoneProgress: false,
                // },
                // implementationProvider: true,
                // renameProvider: true,
                // codeActionProvider: true,
                documentFormattingProvider: true
            }
        } as ReturnType<OnInitialize>;
    };
