import { BaseNodeUnion } from "../base";
import { ConceptRuleParserVisitor, TheActionExpressionContext } from "../../antlr4";
import { AddNodeFunction } from "./add-node-function";
import { AddEdgeFunction } from "./add-edge-function";

export type TheActionExpressionNode = AddNodeFunction | AddEdgeFunction;

// theActionExpression: addNodeFunction | addEdgeFunction ;
export class TheActionExpression extends BaseNodeUnion<AddNodeFunction | AddEdgeFunction> {
    constructor(ctx: TheActionExpressionContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, [ctx.addNodeFunction(), ctx.addEdgeFunction()], visitor);
    }
}
