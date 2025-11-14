import * as nodeMap from './index.node';
import {UnionSyntaxNode, UnionSyntaxNodeType} from '../base';

export type DeclarationNode = UnionSyntaxNode<typeof nodeMap>;
export type DeclarationNodeType = UnionSyntaxNodeType<typeof nodeMap>;

export const declarationNodeTypes = Object.keys(nodeMap) as DeclarationNodeType[];

export * from './add-edge';
export * from './add-edge-param';
export * from './add-node';
export * from './add-props';
export * from './add-type';
export * from './base-rule-define';
export * from './define-edge';
export * from './define-vertex';
export * from './graph-structure';
export * from './graph-structure-list';
export * from './namespace';
export * from './namespace-value';
export * from './predicated-define';
export * from './rule-wrapper';
export * from './rule-wrapper-body';
export * from './rule-wrapper-head';
export * from './rule-wrapper-pattern';
export * from './the-action';
export * from './the-define-structure';
export * from './the-graph-structure';
export * from './the-graph-structure-body';
export * from './the-graph-structure-head';
export * from './the-rule';
export * from './the-rule-body';
export * from './the-rule-head';

