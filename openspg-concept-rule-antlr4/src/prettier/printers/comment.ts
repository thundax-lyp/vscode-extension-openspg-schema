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

    if (comment.text.startsWith('//')) {
        const content = comment.text.replace(/^[\s\/]+/, '')
        return ['// ', content];
    }

    const isMultiline = comment.text.includes('\n');

    if (comment.text.startsWith('/*') && comment.text.endsWith('*/')) {
        const lines = comment.text
            .slice(2, -2)
            .split('\n')
            .map((line) => line
                .replace(/^[\s*]+/, '')
                .replace(/[\s*]+$/, '')
            )
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
    ownLine: () => false,
    endOfLine: () => false,
    remaining: () => false,
};
