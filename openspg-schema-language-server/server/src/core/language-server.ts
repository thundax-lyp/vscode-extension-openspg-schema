import {Connection} from "vscode-languageserver";
import {SchemaTextDocument} from "./common/text-document";
import {TextDocuments} from "./common/text-documents";
import {Context} from "./context";
import {onExit, onInitialize, onInitialized} from "./initialize";
import {onDocumentSymbol} from "./symbol";
import {onDocumentFormatting, onDocumentOnTypeFormatting, onDocumentRangeFormatting} from "./format";
import {onDefinition, onDocumentLinkResolve, onDocumentLinks, onHover, onReferences} from "./definition";

const initDocuments = (connection: Connection): TextDocuments<SchemaTextDocument> => {
    const documents = new TextDocuments(SchemaTextDocument);
    documents.onDidOpen(event => {
        // connection.console.log('documents.onDidOpen()');
    })

    documents.onDidClose(event => {
        // connection.console.log('documents.onDidClose()');
    })

    documents.onDidChangeContent(event => {
        // connection.console.log('documents.onDidChangeContent()');
    });

    return documents;
}

export const listen = (connection: Connection) => {
    const documents = initDocuments(connection);

    const context = new Context(connection, documents);

    // Lifecycle hooks
    connection.onInitialize(onInitialize(context));
    connection.onInitialized(onInitialized(context));
    connection.onExit(onExit(context));

    // connection.onDidChangeConfiguration
    // connection.onDidChangeWatchedFiles

    // connection.onDidOpenTextDocument
    // connection.onDidChangeTextDocument
    // connection.onDidCloseTextDocument

    // connection.onWillSaveTextDocument
    // connection.onWillSaveTextDocumentWaitUntil
    // connection.sendDiagnostics

    // Command hooks

    // definition

    connection.onHover(onHover(context));

    // connection.onCompletion(onCompletion(context));
    // connection.onCompletionResolve(onCompletion(context));
    // connection.onSignatureHelp(onSignatureHelp(context));

    // connection.onDeclaration(onSignatureHelp(context));
    connection.onDefinition(onDefinition(context));
    // connection.onTypeDefinition(onSignatureHelp(context));
    // connection.onImplementation(onImplementation(serverState));
    connection.onReferences(onReferences(context));
    // connection.onDocumentHighlight(onSignatureHelp(context));
    connection.onDocumentSymbol(onDocumentSymbol(context));

    // connection.onWorkspaceSymbol(onSignatureHelp(context));
    // connection.onWorkspaceSymbolResolve(onSignatureHelp(context));

    // connection.onCodeAction(onCodeAction(serverState));
    // connection.onCodeActionResolve(onCodeAction(serverState));

    // connection.onCodeLens(onCodeLens(context));
    // connection.onCodeLensResolve(onCodeAction(serverState));

    connection.onDocumentFormatting(onDocumentFormatting(context));
    connection.onDocumentRangeFormatting(onDocumentRangeFormatting(context));
    connection.onDocumentOnTypeFormatting(onDocumentOnTypeFormatting(context));

    // connection.onRenameRequest(onRename(serverState));

    connection.onDocumentLinks(onDocumentLinks(context));
    connection.onDocumentLinkResolve(onDocumentLinkResolve(context));

    // connection.onDocumentColor(onDocumentLinkResolve(context));
    // connection.onColorPresentation(onDocumentLinkResolve(context));
    // connection.onFoldingRanges(onDocumentLinkResolve(context));
    // connection.onSelectionRanges(onDocumentLinkResolve(context));
    // connection.onExecuteCommand(onDocumentLinkResolve(context));



    documents.listen(connection)

    // Listen on the connection
    connection.listen()
}
