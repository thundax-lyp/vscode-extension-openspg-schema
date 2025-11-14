import * as doc from 'prettier/doc';
import {Printer} from 'prettier';
import {blockComments, comments, CommentToken} from './base';


export const isBlockComment: Printer<CommentToken>['isBlockComment'] = (node: any) => {
    return node?.type && blockComments.includes(node.type);
};

export const canAttachComment: Printer<CommentToken>['canAttachComment'] = (node: any) =>
    !!node?.type && !comments.includes(node.type);

export const printComment: Printer<CommentToken>['printComment'] = (path, _options) => {
    const comment = path.node;
    if (!comment.text) {
        return '';
    }

    // console.log('-'.repeat(10) + '>>>')
    // console.log(comment.placement)
    // console.log(comment.text)
    // console.log('-'.repeat(10) + '<<<')

    if (comment.text.startsWith('#')) {
        const content = comment.text.substring(1).trim();
        return ['# ', content];
    }

    const isMultiline = comment.text.includes('\n');

    if (comment.text.startsWith('/*') && comment.text.endsWith('*/')) {
        const lines = comment.text
            .slice(2, -2)
            .split('\n')
            .map((line) => {
                const trimmed = line.trim();
                if (trimmed.startsWith('*')) {
                    return trimmed.slice(1).trim();
                }
                return trimmed;
            })
            .filter(Boolean);

        if (isMultiline) {
            return [
                ['/**', doc.builders.hardline],
                doc.builders.join(
                    doc.builders.hardline, lines.map((line) => [' * ', line]),
                ),
                doc.builders.hardline,
                [' */'],
            ];
        }
        return ['/* ', lines, ' */'];
    }

    return comment.text;
};

// Prettier offers a clean way to define ignored properties.
export const massageAstNode: Printer<CommentToken>['massageAstNode'] = () => {
};
(<any>massageAstNode).ignoredProperties = new Set(['location', 'range', 'comments']);

export const handleComments: Printer<CommentToken>['handleComments'] = {
    ownLine: (commentNode, text, options, ast, isLastComment) => false,
    endOfLine: (commentNode, text, options, ast, isLastComment) => false,
    remaining: (commentNode, text, options, ast, isLastComment) => false,
};
