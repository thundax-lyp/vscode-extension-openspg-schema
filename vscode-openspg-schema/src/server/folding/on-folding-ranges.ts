import {FoldingRange} from 'vscode-languageserver';
import * as syntax from 'openspg-schema-antlr4'
import {Context, OnFoldingRanges} from '../context';

export const onFoldingRanges: OnFoldingRanges = ({connection, documents}: Context) => async ({textDocument}) => {
    const document = documents.get(textDocument.uri);
    if (!document || !document.ast) {
        return null;
    }

    const foldingRanges: FoldingRange[] = []

    // syntax.visit(document.ast, {
    //     BasicPropertyName: ({node}) => emit(node, SemanticTokenTypes.property),
    //     BasicPropertyValue: ({node}) => emit(node, SemanticTokenTypes.string),
    //
    //     BasicStructureType: ({node}) => emit(node, SemanticTokenTypes.keyword),
    //
    //     BlockPropertyValue: ({node}) => emit(node, SemanticTokenTypes.string),
    //
    //     BuiltinPropertyName: ({node}) => emit(node, SemanticTokenTypes.keyword),
    //     BuiltinPropertyValue: ({node}) => emit(node, SemanticTokenTypes.keyword),
    //     KnowledgeStructureType: ({node}) => emit(node, SemanticTokenTypes.keyword),
    //     StandardStructureType: ({node}) => emit(node, SemanticTokenTypes.keyword),
    //
    //     StructureAlias: ({node}) => emit(node, SemanticTokenTypes.string),
    //
    //     StructureRealName: ({node, path}) => {
    //         if (path.split('.').includes('BasicStructureTypeExpression')) {
    //             emit(node, SemanticTokenTypes.modifier);
    //         } else {
    //             emit(node, SemanticTokenTypes.struct);
    //         }
    //     },
    //
    //     StructureSemanticName: ({node, path}) => {
    //         if (path.split('.').includes('BasicStructureTypeExpression')) {
    //             emit(node, SemanticTokenTypes.modifier);
    //         } else {
    //             emit(node, SemanticTokenTypes.struct);
    //         }
    //     },
    // })

    return foldingRanges;
};
