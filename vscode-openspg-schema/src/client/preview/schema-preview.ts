import * as vscode from 'vscode';
import { v4 as generateUuid } from 'uuid';
import * as syntax from 'openspg-schema-antlr4';
import { PreviewServer } from './preview-server';
import { getSchemaLanguageClient } from '../../extension';
import { KGEntity, KGNamespace, KGSchema, parseEntity, parseNamespace } from './kg';

const PREVIEW_VIEW_TYPE = 'openspg.schema.preview';

interface CachedSchema {
    namespace: CachedNamespace | undefined;
    entities: CachedEntity[];
}

interface CachedNamespace {
    start: number;
    content: string;
    meta: KGNamespace;
}

interface CachedEntity {
    start: number;
    content: string;
    meta: KGEntity;
}

const getTitle = (document: vscode.TextDocument) => {
    return `${vscode.workspace.asRelativePath(document.uri)} - Preview`;
};

export class SchemaPreviewPanel {
    private static currentPanel: SchemaPreviewPanel | undefined;
    private static previewServer: PreviewServer | undefined;

    private readonly panel: vscode.WebviewPanel;
    private document: vscode.TextDocument;
    private readonly previewServer: PreviewServer;
    private readonly extensionUri: vscode.Uri;
    private readonly disposables: vscode.Disposable[] = [];
    private isWebviewReady = false;

    private currentNamespace: CachedNamespace | undefined;
    private currentEntities: CachedEntity[] = [];

    static show(document: vscode.TextDocument, extensionUri: vscode.Uri, viewColumn?: vscode.ViewColumn) {
        const column = viewColumn ?? vscode.ViewColumn.Beside;

        if (!SchemaPreviewPanel.previewServer) {
            SchemaPreviewPanel.previewServer = new PreviewServer(extensionUri);
        }

        if (SchemaPreviewPanel.currentPanel) {
            SchemaPreviewPanel.currentPanel.panel.reveal(column);
            void SchemaPreviewPanel.currentPanel.initPanel();
            return;
        }

        const panel = vscode.window.createWebviewPanel(PREVIEW_VIEW_TYPE, getTitle(document), column, {
            enableScripts: true,
            retainContextWhenHidden: true
        });

        SchemaPreviewPanel.currentPanel = new SchemaPreviewPanel(
            panel,
            document,
            SchemaPreviewPanel.previewServer,
            extensionUri
        );
    }

    private constructor(
        panel: vscode.WebviewPanel,
        document: vscode.TextDocument,
        previewServer: PreviewServer,
        extensionUri: vscode.Uri
    ) {
        this.panel = panel;
        this.document = document;
        this.previewServer = previewServer;
        this.extensionUri = extensionUri;

        this.panel.onDidDispose(() => this.dispose(), null, this.disposables);

        vscode.window.onDidChangeActiveTextEditor(
            (editor) => {
                if (editor && editor.document.languageId === 'schema') {
                    void this.initPanel();
                }
            },
            null,
            this.disposables
        );

        vscode.workspace.onDidChangeTextDocument((x) => this.handleDidChangeTextDocument(x), null, this.disposables);

        void this.initPanel();
    }

    private async handleDidChangeTextDocument(event: vscode.TextDocumentChangeEvent): Promise<void> {
        let finalEntities: CachedEntity[] = [...this.currentEntities];

        [...event.contentChanges]
            .sort((o1, o2) => o2.rangeOffset - o1.rangeOffset)
            .forEach((change) => {
                const changeStart = change.rangeOffset;
                const changeEnd = change.rangeOffset - change.rangeLength;
                finalEntities = finalEntities
                    .filter((x) => {
                        /*
                         * Step 1: delete disappeared entity
                         *         if an entity's start between event-start and event-end, it is disappeared
                         */
                        return changeStart > x.start || x.start > changeEnd;
                    })
                    .map((x) => {
                        /*
                         * Step 2: update entity start
                         *         alignment entity.start if entity.start is larger than event.start
                         * NOTICE: entity.start will be the key of entity
                         */
                        let { start } = x;
                        if (start >= changeStart) {
                            start = start - change.rangeLength + change.text.length;
                        }
                        return { ...x, start };
                    });
            });

        /*
         * Step 3: delete invalid entity from finalEntityModels by entity-start
         */
        const actualSchema = await this.loadSchema(event.document);
        finalEntities = finalEntities.filter((x) => {
            return actualSchema.entities.some((actualEntity) => actualEntity.start === x.start);
        });

        /*
         * Step 4: append new entities to finalEntities
         */
        actualSchema.entities.forEach((actualEntity) => {
            if (!finalEntities.some((x) => x.start === actualEntity.start)) {
                finalEntities.push(actualEntity);
            }
        });

        /*
         * Step 5: update properties (expect id) of finalEntityModels
         */
        finalEntities.forEach((x) => {
            const actualEntity = actualSchema.entities.find((entity) => entity.start === x.start);
            if (actualEntity) {
                x.meta = {
                    ...actualEntity.meta,
                    id: x.meta.id
                };
            }
        });

        /*
         * Step 6: sort finalEntities and update to class-variable
         */
        finalEntities.sort((o1, o2) => o1.start - o2.start);

        this.currentEntities = finalEntities;
        this.currentNamespace = actualSchema.namespace;
        this.document = event.document;

        await this.updatePanelData();
    }

    private async initPanel() {
        const currentSchema = await this.loadSchema(this.document);

        this.currentEntities = currentSchema.entities;
        this.currentNamespace = currentSchema.namespace;

        await this.updatePanelData();
        const previewUrl = await this.previewServer.getPreviewUrl();
        console.log('='.repeat(40) + previewUrl);

        this.panel.title = getTitle(this.document);

        this.panel.webview.onDidReceiveMessage(
            (message) => {
                console.log('='.repeat(20));
                console.log(message);
                if (message.command === 'ready') {
                    this.panel.webview.postMessage({
                        command: 'init',
                        payload: { t: Date.now() }
                    });
                }
            },
            null,
            this.disposables
        );

        this.panel.webview.html = await this.loadWebviewHtml(previewUrl);
        this.panel.webview.asWebviewUri(vscode.Uri.parse(previewUrl));
        this.isWebviewReady = true;
    }

    private async updatePanelData() {
        await this.previewServer.updateContent(
            this.document.fileName,
            new KGSchema(
                this.currentNamespace?.meta,
                this.currentEntities.map((x) => x.meta)
            )
        );

        if (this.isWebviewReady) {
            await this.postMessage('refresh-schema');
        }
    }

    private async loadWebviewHtml(previewUrl: string): Promise<string> {
        const templateUri = vscode.Uri.joinPath(this.extensionUri, 'resources', 'preview', 'template.html');
        const template = (await vscode.workspace.fs.readFile(templateUri)).toString();
        return template.replace(/{{\s*previewUrl\s*}}/g, previewUrl).replace(/{{\s*nonce\s*}}/g, generateUuid());
    }

    private async loadSchema(document: vscode.TextDocument): Promise<CachedSchema> {
        const client = getSchemaLanguageClient();
        const nodes = await client.sendRequest<syntax.SourceUnitNode[]>('openspg-schema/ast', {
            textDocument: {
                uri: document.uri.toString()
            }
        });

        const content = document.getText();
        const getText = ({ range }: syntax.SyntaxNode) => content.substring(range[0], range[1] + 1);

        const namespaces = nodes
            .filter((x) => x?.type === 'NamespaceDeclaration')
            .map((x) => {
                const { range } = x;
                return {
                    start: range[0],
                    content: getText(x),
                    meta: parseNamespace(x)
                } as CachedNamespace;
            });

        const entities = nodes
            .filter((x) => x?.type === 'EntityDeclaration')
            .map((x) => {
                const { range } = x;
                return {
                    start: range[0],
                    content: getText(x),
                    meta: parseEntity(x, getText)
                } as CachedEntity;
            });

        return {
            namespace: namespaces.length > 0 ? namespaces[0] : undefined,
            entities
        };
    }

    private async postMessage(type: string, args: Record<string, any> = {}) {
        console.log('postMessage: ' + type);
        await this.panel.webview.postMessage({
            action: 'openspg.command',
            payload: {
                type,
                args
            }
        });
    }

    private dispose() {
        SchemaPreviewPanel.currentPanel = undefined;
        this.panel.dispose();
        while (this.disposables.length) {
            const disposable = this.disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }
    }
}
