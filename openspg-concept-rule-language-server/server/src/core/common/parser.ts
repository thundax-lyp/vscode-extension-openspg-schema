import { PartialDeep } from "type-fest";
import * as syntax from "openspg-concept-rule-antlr4";

// visit nodes
export const visitEnter = (ast: syntax.SyntaxNode, enter: syntax.VisitHandlers["enter"]) =>
    syntax.visit(ast, { enter });

// visit nodes when exit
export const visitExit = (ast: syntax.SyntaxNode, exit: syntax.VisitHandlers["exit"]) => syntax.visit(ast, { exit });

export type QueryFilter = PartialDeep<syntax.SyntaxNode> | syntax.SyntaxNodeType;

export const getNodes = <T extends syntax.SyntaxNode = syntax.SyntaxNode>(
    ast: syntax.SyntaxNode,
    callback: (p: syntax.TraversePath) => boolean
): T[] => {
    const nodes: T[] = [];
    syntax.visit(ast, {
        enter(path) {
            if (callback(path)) nodes.push(path.node as any);
        }
    });
    return nodes;
};

/**
 * Check if the node matches the filters
 * @param _path traverse path
 * @param _filters from parent to child
 */
export const checkNode = <T extends syntax.SyntaxNode>(_path: syntax.TraversePath<T>, _filters: QueryFilter[]) => {
    const filters = _filters.map((filter) =>
        typeof filter === "string" ? { type: filter } : filter
    ) as PartialDeep<syntax.SyntaxNode>[];

    if (!filters.length) {
        return true;
    }
    let path: syntax.TraversePath | null = _path as any;

    for (let index = filters.length - 1; index >= 0; index -= 1) {
        const filter = filters[index];
        if (!path || !path.matches(filter)) {
            return false;
        }
        path = path.parentPath;
    }
    return true;
};
