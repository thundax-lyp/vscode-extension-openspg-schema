import {BaseNodeString} from '../base';
import {SchemaParserVisitor, StandardStructureTypeContext} from "../../antlr4";

/**
 * ### Grammar:
 * ```
 * standardStructureType : 'StandardType.' identifier ;
 * ```
 */
export class StandardStructureType extends BaseNodeString {

    type = 'StandardStructureType' as const;

    constructor(ctx: StandardStructureTypeContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        const parts = this.text.split('.')
        if (parts.length > 1) {
            parts[0] = 'StandardType'
        }
        this.text = parts.join('.')
    }

}
