import {
    CancellationToken,
    DocumentHighlight,
    DocumentHighlightProvider,
    Position,
    ProviderResult,
    TextDocument
} from "vscode";

export class SchemaDocumentHighlightProvider implements DocumentHighlightProvider {
    provideDocumentHighlights(
        document: TextDocument,
        position: Position,
        token: CancellationToken
    ): ProviderResult<DocumentHighlight[]> {
        throw new Error("Method not implemented.");
    }
}
