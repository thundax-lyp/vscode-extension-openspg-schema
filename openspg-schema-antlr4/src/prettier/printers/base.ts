import type {AstPath, Doc, ParserOptions} from 'prettier';
import * as doc from 'prettier/doc';
import * as ast from '../../ast';
import {SyntaxToken, SyntaxTokenType} from '../../parser';
import {printComment} from './comment';

export {Doc};

export type CommentToken = SyntaxToken & {
    placement: 'remaining' | 'ownLine' | 'endOfLine';
    leading: boolean;
    trailing: boolean;
    printed: boolean;
    nodeDescription: string;
};

export type WithComments<T extends ast.SyntaxNode = ast.SyntaxNode> = T & {
    comments?: CommentToken[];
};

export type PrintFunc<T extends ast.SyntaxNode = ast.SyntaxNode> = (arg: {
    node: WithComments<T>;
    path: AstPath<WithComments<T>>;
    options: ParserOptions<WithComments<T>>;
    print: (path: AstPath<WithComments | null>) => Doc;
    args?: any;
}) => Doc;

export const lineComments: SyntaxTokenType[] = [
    'BL_LINE_COMMENT', 'NAMESPACE_LINE_COMMENT', 'DEFINITION_LINE_COMMENT', 'KV_LINE_COMMENT', 'KVV_LINE_COMMENT',
];
export const blockComments: SyntaxTokenType[] = [
    'BL_BLOCK_COMMENT', 'NAMESPACE_BLOCK_COMMENT', 'DEFINITION_BLOCK_COMMENT', 'KV_BLOCK_COMMENT', 'KVV_BLOCK_COMMENT',
];
export const comments: SyntaxTokenType[] = [
    ...lineComments, ...blockComments
];

export class BasePrinter {
    readonly space = ' ';
    readonly dot = '.';
    readonly comma = ',';
    readonly colon = ':';
    readonly semi = ';';
    readonly quote = `"`;
    readonly singleQuote = `'`;
    readonly plus = '+';
    readonly vbar = '|';
    readonly div = '/';
    readonly tab = '\t'
    readonly eq = '=';
    readonly builders = doc.builders;

    constructor(
        public readonly options: ParserOptions<WithComments>,
        public readonly print: (path: AstPath<any>) => Doc,
    ) {
    }

    // value => "value"
    literal = (value: Doc) => {
        return this.options.singleQuote
            ? [this.singleQuote, value, this.singleQuote]
            : [this.quote, value, this.quote];
    };
    // value[] => value1, value2, value3
    parameter = (value: Doc[], sep: Doc = [this.comma, this.builders.line]) => {
        return this.builders.join(sep, value);
    };
    // value = { value }
    block = (
        value: Doc,
        options: {
            empty?: boolean;
            groupId?: symbol;
            shouldBreak?: boolean;
            unGroup?: boolean;
            openTag?: string
            closeTag?: string
        } = {},
    ) => {
        const {
            empty = false,
            groupId = Symbol('block'),
            shouldBreak = false,
            unGroup = false,
            openTag = '',
            closeTag = ''
        } = options;
        if (empty) {
            return unGroup ? `${openTag}${closeTag}` : this.builders.group([openTag, closeTag], {id: groupId, shouldBreak});
        }
        const line = this.options.bracketSpacing ? this.builders.hardline : this.builders.softline;
        if (unGroup) {
            return [
                openTag.length > 0 ? [openTag, line] : [],
                value,
                closeTag.length > 0 ? [line, closeTag] : []
            ];
        }
        const beforeLine = this.builders.indentIfBreak(line, {groupId});
        const content = this.builders.indentIfBreak(value, {groupId});
        return this.builders.group([
            openTag.length > 0 ? [openTag, beforeLine] : [],
            content,
            closeTag.length > 0 ? [line, closeTag] : []
        ], {id: groupId, shouldBreak});
    };
    // value => (value)
    tuple = (
        value: Doc,
        options: {
            groupId?: symbol;
            shouldBreak?: boolean;
            unGroup?: boolean;
        } = {},
    ) => {
        const {groupId = Symbol('tuple'), shouldBreak = false, unGroup = false} = options;
        if (unGroup) return ['(', value, ')'];
        const content = this.builders.indentIfBreak(value, {groupId});
        const line = this.builders.softline;
        return this.builders.group(
            ['(', this.builders.indentIfBreak(line, {groupId}), content, line, ')'],
            {id: groupId, shouldBreak},
        );
    };
    // value => [value]
    list = (
        value: Doc,
        options: {
            groupId?: symbol;
            shouldBreak?: boolean;
            unGroup?: boolean;
        } = {},
    ) => {
        const {groupId = Symbol('list'), shouldBreak = false, unGroup = false} = options;
        if (unGroup) return ['[', value, ']'];
        const content = this.builders.indentIfBreak(value, {groupId});
        const line = this.builders.softline;
        return this.builders.group(
            ['[', this.builders.indentIfBreak(line, {groupId}), content, line, ']'],
            {id: groupId, shouldBreak},
        );
    };
    // patch unprinted comments
    comments = (p: AstPath<WithComments>) => {
        if (!p.node?.comments?.length) {
            return '';
        }
        const parts: Doc[] = [];
        p.map((commentPath) => {
            const comment = commentPath.node;
            if (!comment.trailing && !comment.leading && !comment.printed) {
                comment.printed = true;
                parts.push(printComment!(commentPath, this.options as any));
            }
        }, 'comments');
        return this.builders.join(this.builders.line, parts);
    };
}
