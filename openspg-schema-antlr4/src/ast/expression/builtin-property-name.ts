import { BaseNodeString } from "../base";
import { BuiltinPropertyNameContext, SchemaParserVisitor } from "../../antlr4";

/**
 * ### Grammar:
 * ```
 * builtinPropertyName:  'desc' | 'properties' | 'relations' | 'hypernympPredicate' | 'regular' | 'spreadable' | 'autoRelate' | 'constraint' | 'rule' | 'index' ;
 * ```
 */
const KEYWORDS = [
    "desc",
    "properties",
    "relations",
    "hypernympPredicate",
    "regular",
    "spreadable",
    "autoRelate",
    "constraint",
    "rule",
    "index"
];

export class BuiltinPropertyName extends BaseNodeString {
    type = "BuiltinPropertyName" as const;

    constructor(ctx: BuiltinPropertyNameContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.text = KEYWORDS.find((x) => x.toLowerCase() === this.text.toLowerCase()) ?? "";
    }
}
