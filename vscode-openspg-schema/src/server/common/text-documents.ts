import {
    NotificationHandler,
    DidOpenTextDocumentParams,
    DidChangeTextDocumentParams,
    DidCloseTextDocumentParams,
    WillSaveTextDocumentParams,
    RequestHandler,
    TextEdit,
    DidSaveTextDocumentParams,
    DocumentUri,
    TextDocumentContentChangeEvent,
    TextDocumentSaveReason,
    Emitter,
    Event,
    TextDocumentSyncKind,
    CancellationToken,
    Disposable,
    TextDocumentItem,
} from 'vscode-languageserver';
import {TextDocument} from 'vscode-languageserver-textdocument';
import {
    EVENT_TEXT_DOCUMENTS_ON_CREATE,
    EVENT_TEXT_DOCUMENTS_ON_DELETE,
    EVENT_TEXT_DOCUMENTS_ON_SYNC,
} from './constants';
import {SchemaTextDocument} from './text-document';


export interface TextDocumentConnection {
    onDidOpenTextDocument(handler: NotificationHandler<DidOpenTextDocumentParams>): Disposable;

    onDidChangeTextDocument(handler: NotificationHandler<DidChangeTextDocumentParams>): Disposable;

    onDidCloseTextDocument(handler: NotificationHandler<DidCloseTextDocumentParams>): Disposable;

    onWillSaveTextDocument(handler: NotificationHandler<WillSaveTextDocumentParams>): Disposable;

    onWillSaveTextDocumentWaitUntil(
        handler: RequestHandler<WillSaveTextDocumentParams, TextEdit[] | undefined | null, void>,
    ): Disposable;

    onDidSaveTextDocument(handler: NotificationHandler<DidSaveTextDocumentParams>): Disposable;

    onNotification(type: string, handler: NotificationHandler<any>): Disposable; // fallback rpc
}

export interface ConnectionState {
    __textDocumentSync: TextDocumentSyncKind | undefined;
}

export interface TextDocumentsConfiguration<T extends { uri: DocumentUri }> {
    create(uri: DocumentUri, languageId: string, version: number, content: string): T;

    update(document: T, changes: TextDocumentContentChangeEvent[], version: number): T;
}

export interface TextDocumentChangeEvent<T> {
    document: T;
}

export interface TextDocumentSyncEvent<T> {
    documents: Map<string, T>;
}

export interface SyncTextDocumentParams {
    documents: Record<string, TextDocumentItem>;
}

export interface TextDocumentWillSaveEvent<T> {
    document: T;
    reason: TextDocumentSaveReason;
}

export class TextDocuments<T extends TextDocument> {

    private readonly _configuration: TextDocumentsConfiguration<T>;

    private readonly _syncedDocuments: Map<string, T>;

    private readonly _onDidChangeContent: Emitter<TextDocumentChangeEvent<T>>;
    private readonly _onDidOpen: Emitter<TextDocumentChangeEvent<T>>;
    private readonly _onDidClose: Emitter<TextDocumentChangeEvent<T>>;
    private readonly _onDidSave: Emitter<TextDocumentChangeEvent<T>>;
    private readonly _onWillSave: Emitter<TextDocumentWillSaveEvent<T>>;
    private readonly _onCreate: Emitter<TextDocumentChangeEvent<T>>;
    private readonly _onDelete: Emitter<TextDocumentChangeEvent<T>>;
    private readonly _onSync: Emitter<TextDocumentSyncEvent<T>>;
    private _willSaveWaitUntil:
        | RequestHandler<TextDocumentWillSaveEvent<T>, TextEdit[], void>
        | undefined;

    /**
     * Create a new text document manager.
     */
    public constructor(configuration: TextDocumentsConfiguration<T>) {
        this._configuration = configuration;
        this._syncedDocuments = new Map();

        this._onDidChangeContent = new Emitter<TextDocumentChangeEvent<T>>();
        this._onDidOpen = new Emitter<TextDocumentChangeEvent<T>>();
        this._onDidClose = new Emitter<TextDocumentChangeEvent<T>>();
        this._onDidSave = new Emitter<TextDocumentChangeEvent<T>>();
        this._onWillSave = new Emitter<TextDocumentWillSaveEvent<T>>();
        this._onCreate = new Emitter<TextDocumentChangeEvent<T>>();
        this._onDelete = new Emitter<TextDocumentChangeEvent<T>>();
        this._onSync = new Emitter<TextDocumentSyncEvent<T>>();
    }

    public get onDidOpen(): Event<TextDocumentChangeEvent<T>> {
        return this._onDidOpen.event;
    }

    public get onDidChangeContent(): Event<TextDocumentChangeEvent<T>> {
        return this._onDidChangeContent.event;
    }

    public get onWillSave(): Event<TextDocumentWillSaveEvent<T>> {
        return this._onWillSave.event;
    }

    public onWillSaveWaitUntil(handler: RequestHandler<TextDocumentWillSaveEvent<T>, TextEdit[], void>,) {
        this._willSaveWaitUntil = handler;
    }

    public get onDidSave(): Event<TextDocumentChangeEvent<T>> {
        return this._onDidSave.event;
    }

    public get onDidClose(): Event<TextDocumentChangeEvent<T>> {
        return this._onDidClose.event;
    }

    public get onCreate(): Event<TextDocumentChangeEvent<T>> {
        return this._onCreate.event;
    }

    public get onDelete(): Event<TextDocumentChangeEvent<T>> {
        return this._onDelete.event;
    }

    public get onSync(): Event<TextDocumentSyncEvent<T>> {
        return this._onSync.event;
    }

    public get(uri: string): T | undefined {
        return this._syncedDocuments.get(uri);
    }

    public has(uri: string): boolean {
        return this._syncedDocuments.has(uri);
    }

    public all(): T[] {
        return Array.from(this._syncedDocuments.values());
    }

    public keys(): string[] {
        return Array.from(this._syncedDocuments.keys());
    }

    public listen(connection: TextDocumentConnection): Disposable {
        (<ConnectionState>(<any>connection)).__textDocumentSync = TextDocumentSyncKind.Incremental;
        const disposables: Disposable[] = [];
        disposables.push(
            connection.onDidOpenTextDocument((event: DidOpenTextDocumentParams) => {
                const {uri, languageId, version, text} = event.textDocument;
                const document = this._configuration.create(uri, languageId, version, text);
                const decodedUri = decodeURIComponent(uri);

                this._syncedDocuments.set(decodedUri, document);
                const toFire = Object.freeze({document});
                this._onDidOpen.fire(toFire);
                this._onDidChangeContent.fire(toFire);
            }),
        );
        disposables.push(
            connection.onDidChangeTextDocument((event: DidChangeTextDocumentParams) => {
                const td = event.textDocument;
                const changes = event.contentChanges;
                if (changes.length === 0) {
                    return;
                }

                const {version} = td;
                if (version === null || version === undefined) {
                    throw new Error(
                        `Received document change event for ${td.uri} without valid version identifier`,
                    );
                }

                let syncedDocument = this._syncedDocuments.get(td.uri);
                if (syncedDocument !== undefined) {
                    syncedDocument = this._configuration.update(syncedDocument, changes, version);
                    this._syncedDocuments.set(td.uri, syncedDocument);
                    this._onDidChangeContent.fire(Object.freeze({document: syncedDocument}));
                }
            }),
        );
        disposables.push(
            connection.onDidCloseTextDocument((event: DidCloseTextDocumentParams) => {
                const syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
                if (syncedDocument !== undefined) {
                    // Do not delete from map
                    // this._syncedDocuments.delete(event.textDocument.uri);
                    this._onDidClose.fire(Object.freeze({document: syncedDocument}));
                }
            }),
        );
        disposables.push(
            connection.onWillSaveTextDocument((event: WillSaveTextDocumentParams) => {
                const syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
                if (syncedDocument !== undefined) {
                    this._onWillSave.fire(Object.freeze({document: syncedDocument, reason: event.reason}));
                }
            }),
        );
        disposables.push(
            connection.onWillSaveTextDocumentWaitUntil(
                (event: WillSaveTextDocumentParams, token: CancellationToken) => {
                    const syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
                    if (syncedDocument !== undefined && this._willSaveWaitUntil) {
                        return this._willSaveWaitUntil(
                            Object.freeze({document: syncedDocument, reason: event.reason}),
                            token,
                        );
                    } else {
                        return [];
                    }
                },
            ),
        );
        disposables.push(
            connection.onDidSaveTextDocument((event: DidSaveTextDocumentParams) => {
                const syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
                if (syncedDocument !== undefined) {
                    this._onDidSave.fire(Object.freeze({document: syncedDocument}));
                }
            }),
        );
        disposables.push(
            connection.onNotification(EVENT_TEXT_DOCUMENTS_ON_SYNC, (event: SyncTextDocumentParams) => {
                const documents = event.documents;
                this._syncedDocuments.clear();
                Object.entries(documents).forEach(([, td]) => {
                    const document = this._configuration.create(td.uri, td.languageId, td.version, td.text);
                    this._syncedDocuments.set(td.uri, document);
                });
                this._onSync.fire(Object.freeze({documents: this._syncedDocuments}));
            }),
        );
        disposables.push(
            connection.onNotification(
                EVENT_TEXT_DOCUMENTS_ON_CREATE,
                (event: DidOpenTextDocumentParams) => {
                    const td = event.textDocument;

                    const document = this._configuration.create(td.uri, td.languageId, td.version, td.text);
                    this._syncedDocuments.set(td.uri, document);
                    const toFire = Object.freeze({document});
                    this._onCreate.fire(toFire);
                    this._onDidOpen.fire(toFire);
                    this._onDidChangeContent.fire(toFire);
                },
            ),
        );
        disposables.push(
            connection.onNotification(
                EVENT_TEXT_DOCUMENTS_ON_DELETE,
                (event: DidCloseTextDocumentParams) => {
                    const syncedDocument = this._syncedDocuments.get(event.textDocument.uri);
                    if (syncedDocument !== undefined) {
                        this._syncedDocuments.delete(event.textDocument.uri);
                        const toFire = Object.freeze({document: syncedDocument});
                        this._onDidClose.fire(toFire);
                        this._onDelete.fire(toFire);
                    }
                },
            ),
        );

        return Disposable.create(() => {
            disposables.forEach((disposable) => disposable.dispose());
        });
    }

    public patchDocument = (
        uri: string,
        languageId: string = 'schema',
        version: number = 1,
        content: string = '',
    ): T => {
        if (this.has(uri)) return this.get(uri)!;
        const document = this._configuration.create(uri, languageId, version, content);
        this._syncedDocuments.set(uri, document);
        const toFire = Object.freeze({document});
        this._onCreate.fire(toFire);
        this._onDidOpen.fire(toFire);
        this._onDidChangeContent.fire(toFire);
        return document;
    };
}

export const documents = new TextDocuments(SchemaTextDocument);
