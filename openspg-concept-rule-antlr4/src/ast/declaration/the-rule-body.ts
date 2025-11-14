import {BaseNode} from "../base";
import {ConceptRuleParserVisitor, TheRuleBodyContext} from "../../antlr4";
import {RuleExpression} from "../expression";


// theRuleBody : ruleExpression*;
export class TheRuleBody extends BaseNode {

    type = 'TheRuleBody' as const;

    expressions: RuleExpression[]

    constructor(ctx: TheRuleBodyContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.expressions = ctx.ruleExpression().map(x => x.accept(visitor))
    }
}
