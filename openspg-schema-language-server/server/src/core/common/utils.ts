import { Position } from 'vscode-languageserver';

/**
 * check the second point is after the first point
 *
 * @param first position of the first point
 * @param second position of the second point
 */
export const isAfter = (first: Position, second: Position): boolean => {
    if (first.line !== second.line) {
        return first.line < second.line;
    }
    return first.character < second.character;
};
