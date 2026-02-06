import { BaseNode } from "../base";
import { ConceptRuleParserVisitor, ProjectRuleExpressionContext } from "../../antlr4";
import { Identifier } from "../literal";
import { ExpressionSet } from "./expression-set";

// projectRuleExpression : identifier (DOT propertyName)? explain? EQ expressionSet;
export class ProjectRuleExpression extends BaseNode {
    type = "ProjectRuleExpression" as const;

    identifier: Identifier;
    propertyName: Identifier | null = null;
    explain: string = "";
    expressionSet: ExpressionSet;

    constructor(ctx: ProjectRuleExpressionContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.identifier = ctx.identifier().accept(visitor);
        this.propertyName = ctx.propertyName()?.identifier().accept(visitor) ?? null;
        this.explain = ctx.explain()?.unbrokenCharacterStringLiteral().getText() ?? "";
        this.expressionSet = ctx.expressionSet().accept(visitor);
    }
}
