import * as path from 'path';
import * as vscode from 'vscode';

import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind
} from 'vscode-languageclient/node';

class MyOutputChannel implements vscode.OutputChannel {
    name = 'Extension';

    constructor(name: string = 'Extension') {
        this.name = name;
    }

    append(value: string): void {
        console.log(`${this.name}: ${value}`);
    }

    appendLine(value: string): void {
        console.log(`${this.name}: ${value}`);
    }

    replace(value: string): void {
        console.log(`${this.name}: ${value}`);
    }

    clear(): void {
        console.log(`\n`.repeat(10));
    }

    show(column?: unknown, preserveFocus?: unknown): void {
        console.log('MyOutputChannel.show(column, preserveFocus);');
    }

    hide(): void {
        console.log('MyOutputChannel.hide();');
    }

    dispose(): void {
        console.log('MyOutputChannel.dispose();');
    }
}

let client: LanguageClient;

export const activate = (context: vscode.ExtensionContext) => {
    // The server is implemented in node
    const serverModule = context.asAbsolutePath(
        path.join('server', 'dist', 'server.js')
    );

    // vscode.languages.getLanguages().then(langs => {
    //     console.log('='.repeat(60))
    //     langs.forEach(x => {
    //         console.log(x)
    //     })
    //     console.log('-'.repeat(60))
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
        // Register the server for plain text documents
        documentSelector: [{
            language: 'conceptRule', scheme: 'file',
        }, {
            language: 'conceptRule', scheme: 'untitled'
        }],
        synchronize: {
            fileEvents: vscode.workspace.createFileSystemWatcher('**/*.rule')
        },
        initializationOptions: context.extensionPath,
        outputChannel: new MyOutputChannel(),
    };


    // Create the language client and start the client.
    client = new LanguageClient(
        'conceptRuleLanguageServer',
        'OpenSPG Concept Rule Language Server',
        serverOptions,
        clientOptions
    );

    // Start the client. This will also launch the server
    client.start().then(() => {
        console.log('Server started');
    })
}


export const deactivate = (): Thenable<void> | undefined => {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
