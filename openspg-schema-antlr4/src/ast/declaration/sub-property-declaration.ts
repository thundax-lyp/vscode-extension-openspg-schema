import {BaseNode} from '../base';
import {SchemaParserVisitor, SubPropertyDeclarationContext} from '../../antlr4';
import {BasicStructureDeclaration} from "../expression";
import {SubPropertyMetaDeclaration} from "./sub-property-meta-declaration";

export class SubPropertyDeclaration extends BaseNode {

    type = 'SubPropertyDeclaration' as const;

    declaration: BasicStructureDeclaration
    children: SubPropertyMetaDeclaration[]

    constructor(ctx: SubPropertyDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.declaration = ctx.subPropertyHead().basicStructureDeclaration().accept(visitor)
        this.children = (ctx.subPropertyBody()?.subPropertyMetaDeclaration() || []).map(x => x.accept(visitor))
    }

}
