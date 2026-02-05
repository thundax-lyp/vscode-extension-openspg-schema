import { RequestType, TextDocumentIdentifier } from 'vscode-languageserver-protocol';
import * as antlr from 'openspg-schema-antlr4';

export interface ASTParams {
    textDocument: TextDocumentIdentifier;
}

export type ASTResult = antlr.SourceUnitNode[];

export const ASTRequest = new RequestType<ASTParams, ASTResult | null, void>('openspg-schema/ast');
