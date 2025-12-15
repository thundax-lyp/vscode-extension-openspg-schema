import * as path from "path";
import * as vscode from "vscode";

import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind
} from 'vscode-languageclient/node';
import {SchemaDocumentHighlightProvider} from "./client/highlight";


let client: LanguageClient;

export const activate = (context: vscode.ExtensionContext) => {
    initLanguageClient(context)

    context.subscriptions.push(
        vscode.languages.registerDocumentHighlightProvider('schema', new SchemaDocumentHighlightProvider())
    );

}


export const deactivate = (): Thenable<void> | undefined => {
    if (!client) {
        return undefined;
    }
    return client.stop();
}

const initLanguageClient = (context: vscode.ExtensionContext) => {
    const serverModule = path.join(__dirname, 'server.js');
    console.log(serverModule);

    console.log('-'.repeat(20) + 'extensionPath: ' + context.extensionPath)

    // vscode.languages.getLanguages().then(langs => {
    //     console.log('='.repeat(20) + 'support languages:')
    //     langs.forEach(x => {
    //         console.log(x)
    //     })
    //     console.log('-'.repeat(40))
    // })

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
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

    // Options to control the language client
    const clientOptions: LanguageClientOptions = {
        documentSelector: [
            {language: 'schema', scheme: 'file'},
            {language: 'schema', scheme: 'untitled'}
        ],
        synchronize: {
            fileEvents: vscode.workspace.createFileSystemWatcher('**/*.schema')
        },
        initializationOptions: context.extensionPath,
        // outputChannel: new MyOutputChannel(),
    };

    // Create the language client and start the client.
    client = new LanguageClient(
        'schemaLanguageServer',
        'OpenSPG Schema Language Server',
        serverOptions,
        clientOptions
    );

    client.start().then(() => {
        console.log('Server started');
    })
}
