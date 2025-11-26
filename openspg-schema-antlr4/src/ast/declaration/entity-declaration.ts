import {BaseNode} from '../base';
import {EntityDeclarationContext, SchemaParserVisitor} from '../../antlr4';
import {BasicStructureDeclaration} from "../expression";
import {EntityMetaDeclaration} from "./entity-meta-declaration";

export class EntityDeclaration extends BaseNode {

    type = 'EntityDeclaration' as const;

    declaration: BasicStructureDeclaration
    children: EntityMetaDeclaration[]

    constructor(ctx: EntityDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.declaration = ctx.entityHead().basicStructureDeclaration().accept(visitor)
        this.children = (ctx.entityBody()?.entityMetaDeclaration() || []).map(x => x.accept(visitor))
    }

}
