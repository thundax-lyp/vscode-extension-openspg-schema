import {BaseNode} from "../base";
import {AddEdgeContext, ConceptRuleParserVisitor} from "../../antlr4";
import {AddEdgeParam} from "./add-edge-param";
import {AddType} from "./add-type";
import {AddProps} from "./add-props";

// addEdge : ADD_EDGE_KEYWORD LPARENTH addEdgeParam COMMA addEdgeParam COMMA addType COMMA addProps RPARENTH;
export class AddEdge extends BaseNode {
    type = 'AddEdge' as const;

    sourceEdgeParam: AddEdgeParam | null = null
    targetEdgeParam: AddEdgeParam | null = null
    addType: AddType
    addProps: AddProps

    constructor(ctx: AddEdgeContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.sourceEdgeParam = ctx.addEdgeParam(0)?.accept(visitor) ?? null
        this.targetEdgeParam = ctx.addEdgeParam(1)?.accept(visitor) ?? null
        this.addType = ctx.addType().accept(visitor)
        this.addProps = ctx.addProps().accept(visitor)
    }
}
