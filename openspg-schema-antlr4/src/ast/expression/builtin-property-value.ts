import {BaseNodeString} from '../base';
import {BuiltinPropertyValueContext, SchemaParserVisitor} from "../../antlr4";

/**
 * ### Grammar:
 * ```
 * builtinPropertyValue : 'isA' | 'locateAt' | 'mannerOf' | 'text' | 'vector' | 'textAndVector' | 'sparseVector' | 'textAndSparseVector' | 'notNull' | 'multiValue' ;
 * ```
 */
export class BuiltinPropertyValue extends BaseNodeString {

    type = 'BuiltinPropertyValue' as const;

    keywords = [
        'isA', 'locateAt', 'mannerOf', 'text', 'vector', 'textAndVector',
        'sparseVector', 'textAndSparseVector', 'notNull', 'multiValue',
    ]

    constructor(ctx: BuiltinPropertyValueContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.text = this.keywords.find(x => x.toLowerCase() === this.text.toLowerCase()) ?? ''
    }

}
