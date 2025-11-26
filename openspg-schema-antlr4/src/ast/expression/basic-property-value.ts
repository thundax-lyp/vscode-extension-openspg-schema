import {BaseNodeString} from '../base';
import {BasicPropertyValueContext, SchemaParserVisitor} from "../../antlr4";

/**
 * ### Grammar:
 * ```
 * basicPropertyValue : identifier+ ;
 * ```
 */
export class BasicPropertyValue extends BaseNodeString {

    type = 'BasicPropertyValue' as const;

    constructor(ctx: BasicPropertyValueContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.text = (ctx.children || []).map(x => x.getText()).join(' ')
    }

}
