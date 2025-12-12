import {SemanticTokenModifiers, SemanticTokensBuilder, SemanticTokenTypes} from 'vscode-languageserver';
import * as syntax from 'openspg-concept-rule-antlr4'
import {Context, OnSemanticTokens} from '../context';


export const onSemanticTokens = (ctx: Context): OnSemanticTokens => async ({textDocument}) => {
    const builder = new SemanticTokensBuilder();

    const document = ctx.documents.get(textDocument.uri);
    if (!document || !document.ast) {
        return builder.build();
    }

    const tokenTypes = Object.values(SemanticTokenTypes)
    const tokenModifiers = Object.values(SemanticTokenModifiers)

    const emit = (
        node: syntax.SyntaxNode,
        tokenType: SemanticTokenTypes,
        tokenModifier: SemanticTokenModifiers = SemanticTokenModifiers.declaration
    ) => {
        const {line, column} = node.location.start;
        builder.push(
            line - 1, column, node.range[1] - node.range[0] + 1,
            tokenTypes.indexOf(tokenType),
            tokenModifiers.indexOf(tokenModifier)
        )
    }

    syntax.visit(document.ast, {
        NamespaceVariable: ({node}) => emit(node, SemanticTokenTypes.variable),
        RuleWrapperRuleHead: ({node}) => {
            const {line, column} = node.location.start;
            builder.push(
                line - 1, column, "rule".length,
                tokenTypes.indexOf(SemanticTokenTypes.property),
                tokenModifiers.indexOf(SemanticTokenModifiers.declaration)
            )
        },
        ConceptName: ({node}) => emit(node, SemanticTokenTypes.variable),
        ConceptRuleHead: ({node}) => {
            const {line, column} = node.location.start;
            builder.push(
                line - 1, column, "Define".length,
                tokenTypes.indexOf(SemanticTokenTypes.keyword),
                tokenModifiers.indexOf(SemanticTokenModifiers.declaration)
            )
        },
        ElementPatternDeclarationAndFiller: ({node}) => emit(node, SemanticTokenTypes.variable),
        TheGraphStructureHead: ({node}) => emit(node, SemanticTokenTypes.keyword),
        TheRuleHead: ({node}) => emit(node, SemanticTokenTypes.keyword),
        TheActionHead: ({node}) => emit(node, SemanticTokenTypes.keyword),
    })

    return builder.build();
}
