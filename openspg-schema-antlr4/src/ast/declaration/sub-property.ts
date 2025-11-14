import {BaseNode} from '../base';
import {SchemaParserVisitor, SubPropertyContext} from '../../antlr4';
import {BasicStructureDeclaration} from "../expression";
import {SubPropertyMeta} from "./sub-property-meta";

export class SubProperty extends BaseNode {

    type = 'SubProperty' as const;

    declaration: BasicStructureDeclaration
    children: SubPropertyMeta[]

    constructor(ctx: SubPropertyContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.declaration = ctx.subPropertyHead().basicStructureDeclaration().accept(visitor)
        this.children = (ctx.subPropertyBody()?.subPropertyMeta() || []).map(x => x.accept(visitor))
    }

}
