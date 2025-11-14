import {BaseNode} from '../base';
import {PropertyContext, SchemaParserVisitor} from '../../antlr4';
import {BasicStructureDeclaration} from "../expression";
import {PropertyMeta} from "./property-meta";

export class Property extends BaseNode {

    type = 'Property' as const;

    declaration: BasicStructureDeclaration
    children: PropertyMeta[]

    constructor(ctx: PropertyContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.declaration = ctx.propertyHead().basicStructureDeclaration().accept(visitor)
        this.children = (ctx.propertyBody()?.propertyMeta() || []).map(x => x.accept(visitor))
    }

}
