import * as path from "path";
import * as vscode from "vscode";

import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind
} from 'vscode-languageclient/node';

import {SchemaPreviewPanel} from "./client/preview/schema-preview";

let schemaClient: LanguageClient;
let conceptRuleClient: LanguageClient;

export const activate = (context: vscode.ExtensionContext) => {
    schemaClient = initSchemaLanguageClient(context);
    conceptRuleClient = initConceptRuleLanguageClient(context);

    context.subscriptions.push(vscode.commands.registerCommand("openspg.schema.preview", () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.document.languageId !== "schema") {
            vscode.window.showWarningMessage("Open a .schema file to preview.");
            return;
        }

        SchemaPreviewPanel.show(editor.document, context.extensionUri, vscode.ViewColumn.Beside);
    }));
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

const initSchemaLanguageClient = (context: vscode.ExtensionContext) => {
    const serverModule = path.join(__dirname, 'server', 'schema-server.js');

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
    const serverModule = path.join(__dirname, 'server', 'concept-rule-server.js');
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
            fileEvents: [
                vscode.workspace.createFileSystemWatcher('**/*.rule'),
            ]
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

export const getSchemaClient = () => {
    return schemaClient;
}

export const getConceptRuleClient = () => {
    return conceptRuleClient;
}
