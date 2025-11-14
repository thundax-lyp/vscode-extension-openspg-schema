import {BaseNode} from '../base';
import {EntityContext, SchemaParserVisitor} from '../../antlr4';
import {BasicStructureDeclaration} from "../expression";
import {EntityMeta} from "./entity-meta";

export class Entity extends BaseNode {

    type = 'Entity' as const;

    declaration: BasicStructureDeclaration
    children: EntityMeta[]

    constructor(ctx: EntityContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.declaration = ctx.entityHead().basicStructureDeclaration().accept(visitor)
        this.children = (ctx.entityBody()?.entityMeta() || []).map(x => x.accept(visitor))
    }

}
