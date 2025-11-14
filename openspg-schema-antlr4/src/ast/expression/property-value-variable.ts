import {BaseNodeUnion} from '../base';
import {PropertyValueVariableContext, SchemaParserVisitor} from '../../antlr4';
import {BuiltinPropertyValue} from "./builtin-property-value";
import {BasicPropertyValue} from "./basic-property-value";
import {BlockPropertyValue} from "./block-property-value";

// propertyValueVariable   : builtinPropertyValue | blockPropertyValue | basicPropertyValue;
export class PropertyValueVariable extends BaseNodeUnion<
    | BuiltinPropertyValue
    | BlockPropertyValue
    | BasicPropertyValue
> {

    constructor(ctx: PropertyValueVariableContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, [
            ctx.builtinPropertyValue(),
            ctx.blockPropertyValue(),
            ctx.basicPropertyValue(),
        ], visitor);
    }

}
