import {BaseNode} from '../base';
import {PropertyDeclarationContext, SchemaParserVisitor} from '../../antlr4';
import {BasicStructureDeclaration} from "../expression";
import {EntityDeclaration} from "./entity-declaration";

/**
 * ### Grammar:
 * ```
 * propertyDeclaration : propertyHead propertyBody? ;
 *
 * propertyHead : basicStructureDeclaration ;
 *
 * propertyBody : propertyBody : INDENT entityDeclaration+ DEDENT ;
 * ```
 **/
export class PropertyDeclaration extends BaseNode {

    type = 'PropertyDeclaration' as const;

    declaration: BasicStructureDeclaration
    children: EntityDeclaration[]

    constructor(ctx: PropertyDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.declaration = ctx.propertyHead().basicPropertyDeclaration().accept(visitor)
        this.children = (ctx.propertyBody()?.entityDeclaration() || []).map(x => x.accept(visitor))
    }

}
