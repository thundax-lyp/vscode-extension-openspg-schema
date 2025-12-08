import {BaseNodeString} from "../base";
import {ConceptRuleParserVisitor, TheRuleHeadContext} from "../../antlr4";


/**
 * ### Grammar:
 * ```
 * theRuleHead : 'Constraint' | 'Rule' ;
 * ```
 **/
export class TheRuleHead extends BaseNodeString {

    type = 'TheRuleHead' as const;

    constructor(ctx: TheRuleHeadContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.text = ctx.getText().toLowerCase() === 'rule' ? 'Rule' : 'Constraint'
    }
}
