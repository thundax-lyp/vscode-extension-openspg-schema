import * as nodeMap from './index.node';
import {UnionSyntaxNode, UnionSyntaxNodeType} from '../base';

export type DeclarationNode = UnionSyntaxNode<typeof nodeMap>;
export type DeclarationNodeType = UnionSyntaxNodeType<typeof nodeMap>;

export const declarationNodeTypes = Object.keys(nodeMap) as DeclarationNodeType[];

export * from './entity';
export * from './entity-meta';
export * from './namespace';
export * from './property';
export * from './property-meta';
export * from './sub-property';
export * from './sub-property-meta';

