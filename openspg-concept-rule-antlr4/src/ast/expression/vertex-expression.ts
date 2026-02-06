import { BaseNode } from "../base";
import { ConceptRuleParserVisitor, VertexExpressionContext } from "../../antlr4";
import { Identifier } from "../literal";
import { LabelPropertyList } from "../expression";

// vertexExpression : vertexName (COMMA vertexName)* (LBRACKET labelPropertyList RBRACKET)?;
// vertexName : identifier;
export class VertexExpression extends BaseNode {
    type = "VertexExpression" as const;

    vertexNames: Identifier[];
    labelPropertyList: LabelPropertyList;

    constructor(ctx: VertexExpressionContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.vertexNames = ctx.vertexName().map((x) => x.accept(visitor));
        this.labelPropertyList = ctx.labelPropertyList()?.accept(visitor) ?? null;
    }
}
