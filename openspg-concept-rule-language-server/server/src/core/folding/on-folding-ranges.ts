import {FoldingRange} from 'vscode-languageserver';
import * as syntax from 'openspg-concept-rule-antlr4'
import {Context, OnFoldingRanges} from '../context';

export const onFoldingRanges: OnFoldingRanges = ({documents}: Context) => async ({textDocument}) => {
    const document = documents.get(textDocument.uri);
    if (!document || !document.ast) {
        return null;
    }

    const foldingTypes = [
        'RuleWrapperDeclaration', 'RuleWrapperRuleDeclaration', 'ConceptRuleDeclaration',
        'TheGraphStructureDeclaration', 'TheRuleDeclaration', 'TheActionDeclaration',
    ]

    const foldingNodes: syntax.SyntaxNode[] = [];

    syntax.traverse(document.ast, ({node}) => {
        console.log(node.type + ' ' + (node.type in foldingTypes))
        if (node.type in foldingTypes) {
            foldingNodes.push(node)
        }
    })

    return foldingNodes.flatMap(node => {
        const start = document.positionAt(node.range[0])
        const end = document.positionAt(node.range[1])
        if (start.line < end.line) {
            return [FoldingRange.create(start.line, end.line)];
        }
        return []
    });
};
