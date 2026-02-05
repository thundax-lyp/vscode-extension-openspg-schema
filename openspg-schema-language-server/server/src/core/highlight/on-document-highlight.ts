import { DocumentHighlight, DocumentHighlightKind, Range } from 'vscode-languageserver';
import * as syntax from 'openspg-schema-antlr4';
import { Context, OnDocumentHighlight } from '../context';

export const onDocumentHighlight: OnDocumentHighlight =
    ({ documents }: Context) =>
    async ({ textDocument, position }) => {
        const document = documents.get(textDocument.uri);
        if (!document) {
            return null;
        }

        const createSelector = document.createPositionSelector(position);
        const selectedPath = document.getPathAt<syntax.SyntaxNode>(createSelector('*'));
        if (!selectedPath) {
            return null;
        }

        return [
            DocumentHighlight.create(
                Range.create(
                    document.positionAt(selectedPath.node.range[0]),
                    document.positionAt(selectedPath.node.range[1])
                ),
                DocumentHighlightKind.Text
            )
        ];
    };
