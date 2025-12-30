import {FoldingRange, Range} from 'vscode-languageserver';
import * as syntax from 'openspg-schema-antlr4'
import {Context, OnFoldingRanges} from '../context';

export const onFoldingRanges: OnFoldingRanges = ({documents}: Context) => async ({textDocument}) => {
    const document = documents.get(textDocument.uri);
    if (!document || !document.ast) {
        return null;
    }

    const trimRange = (range: [number, number]) => {
        const plainContent = document.getText(Range.create(
            document.positionAt(range[0]), document.positionAt(range[1])
        ));
        const start = range[0] + plainContent.length - plainContent.trimStart().length;
        const end = range[1] - plainContent.length + plainContent.trimEnd().length;
        return [start, end];
    }

    const foldingRanges: FoldingRange[] = []

    syntax.visit(document.ast, {
        EntityDeclaration: ({node}) => {
            if (node.children && node.children.length > 0) {
                const range = trimRange(node.range);
                foldingRanges.push(FoldingRange.create(
                    document.positionAt(range[0]).line, document.positionAt(range[1]).line
                ));
            }
        },
        PropertyDeclaration: ({node}) => {
            if (node.children && node.children.length > 0) {
                const range = trimRange(node.range);
                foldingRanges.push(FoldingRange.create(
                    document.positionAt(range[0]).line, document.positionAt(range[1]).line
                ));
            }
        },
        BlockPropertyValue: ({node}) => {
            const start = document.positionAt(node.range[0])
            const end = document.positionAt(node.range[1])
            if (start.line < end.line) {
                foldingRanges.push(FoldingRange.create(
                    start.line, end.line
                ));
            }
        }
    })

    return foldingRanges;
};
