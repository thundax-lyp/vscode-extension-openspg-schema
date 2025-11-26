import {BaseNode} from '../base';
import {PropertyDeclarationContext, SchemaParserVisitor} from '../../antlr4';
import {BasicStructureDeclaration} from "../expression";
import {PropertyMetaDeclaration} from "./property-meta-declaration";

/**
 * ### Grammar:
 * ```
 * propertyDeclaration : propertyHead propertyBody? ;
 *
 * propertyHead : basicStructureDeclaration ;
 *
 * propertyBody : propertyMetaDeclaration+ ;
 * ```
 **/
export class PropertyDeclaration extends BaseNode {

    type = 'PropertyDeclaration' as const;

    declaration: BasicStructureDeclaration
    children: PropertyMetaDeclaration[]

    constructor(ctx: PropertyDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.declaration = ctx.propertyHead().basicStructureDeclaration().accept(visitor)
        this.children = (ctx.propertyBody()?.propertyMetaDeclaration() || []).map(x => x.accept(visitor))
    }

}
