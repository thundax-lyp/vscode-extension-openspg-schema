import { BaseNodeUnion } from "../base";
import { ConceptRuleParserVisitor, TheRuleExpressionContext } from "../../antlr4";
import { ProjectRuleExpression } from "./project-rule-expression";
import { LogicRuleExpression } from "./logic-rule-expression";
import { ExpressionSet } from "./expression-set";

export type TheRuleExpressionNode = ProjectRuleExpression | LogicRuleExpression | ExpressionSet;

// theRuleExpression : projectRuleExpression | logicRuleExpression | expressionSet;
export class TheRuleExpression extends BaseNodeUnion<ProjectRuleExpression | LogicRuleExpression | ExpressionSet> {
    constructor(ctx: TheRuleExpressionContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, [ctx.projectRuleExpression(), ctx.logicRuleExpression(), ctx.expressionSet()], visitor);
    }
}
