import * as nodeMap from './index.node';
import {UnionSyntaxNode, UnionSyntaxNodeType} from '../base';

export type ExpressionNode = UnionSyntaxNode<typeof nodeMap>;
export type ExpressionNodeType = UnionSyntaxNodeType<typeof nodeMap>;

export const expressionNodeTypes = Object.keys(nodeMap) as ExpressionNodeType[];

export * from './basic-property-declaration';
export * from './basic-property-name';
export * from './basic-property-value';
export * from './basic-structure-declaration';
export * from './basic-structure-type';
export * from './basic-structure-type-declaration';
export * from './basic-structure-type-variable';
export * from './block-property-value';
export * from './builtin-property-name';
export * from './builtin-property-value';
export * from './inherited-structure-type-declaration';
export * from './inherited-structure-type-variable';
export * from './knowledge-structure-type';
export * from './property-name-declaration';
export * from './property-name-variable';
export * from './property-value-declaration';
export * from './property-value-variable';
export * from './standard-structure-type';
export * from './structure-alias';
export * from './structure-alias-declaration';
export * from './structure-name';
export * from './structure-name-declaration';
export * from './structure-real-name';
export * from './structure-semantic-name';
export * from './structure-type-declaration';
export * from './variable-structure-type';

