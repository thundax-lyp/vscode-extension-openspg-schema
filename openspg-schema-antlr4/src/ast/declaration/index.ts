import * as nodeMap from './index.node';
import {UnionSyntaxNode, UnionSyntaxNodeType} from '../base';

export type DeclarationNode = UnionSyntaxNode<typeof nodeMap>;
export type DeclarationNodeType = UnionSyntaxNodeType<typeof nodeMap>;

export const declarationNodeTypes = Object.keys(nodeMap) as DeclarationNodeType[];

export * from './entity-declaration';
export * from './entity-meta-declaration';
export * from './namespace-declaration';
export * from './namespace-variable';
export * from './property-declaration';
export * from './property-meta-declaration';
export * from './sub-property-declaration';
export * from './sub-property-meta-declaration';

