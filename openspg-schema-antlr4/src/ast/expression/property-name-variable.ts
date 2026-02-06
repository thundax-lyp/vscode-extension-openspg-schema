import { BaseNodeUnion } from "../base";
import { PropertyNameVariableContext, SchemaParserVisitor } from "../../antlr4";
import { BuiltinPropertyName } from "./builtin-property-name";
import { BasicPropertyName } from "./basic-property-name";

export type PropertyNameVariableNode = BuiltinPropertyName | BasicPropertyName;

// propertyNameVariable    : builtinPropertyName | basicPropertyName ;
export class PropertyNameVariable extends BaseNodeUnion<BuiltinPropertyName | BasicPropertyName> {
    constructor(ctx: PropertyNameVariableContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, [ctx.builtinPropertyName(), ctx.basicPropertyName()], visitor);
    }
}
