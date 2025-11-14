import {BaseNodeString} from '../base';
import {KnowledgeStructureTypeContext, SchemaParserVisitor} from "../../antlr4";

// builtinPropertyValue :
//     | IS_A_KEYWORD | LOCATE_AT_KEYWORD | MANNER_OF_KEYWORD | TEXT_KEYWORD | VECTOR_KEYWORD | TEXT_AND_VECTOR_KEYWORD
//     | SPARSE_VECTOR_KEYWORD | TEXT_AND_SPARSE_VECTOR_KEYWORD | NOT_NULL_KEYWORD | MULTI_VALUE_KEYWORD
export class BuiltinPropertyValue extends BaseNodeString {

    type = 'BuiltinPropertyValue' as const;

    keywords = [
        'isA', 'locateAt', 'mannerOf', 'text', 'vector', 'textAndVector',
        'sparseVector', 'textAndSparseVector', 'notNull', 'multiValue',
    ]

    constructor(ctx: KnowledgeStructureTypeContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.text = this.keywords.find(x => x.toLowerCase() === this.text.toLowerCase()) ?? ''
    }

}
