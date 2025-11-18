import {BaseNode} from '../base';
import {SchemaParserVisitor, SourceUnitContext} from '../../antlr4';
import {EntityDeclaration, NamespaceDeclaration} from '../declaration';

type SourceUnitNode =
    | NamespaceDeclaration
    | EntityDeclaration
    ;

export class SourceUnit extends BaseNode {

    type = 'SourceUnit' as const;

    // 子节点
    nodes: SourceUnitNode[] = [];

    constructor(ctx: SourceUnitContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.nodes = (ctx.children || []).map((child) => visitor.visit(child)!).filter(Boolean);
    }

}
