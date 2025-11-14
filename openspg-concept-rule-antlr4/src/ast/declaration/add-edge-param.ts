import {BaseNode} from "../base";
import {Identifier} from "../literal";
import {AddEdgeParamContext, ConceptRuleParserVisitor} from "../../antlr4";

// addEdgeParam : identifier EQ identifier;
export class AddEdgeParam extends BaseNode {
    type = 'AddEdgeParam' as const;

    left: Identifier | null = null
    right: Identifier | null = null

    constructor(ctx: AddEdgeParamContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.left = ctx.identifier(0)?.accept(visitor) ?? null
        this.right = ctx.identifier(1)?.accept(visitor) ?? null
    }
}
