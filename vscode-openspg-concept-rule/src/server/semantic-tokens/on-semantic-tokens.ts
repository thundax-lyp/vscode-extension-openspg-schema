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

    const emitPrefixKeyword = (
        node: syntax.SyntaxNode,
        prefix: string,
        tokenType: SemanticTokenTypes = SemanticTokenTypes.keyword,
        tokenModifier: SemanticTokenModifiers = SemanticTokenModifiers.declaration
    ) => {
        const {line, column} = node.location.start;
        builder.push(
            line - 1, column, prefix.length,
            tokenTypes.indexOf(tokenType),
            tokenModifiers.indexOf(tokenModifier)
        )
    }

    syntax.visit(document.ast, {
        NamespaceDeclaration: ({node}) => emitPrefixKeyword(node, 'namespace'),
        NamespaceVariable: ({node}) => emit(node, SemanticTokenTypes.variable),

        RuleWrapperRuleHead: ({node}) => emitPrefixKeyword(node, 'rule'),
        ConceptRuleHead: ({node}) => emitPrefixKeyword(node, 'define'),

        TheGraphStructureHead: ({node}) => emit(node, SemanticTokenTypes.keyword),
        TheRuleHead: ({node}) => emit(node, SemanticTokenTypes.keyword),
        TheActionHead: ({node}) => emit(node, SemanticTokenTypes.keyword),

        ElementVariableDeclaration: ({node}) => emit(node, SemanticTokenTypes.variable),

        ConceptInstanceId: ({node, parentPath}) => {
            const parents = parentPath?.path.split('.') ?? []
            if (parents.includes('RuleWrapperHead')) {
                emit(node, SemanticTokenTypes.class)
            } else if (parents.includes('ConceptName')) {
                emit(node, SemanticTokenTypes.variable)
            }
        },

        Identifier: ({node, parentPath}) => {
            const parents = parentPath?.path.split('.') ?? []
            if (parents.includes('RuleWrapperHead')) {
                emit(node, SemanticTokenTypes.class)
            } else if (parents.includes('ConceptType')) {
                emit(node, SemanticTokenTypes.variable)
            }
        },
    })

    return builder.build();
}
