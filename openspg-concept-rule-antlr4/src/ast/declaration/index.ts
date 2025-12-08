import * as nodeMap from './index.node';
import {UnionSyntaxNode, UnionSyntaxNodeType} from '../base';

export type DeclarationNode = UnionSyntaxNode<typeof nodeMap>;
export type DeclarationNodeType = UnionSyntaxNodeType<typeof nodeMap>;

export const declarationNodeTypes = Object.keys(nodeMap) as DeclarationNodeType[];

export * from './concept-rule-declaration';
export * from './concept-rule-head';
export * from './graph-structure';
export * from './namespace-declaration';
export * from './namespace-variable';
export * from './rule-wrapper-declaration';
export * from './rule-wrapper-head';
export * from './rule-wrapper-rule-declaration';
export * from './rule-wrapper-rule-head';
export * from './the-action-declaration';
export * from './the-action-head';
export * from './the-graph-structure-declaration';
export * from './the-graph-structure-head';
export * from './the-rule-declaration';
export * from './the-rule-head';

