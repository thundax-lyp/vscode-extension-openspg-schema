import { BaseNode } from "../base";
import { BasicStructureDeclarationContext, SchemaParserVisitor } from "../../antlr4";
import { StructureNameExpression } from "./structure-name-expression";
import { StructureAliasExpression } from "./structure-alias-expression";
import { StructureTypeExpressionNode } from "./structure-type-expression";

/**
 * ### Grammar:
 * ```
 * basicStructureDeclaration : structureNameDeclaration '(' structureAliasDeclaration ')' structureTypeDeclaration ;
 * ```
 * ### Example:
 * ```
 * Person(人物): EntityType
 * ```
 */
export class BasicStructureDeclaration extends BaseNode {
    type = "BasicStructureDeclaration" as const;

    name: StructureNameExpression;
    alias: StructureAliasExpression;

    /**
     * ```typescript
     * export type StructureTypeExpressionNode =
     *     | BasicStructureTypeExpression
     *     | InheritedStructureTypeExpression
     * ```
     * > **Links**:
     * > - {@link BasicStructureTypeExpression}
     * > - {@link InheritedStructureTypeExpression}
     */
    structureType: StructureTypeExpressionNode;

    constructor(ctx: BasicStructureDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.name = ctx.structureNameExpression().accept(visitor);
        this.alias = ctx.structureAliasExpression().accept(visitor);
        this.structureType = ctx.structureTypeExpression().accept(visitor);
    }
}
