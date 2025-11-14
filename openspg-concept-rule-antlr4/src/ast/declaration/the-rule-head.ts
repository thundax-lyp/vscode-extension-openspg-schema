import {BaseNodeString} from "../base";
import {ConceptRuleParserVisitor, TheRuleHeadContext} from "../../antlr4";


// theRuleHead : CONSTRAINT_KEYWORD | RULE_KEYWORD;
export class TheRuleHead extends BaseNodeString {

    type = 'TheRuleHead' as const;

    constructor(ctx: TheRuleHeadContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.text = ctx.getText().toLowerCase() === 'rule' ? 'Rule' : 'Constraint'
    }
}
