import * as ast from '../ast';
import type {AstPath, Doc, ParserOptions, Printer} from 'prettier';
import {canAttachComment, handleComments, isBlockComment, massageAstNode, print, printComment,} from './printers';

export type PrintFunc<T extends ast.SyntaxNode = ast.SyntaxNode> = (arg: {
    path: AstPath<T>;
    options: ParserOptions<T>;
    print: (path: AstPath<ast.SyntaxNode>) => Doc;
    args?: any;
}) => Doc;

export class PrettierPrinter implements Printer<any> {

    // @ts-ignore
    public static name = 'openspg-schema-antlr4-printer';

    public print = print;
    public printComment = printComment;
    public isBlockComment = isBlockComment;
    public canAttachComment = canAttachComment;
    public massageAstNode = massageAstNode;
    public handleComments = handleComments;
}
