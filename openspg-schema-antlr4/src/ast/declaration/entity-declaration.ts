import { BaseNode } from "../base";
import { EntityDeclarationContext, SchemaParserVisitor } from "../../antlr4";
import { BasicStructureDeclaration } from "../expression";
import { PropertyDeclaration } from "./property-declaration";

/**
 * ### Grammar:
 * ```
 * entityDeclaration : entityHead entityBody? ;
 *
 * entityHead : basicStructureDeclaration ;
 *
 * entityBody : INDENT propertyDeclaration+ DEDENT ;
 * ```
 **/
export class EntityDeclaration extends BaseNode {
    type = "EntityDeclaration" as const;

    declaration: BasicStructureDeclaration;
    children: PropertyDeclaration[];

    constructor(ctx: EntityDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.declaration = ctx.entityHead().basicStructureDeclaration().accept(visitor);
        this.children = (ctx.entityBody()?.propertyDeclaration() || []).map((x) => x.accept(visitor));
    }
}
