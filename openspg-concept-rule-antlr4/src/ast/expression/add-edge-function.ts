import { BaseNode } from "../base";
import { AddEdgeFunctionContext, ConceptRuleParserVisitor } from "../../antlr4";
import { NodeFunctionParam } from "./node-function-param";
import { TypeFunctionParam } from "./type-function-param";
import { ObjectFunctionParam } from "./object-function-param";

// addEdgeFunction : ADD_EDGE_KEYWORD LPARENTH nodeFunctionParam COMMA nodeFunctionParam COMMA typeFunctionParam COMMA objectFunctionParam RPARENTH;
export class AddEdgeFunction extends BaseNode {
    type = "AddEdgeFunction" as const;

    sourceNode: NodeFunctionParam | null = null;
    targetNode: NodeFunctionParam | null = null;
    typeParam: TypeFunctionParam;
    props: ObjectFunctionParam;

    constructor(ctx: AddEdgeFunctionContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.sourceNode = ctx.nodeFunctionParam(0)?.accept(visitor)!;
        this.targetNode = ctx.nodeFunctionParam(1)?.accept(visitor)!;
        this.typeParam = ctx.typeFunctionParam().accept(visitor);
        this.props = ctx.objectFunctionParam().accept(visitor);
    }
}
