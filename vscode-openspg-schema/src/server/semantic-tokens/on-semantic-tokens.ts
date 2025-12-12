import {SemanticTokensBuilder, SemanticTokenTypes, SemanticTokenModifiers} from 'vscode-languageserver';
import * as syntax from "openspg-schema-antlr4";
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
        BasicPropertyName: ({node}) => emit(node, SemanticTokenTypes.property),
        BasicPropertyValue: ({node}) => emit(node, SemanticTokenTypes.string),
        BasicStructureType: ({node}) => emit(node, SemanticTokenTypes.keyword),
        BlockPropertyValue: ({node}) => emit(node, SemanticTokenTypes.string),
        BuiltinPropertyName: ({node}) => emit(node, SemanticTokenTypes.keyword),
        BuiltinPropertyValue: ({node}) => emit(node, SemanticTokenTypes.keyword),
        KnowledgeStructureType: ({node}) => emit(node, SemanticTokenTypes.keyword),
        StandardStructureType: ({node}) => emit(node, SemanticTokenTypes.keyword),
        StructureAlias: ({node}) => emit(node, SemanticTokenTypes.string),
        StructureRealName: ({node, path}) => {
            if (path.split('.').includes('BasicStructureTypeExpression')) {
                emit(node, SemanticTokenTypes.modifier);
            } else {
                emit(node, SemanticTokenTypes.struct);
            }
        },
        StructureSemanticName: ({node, path}) => {
            if (path.split('.').includes('BasicStructureTypeExpression')) {
                emit(node, SemanticTokenTypes.modifier);
            } else {
                emit(node, SemanticTokenTypes.struct);
            }
        },
    })

    return builder.build();
}
