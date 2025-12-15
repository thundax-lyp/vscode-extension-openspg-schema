import * as nodeMap from './index.node';
import {UnionSyntaxNode, UnionSyntaxNodeType} from '../base';

export type ExpressionNode = UnionSyntaxNode<typeof nodeMap>;
export type ExpressionNodeType = UnionSyntaxNodeType<typeof nodeMap>;

export const expressionNodeTypes = Object.keys(nodeMap) as ExpressionNodeType[];

export * from './add-edge-function';
export * from './add-node-function';
export * from './assignment-expression';
export * from './concept-instance-id';
export * from './concept-name';
export * from './concept-type';
export * from './edge-expression';
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
export * from './node-function-param';
export * from './node-pattern';
export * from './object-function-param';
export * from './path-pattern';
export * from './path-pattern-list';
export * from './project-rule-expression';
export * from './property-expression';
export * from './the-action-expression';
export * from './the-rule-expression';
export * from './type-function-param';
export * from './value-expression';
export * from './vertex-expression';

