import {BaseNodeUnion} from '../base';
import {ConceptRuleParserVisitor, RuleExpressionContext} from '../../antlr4';
import {ProjectRuleExpression} from "./project-rule-expression";
import {LogicRuleExpression} from "./logic-rule-expression";
import {ExpressionSet} from "./expression-set";

// ruleExpression : projectRuleExpression | logicRuleExpression | expressionSet;
export class RuleExpression extends BaseNodeUnion<
    | ProjectRuleExpression
    | LogicRuleExpression
    | ExpressionSet
> {
    constructor(ctx: RuleExpressionContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, [
            ctx.projectRuleExpression(),
            ctx.logicRuleExpression(),
            ctx.expressionSet()
        ], visitor);
    }
}
