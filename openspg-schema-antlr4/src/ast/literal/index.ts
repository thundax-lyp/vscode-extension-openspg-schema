import * as nodeMap from "./index.node";
import { UnionSyntaxNode, UnionSyntaxNodeType } from "../base";

export type LiteralNode = UnionSyntaxNode<typeof nodeMap>;
export type LiteralNodeType = UnionSyntaxNodeType<typeof nodeMap>;

export const literalNodeTypes = Object.keys(nodeMap) as LiteralNodeType[];

export * from "./block-content";
export * from "./identifier";
