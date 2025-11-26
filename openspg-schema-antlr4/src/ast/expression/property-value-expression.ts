import {BaseNode} from '../base';
import {PropertyValueExpressionContext, SchemaParserVisitor} from '../../antlr4';
import {PropertyValueVariableNode} from "./property-value-variable";


/**
 * ### Grammar:
 * ```
 * propertyValueExpression : propertyValueVariable ;
 *
 * propertyValueVariable : builtinPropertyValue | blockPropertyValue | basicPropertyValue ;
 * ```
 */
export class PropertyValueExpression extends BaseNode {

    type = 'PropertyValueExpression' as const;

    /**
     * ```typescript
     * export type PropertyValueVariableNode =
     *     | BuiltinPropertyValue
     *     | BlockPropertyValue
     *     | BasicPropertyValue
     * ```
     * > **Links**:
     * > - {@link BuiltinPropertyValue}
     * > - {@link BlockPropertyValue}>
     * > - {@link BasicPropertyValue}
     */
    variable: PropertyValueVariableNode;

    constructor(ctx: PropertyValueExpressionContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.variable = ctx.propertyValueVariable().accept(visitor);
    }

}
