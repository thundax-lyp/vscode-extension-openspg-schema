import * as nodeMap from './index.node';
import {UnionSyntaxNode, UnionSyntaxNodeType} from '../base';

export type MetaNode = UnionSyntaxNode<typeof nodeMap>;
export type MetaNodeType = UnionSyntaxNodeType<typeof nodeMap>;

export const metaNodeTypes = Object.keys(nodeMap) as MetaNodeType[];

export * from './source-unit';

