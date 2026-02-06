import { BaseNode } from "../base";
import { ConceptRuleParserVisitor, LogicRuleExpressionContext } from "../../antlr4";
import { Identifier } from "../literal";
import { ExpressionSet } from "./expression-set";

export class LogicRuleExpression extends BaseNode {
    type = "LogicRuleExpression" as const;

    identifier: Identifier;
    explain: string = "";
    expressionSet: ExpressionSet;

    constructor(ctx: LogicRuleExpressionContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.identifier = ctx.identifier().accept(visitor);
        this.explain = ctx.explain()?.getText() ?? "";
        this.expressionSet = ctx.expressionSet().accept(visitor);
    }
}
