import {BaseNode} from "../base";
import {ConceptRuleParserVisitor, TheRuleContext} from "../../antlr4";
import {RuleExpression} from "../expression";


export class TheRule extends BaseNode {

    type = 'TheRule' as const;

    head: string
    expressions: RuleExpression[]

    constructor(ctx: TheRuleContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.head = ctx.ruleHead().getText().toLowerCase() === 'rule' ? 'Rule' : 'Constraint'
        this.expressions = ctx.ruleExpressionBody().ruleExpression().map(x => x.accept(visitor))
    }
}
