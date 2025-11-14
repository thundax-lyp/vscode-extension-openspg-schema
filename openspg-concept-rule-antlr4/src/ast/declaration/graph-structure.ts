import {BaseNodeUnion} from "../base";
import {ConceptRuleParserVisitor, GraphStructureContext} from "../../antlr4";
import {DefineEdge} from "./define-edge";
import {DefineVertex} from "./define-vertex";

// graphStructure : defineEdge | defineVertex;
export class GraphStructure extends BaseNodeUnion<
    | DefineEdge
    | DefineVertex
> {
    constructor(ctx: GraphStructureContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, [
            ctx.defineEdge(),
            ctx.defineVertex(),
        ],visitor);
    }
}

