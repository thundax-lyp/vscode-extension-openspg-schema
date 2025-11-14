import {BaseNode} from '../base';
import {SchemaParserVisitor, SourceUnitContext} from '../../antlr4';
import {Entity, Namespace} from '../declaration';

type SourceUnitNodes =
    | Namespace
    | Entity
    ;

export class SourceUnit extends BaseNode {

    type = 'SourceUnit' as const;

    // 子节点
    nodes: SourceUnitNodes[] = [];

    constructor(ctx: SourceUnitContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        // this.nodes = (ctx.children || []).map((child) => visitor.visit(child)!).filter(Boolean);
        this.nodes = (ctx.children || []).map((child) => visitor.visit(child)!);
    }

}
