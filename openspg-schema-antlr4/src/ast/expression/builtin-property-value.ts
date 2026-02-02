import {BaseNodeString} from '../base';
import {BuiltinPropertyValueContext, SchemaParserVisitor} from "../../antlr4";

/**
 * ### Grammar:
 * ```
 * builtinPropertyValue : 'isA' | 'locateAt' | 'mannerOf' | 'text' | 'vector' | 'textAndVector' | 'sparseVector' | 'textAndSparseVector' | 'notNull' | 'multiValue' ;
 * ```
 */
const KEYWORDS = [
    'isA', 'locateAt', 'mannerOf', 'text', 'vector', 'textAndVector',
    'sparseVector', 'textAndSparseVector', 'notNull', 'multiValue',
]

export class BuiltinPropertyValue extends BaseNodeString {

    type = 'BuiltinPropertyValue' as const;

    constructor(ctx: BuiltinPropertyValueContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.text = KEYWORDS.find(x => x.toLowerCase() === this.text.toLowerCase()) ?? ''
    }

}
