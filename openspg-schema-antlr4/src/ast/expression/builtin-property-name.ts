import {BaseNodeString} from '../base';
import {BuiltinPropertyNameContext, SchemaParserVisitor} from "../../antlr4";

// builtinPropertyName :
//     | DESC_KEYWORD | PROPERTIES_KEYWORD | RELATIONS_KEYWORD | HYPERNYMP_PREDICATE_KEYWORD | REGULAR_KEYWORD
//     | SPREADABLE_KEYWORD | AUTORELATE_KEYWORD | CONSTRAINT_KEYWORD | RULE_KEYWORD | INDEX_KEYWORD
export class BuiltinPropertyName extends BaseNodeString {

    type = 'BuiltinPropertyName' as const;

    keywords = [
        'desc', 'properties', 'relations', 'hypernympPredicate', 'regular',
        'spreadable', 'autoRelate', 'constraint', 'rule', 'index',
    ]

    constructor(ctx: BuiltinPropertyNameContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.text = this.keywords.find(x => x.toLowerCase() === this.text.toLowerCase()) ?? ''
    }

}
