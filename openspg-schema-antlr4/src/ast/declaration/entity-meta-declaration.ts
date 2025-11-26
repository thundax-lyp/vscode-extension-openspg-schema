import {BaseNode} from '../base';
import {EntityMetaDeclarationContext, SchemaParserVisitor} from '../../antlr4';
import {BasicPropertyDeclaration} from "../expression";
import {PropertyDeclaration} from "./property-declaration";

/**
 * ### Grammar:
 * ```
 * entityMetaDeclaration : entityMetaHead entityMetaBody? ;
 *
 * entityMetaHead : basicStructureDeclaration ;
 *
 * entityMetaBody : entityMetaDeclaration+ ;
 * ```
 **/
export class EntityMetaDeclaration extends BaseNode {

    type = 'EntityMetaDeclaration' as const;

    declaration: BasicPropertyDeclaration
    children: PropertyDeclaration[]

    constructor(ctx: EntityMetaDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.declaration = ctx.entityMetaHead().accept(visitor)
        this.children = (ctx.entityMetaBody()?.propertyDeclaration() || []).map(x => x.accept(visitor))
    }

}
