import { FoldingRange } from 'vscode-languageserver';
import * as syntax from 'openspg-concept-rule-antlr4';
import { Context, OnFoldingRanges } from '../context';

export const onFoldingRanges: OnFoldingRanges =
    ({ documents }: Context) =>
    async ({ textDocument }) => {
        const document = documents.get(textDocument.uri);
        if (!document || !(await document.isReady())) {
            return null;
        }

        const foldingTypes = [
            'RuleWrapperDeclaration',
            'RuleWrapperRuleDeclaration',
            'ConceptRuleDeclaration',
            'TheGraphStructureDeclaration',
            'TheRuleDeclaration',
            'TheActionDeclaration',
            'ObjectFunctionParam'
        ];

        const foldingNodes: syntax.SyntaxNode[] = [];

        syntax.traverse(document.ast!, ({ node }) => {
            if (foldingTypes.includes(node.type)) {
                foldingNodes.push(node);
            }
        });

        return foldingNodes.flatMap((node) => {
            const start = document.positionAt(node.range[0]);
            const end = document.positionAt(node.range[1]);
            if (start.line < end.line) {
                return [FoldingRange.create(start.line, end.line)];
            }
            return [];
        });
    };
