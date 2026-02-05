import { Context } from '../context';
import { ASTParams, ASTResult } from './types';

export const onAST = (ctx: Context) => async (params: ASTParams) => {
    const { textDocument } = params;
    const document = ctx.documents.get(textDocument.uri);
    if (!document) {
        return null;
    }
    await document.promiseReady;
    if (!document.ast) {
        return null;
    }

    return document.ast.nodes as ASTResult;
};
