import { BaseNode } from "../base";
import { PropertyNameExpressionContext, SchemaParserVisitor } from "../../antlr4";
import { PropertyNameVariableNode } from "./property-name-variable";

/**
 * ### Grammar:
 * ```
 * propertyNameExpression : propertyNameVariable ;
 *
 * propertyNameVariable : builtinPropertyName | basicPropertyName ;
 * ```
 */
export class PropertyNameExpression extends BaseNode {
    type = "PropertyNameExpression" as const;

    /**
     * ```typescript
     * export type PropertyNameVariableNode =
     *     | BuiltinPropertyName
     *     | BasicPropertyName
     * ```
     * > **Links**:
     * > - {@link BuiltinPropertyName}
     * > - {@link BasicPropertyName}
     */
    variable: PropertyNameVariableNode;

    constructor(ctx: PropertyNameExpressionContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.variable = ctx.propertyNameVariable().accept(visitor);
    }
}
