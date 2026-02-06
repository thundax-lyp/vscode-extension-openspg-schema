import { BaseNodeUnion } from "../base";
import { ConceptRuleParserVisitor, GraphStructureContext } from "../../antlr4";
import { EdgeExpression, VertexExpression } from "../expression";

export type GraphStructureNode = EdgeExpression | VertexExpression;

// graphStructure : defineEdge | defineVertex;
export class GraphStructure extends BaseNodeUnion<EdgeExpression | VertexExpression> {
    constructor(ctx: GraphStructureContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, [ctx.edgeExpression(), ctx.vertexExpression()], visitor);
    }
}
