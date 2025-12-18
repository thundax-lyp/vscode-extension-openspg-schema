import * as path from "path";
import * as vscode from "vscode";

import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind
} from 'vscode-languageclient/node';


let schemaClient: LanguageClient;
let conceptRuleClient: LanguageClient;

export const activate = (context: vscode.ExtensionContext) => {
    schemaClient = initLanguageClient(context);
    conceptRuleClient = initConceptRuleLanguageClient(context);
}


export const deactivate = (): Thenable<void> | undefined => {
    if (schemaClient) {
        schemaClient.stop()
    }
    if (conceptRuleClient) {
        conceptRuleClient.stop()
    }
    return undefined
}

const initLanguageClient = (context: vscode.ExtensionContext) => {
    const serverModule = path.join(__dirname, 'server.js');

    const serverOptions: ServerOptions = {
        run: {
            module: serverModule,
            transport: TransportKind.ipc,
        },
        debug: {
            module: serverModule,
            options: {
                execArgv: ['--nolazy', '--inspect=6009'],
            },
            transport: TransportKind.ipc,
        }
    };

    const virtualDocumentContents = new Map<string, string>();

    vscode.workspace.registerTextDocumentContentProvider('openspg-schema-embedded-content', {
        provideTextDocumentContent: (uri) => {
            const originalUri = uri.path.slice(1).slice(0, -5);
            const decodedUri = decodeURIComponent(originalUri);
            console.log('='.repeat(40) + 'provideTextDocumentContent');
            console.log(originalUri);
            console.log(decodedUri);
            return virtualDocumentContents.get(decodedUri);
        }
    })

    const clientOptions: LanguageClientOptions = {
        documentSelector: [
            {language: 'schema', scheme: 'file'},
            {language: 'schema', scheme: 'untitled'}
        ],
        synchronize: {
            fileEvents: vscode.workspace.createFileSystemWatcher('**/*.schema')
        },
        initializationOptions: context.extensionPath,
    };

    const client = new LanguageClient(
        'schemaLanguageServer',
        'OpenSPG Schema Language Server',
        serverOptions,
        clientOptions
    );

    client.start().then(() => {
        console.log('OpenSPG Schema Language Server started');
    })

    return client;
}

const initConceptRuleLanguageClient = (context: vscode.ExtensionContext) => {
    const serverModule = path.join(__dirname, 'concept-rule-server.js');
    const serverOptions: ServerOptions = {
        run: {
            module: serverModule,
            transport: TransportKind.ipc,
        },
        debug: {
            module: serverModule,
            options: {
                execArgv: ['--nolazy', '--inspect=6010'],
            },
            transport: TransportKind.ipc,
        }
    };

    const clientOptions: LanguageClientOptions = {
        documentSelector: [
            {language: 'conceptRule', scheme: 'file'},
            {language: 'conceptRule', scheme: 'untitled'}
        ],
        synchronize: {
            fileEvents: vscode.workspace.createFileSystemWatcher('**/*.rule')
        },
        initializationOptions: context.extensionPath,
    };

    const client = new LanguageClient(
        'conceptRuleLanguageServer',
        'OpenSPG Concept Rule Language Server',
        serverOptions,
        clientOptions
    );

    client.start().then(() => {
        console.log('OpenSPG Concept Rule Language Server started');
    })

    return client
}
