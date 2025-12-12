import {SemanticTokenModifiers, SemanticTokenTypes, TextDocumentSyncKind} from 'vscode-languageserver';
import {Context, OnInitialize} from '../context';


export const onInitialize = ({connection}: Context): OnInitialize => async ({initializationOptions}) => {
    connection.console.log(`initializing with options: ${initializationOptions!!}`,);

    return {
        serverInfo: {
            name: 'OpenSPG Schema Language Server',
        },
        capabilities: {
            textDocumentSync: {
                save: true,
                openClose: true,
                change: TextDocumentSyncKind.Full,
                willSave: false,
                willSaveWaitUntil: false,
            },
            // Tell the client that this server supports code completion.
            // completionProvider: {
            //   triggerCharacters: ['.', '"', `'`, '*', ' '],
            // },
            signatureHelpProvider: {
                triggerCharacters: ['(', ','],
            },
            documentSymbolProvider: true,
            semanticTokensProvider: {
                legend: {
                    tokenTypes: Object.values(SemanticTokenTypes),
                    tokenModifiers: Object.values(SemanticTokenModifiers),
                },
                range: false,
                full: true,
            },
            // typeDefinitionProvider: true,
            definitionProvider: true,
            referencesProvider: true,
            hoverProvider: true,
            // documentLinkProvider: {
            //     resolveProvider: false
            // },
            // codeLensProvider: {
            //   resolveProvider: false,
            //   workDoneProgress: false,
            // },
            // implementationProvider: true,
            // renameProvider: true,
            // codeActionProvider: true,
            documentFormattingProvider: true,
        },
    } as ReturnType<OnInitialize>
}
