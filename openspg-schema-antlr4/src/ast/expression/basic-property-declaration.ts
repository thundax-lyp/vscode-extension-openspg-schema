import { BaseNode } from "../base";
import { BasicPropertyDeclarationContext, SchemaParserVisitor } from "../../antlr4";
import { PropertyNameExpression } from "./property-name-expression";
import { PropertyValueExpression } from "./property-value-expression";

/**
 * ### Grammar:
 * ```
 * basicPropertyDeclaration : propertyNameDeclaration ':' propertyValueDeclaration? ;
 * ```
 * ### Example:
 * ```
 * desc: a great work
 * ```
 * ### Example:
 * ```
 * desc: [[a great work]]
 * ```
 **/
export class BasicPropertyDeclaration extends BaseNode {
    type = "BasicPropertyDeclaration" as const;

    name: PropertyNameExpression;
    value: PropertyValueExpression | null;

    constructor(ctx: BasicPropertyDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.name = ctx.propertyNameExpression().accept(visitor);
        this.value = ctx.propertyValueExpression()?.accept(visitor) ?? null;
    }
}
