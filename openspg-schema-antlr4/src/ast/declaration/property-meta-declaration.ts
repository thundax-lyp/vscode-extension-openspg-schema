import {BaseNode} from '../base';
import {PropertyMetaDeclarationContext, SchemaParserVisitor} from '../../antlr4';
import {BasicPropertyDeclaration} from "../expression";
import {SubPropertyDeclaration} from "./sub-property-declaration";

/**
 * ### Grammar:
 * ```
 * propertyMetaDeclaration : propertyMetaHead propertyMetaBody? ;
 *
 * propertyMetaHead : basicPropertyDeclaration ;
 *
 * propertyMetaBody : subPropertyDeclaration+ ;
 * ```
 **/
export class PropertyMetaDeclaration extends BaseNode {

    type = 'PropertyMetaDeclaration' as const;

    declaration: BasicPropertyDeclaration
    children: SubPropertyDeclaration[]

    constructor(ctx: PropertyMetaDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.declaration = ctx.propertyMetaHead().accept(visitor)
        this.children = (ctx.propertyMetaBody()?.subPropertyDeclaration() || []).map(x => x.accept(visitor))
    }

}
