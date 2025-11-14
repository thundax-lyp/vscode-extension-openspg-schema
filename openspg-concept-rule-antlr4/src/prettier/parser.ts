import type {Parser, ParserOptions} from 'prettier';
import {SyntaxNode} from '../ast';
import {PrettierPrinter} from './printer';
import {parse, SyntaxToken, tokenizer} from '../parser';
import {comments, WithComments} from './printers/base';

export const getCommentTokens = (tokens: SyntaxToken[]) => {
    return tokens
        .filter((token) => comments.includes(token.type))
        .map((c) => ({...c, value: c.text}));
};

export class PrettierParser implements Parser<SyntaxNode> {

    // @ts-ignore
    public static name = 'openspg-concept-rule-antlr4-parser';

    public astFormat = PrettierPrinter.name;
    public locStart = (node: SyntaxNode) => node.range[0];
    public locEnd = (node: SyntaxNode) => node.range[1] + 1;
    public parse = (text: string, _options: ParserOptions<SyntaxNode>) => {
        const ast = parse(text, {tolerant: true}) as WithComments<SyntaxNode>;
        const tokens = tokenizer(text, {tolerant: true});
        if (ast) (<any>ast).comments = getCommentTokens(tokens);
        return ast;
    };
}
