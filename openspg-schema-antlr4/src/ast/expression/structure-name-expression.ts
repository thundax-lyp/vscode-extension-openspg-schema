import { BaseNode } from "../base";
import { SchemaParserVisitor, StructureNameExpressionContext } from "../../antlr4";
import { StructureName } from "./structure-name";

/**
 * ### Grammar:
 * ```
 * structureNameExpression : structureName ;
 * ```
 */
export class StructureNameExpression extends BaseNode {
    type = "StructureNameExpression" as const;

    variable: StructureName;

    constructor(ctx: StructureNameExpressionContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.variable = ctx.structureName().accept(visitor);
    }
}
