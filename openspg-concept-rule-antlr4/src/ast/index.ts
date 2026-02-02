import * as nodeMap from "./index.node";

import {DeclarationNode} from "./declaration";
import {ExpressionNode} from "./expression";
import {LiteralNode} from "./literal";
import {MetaNode} from "./meta";

export type SyntaxNode =
    | DeclarationNode
    | ExpressionNode
    | LiteralNode
    | MetaNode
    ;

export type SyntaxNodeType = SyntaxNode['type'];

export const syntaxNodeTypes = Object.keys(nodeMap) as SyntaxNodeType[];


export * from "./declaration";
export * from "./expression";
export * from "./literal";
export * from "./meta";
export * from "./base";
