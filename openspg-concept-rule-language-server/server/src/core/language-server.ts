import {Connection} from "vscode-languageserver";
import {ConceptRuleTextDocument, TextDocuments} from "./common";
import {Context} from "./context";
import {onExit, onInitialize, onInitialized} from "./initialize";
import {onDocumentSymbol} from "./symbol";
import {onDocumentFormatting} from "./format";
import {onDocumentLinkResolve, onDocumentLinks, onHover} from "./definition";
import {onDocumentHighlight} from "./highlight";
import {onSemanticTokens} from "./semantic-token";
import {onFoldingRanges} from "./folding";

const initDocuments = (_: Connection): TextDocuments<ConceptRuleTextDocument> => {
    const documents = new TextDocuments(ConceptRuleTextDocument);
    documents.onDidOpen(() => {
        // connection.console.log('documents.onDidOpen()');
    })

    documents.onDidClose(() => {
        // connection.console.log('documents.onDidClose()');
    })

    documents.onDidChangeContent(() => {
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

    connection.onHover(onHover(context));

    // connection.onCompletion(onCompletion(context));
    // connection.onCompletionResolve(onCompletion(context));

    /**
     * 函数签名提示
     * 触发时机：用户输入函数调用时（如输入"("），VSCode会自动请求签名信息。
     * 返回内容：包含函数参数、返回值等帮助信息，通过SignatureHelp对象传递
     */
    // connection.onSignatureHelp(onSignatureHelp(context));

    // connection.onDeclaration(onSignatureHelp(context));
    // connection.onDefinition(onDefinition(context));
    // connection.onTypeDefinition(onSignatureHelp(context));
    // connection.onImplementation(onImplementation(serverState));
    // connection.onReferences(onReferences(context));
    connection.onDocumentHighlight(onDocumentHighlight(context));

    connection.onDocumentSymbol(onDocumentSymbol(context));


    // connection.onWorkspaceSymbol(onSignatureHelp(context));
    // connection.onWorkspaceSymbolResolve(onSignatureHelp(context));

    // connection.onCodeAction(onCodeAction(serverState));
    // connection.onCodeActionResolve(onCodeAction(serverState));

    // connection.onCodeLens(onCodeLens(context));
    // connection.onCodeLensResolve(onCodeAction(serverState));

    connection.onDocumentFormatting(onDocumentFormatting(context));
    // connection.onDocumentRangeFormatting(onDocumentRangeFormatting(context));
    // connection.onDocumentOnTypeFormatting(onDocumentOnTypeFormatting(context));

    // connection.onRenameRequest(onRename(serverState));

    connection.onDocumentLinks(onDocumentLinks(context));
    connection.onDocumentLinkResolve(onDocumentLinkResolve(context));

    // connection.onDocumentColor(onDocumentLinkResolve(context));
    // connection.onColorPresentation(onDocumentLinkResolve(context));
    connection.onFoldingRanges(onFoldingRanges(context));
    // connection.onSelectionRanges(onDocumentLinkResolve(context));
    // connection.onExecuteCommand(onDocumentLinkResolve(context));

    connection.languages.semanticTokens.on(onSemanticTokens(context))

    documents.listen(connection)

    connection.listen()
}
