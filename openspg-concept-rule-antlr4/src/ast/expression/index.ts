import * as nodeMap from './index.node';
import {UnionSyntaxNode, UnionSyntaxNodeType} from '../base';

export type ExpressionNode = UnionSyntaxNode<typeof nodeMap>;
export type ExpressionNodeType = UnionSyntaxNodeType<typeof nodeMap>;

export const expressionNodeTypes = Object.keys(nodeMap) as ExpressionNodeType[];

export * from './assignment-expression';
export * from './concept-name';
export * from './concept-type';
export * from './edge-pattern';
export * from './element-lookup';
export * from './element-pattern';
export * from './element-pattern-addition';
export * from './element-pattern-declaration-and-filler';
export * from './element-pattern-list';
export * from './element-pattern-where-clause';
export * from './element-variable-declaration';
export * from './expression-set';
export * from './label-expression';
export * from './label-name';
export * from './label-name-list';
export * from './label-property-list';
export * from './logic-rule-expression';
export * from './node-pattern';
export * from './path-pattern';
export * from './path-pattern-list';
export * from './project-rule-expression';
export * from './property-expression';
export * from './rule-expression';
export * from './value-expression';

