import { BaseNodeString } from "../base";
import { ConceptRuleParserVisitor, ExpressionSetContext } from "../../antlr4";

// expressionSet : graphGroupOpExpress | listOpExpress | valueExpression;
export class ExpressionSet extends BaseNodeString {
    type = "ExpressionSet" as const;

    constructor(ctx: ExpressionSetContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
    }
}
