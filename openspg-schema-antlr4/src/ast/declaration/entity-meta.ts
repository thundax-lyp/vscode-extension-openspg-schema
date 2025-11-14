import {BaseNode} from '../base';
import {EntityMetaContext, SchemaParserVisitor} from '../../antlr4';
import {BasicPropertyDeclaration} from "../expression";
import {Property} from "./property";

export class EntityMeta extends BaseNode {

    type = 'EntityMeta' as const;

    declaration: BasicPropertyDeclaration
    children: Property[]

    constructor(ctx: EntityMetaContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.declaration = ctx.entityMetaHead().accept(visitor)
        this.children = (ctx.entityMetaBody()?.property() || []).map(x => x.accept(visitor))
    }

}
