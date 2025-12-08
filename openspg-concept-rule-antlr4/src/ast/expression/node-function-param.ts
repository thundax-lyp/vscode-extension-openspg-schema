import {BaseNode} from "../base";
import {Identifier} from "../literal";
import {ConceptRuleParserVisitor, NodeFunctionParamContext} from "../../antlr4";

// nodeFunctionParam : identifier EQ identifier;
export class NodeFunctionParam extends BaseNode {
    type = 'NodeFunctionParam' as const;

    left: Identifier
    right: Identifier

    constructor(ctx: NodeFunctionParamContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.left = ctx.identifier(0)?.accept(visitor)!
        this.right = ctx.identifier(1)?.accept(visitor)!
    }
}
