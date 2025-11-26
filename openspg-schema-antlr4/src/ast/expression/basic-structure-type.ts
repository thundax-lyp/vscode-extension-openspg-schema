import {BaseNodeString} from '../base';
import {BasicStructureTypeContext, SchemaParserVisitor} from "../../antlr4";

/**
 * ### Grammar:
 * ```
 * basicStructureType : ('BasicType.')? ('Integer' | 'Float' | 'Text') ;
 * ```
 * ### Example:
 * ```
 * BasicType.Integer
 * ```
 * ### Example:
 * ```
 * Text
 * ```
 */
export class BasicStructureType extends BaseNodeString {

    type = 'BasicStructureType' as const;

    constructor(ctx: BasicStructureTypeContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.text = ctx.getText().split('.')
            .map(x => x.substring(0, 1).toUpperCase() + x.substring(1))
            .join('.')
    }

}
