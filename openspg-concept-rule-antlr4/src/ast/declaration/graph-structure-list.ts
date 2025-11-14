import {BaseNode} from "../base";
import {ConceptRuleParserVisitor, GraphStructureListContext} from "../../antlr4";
import {GraphStructure} from "./graph-structure";

// graphStructureList : graphStructure+;
export class GraphStructureList extends BaseNode {

    type = 'GraphStructureList' as const;

    graphStructures: GraphStructure[]

    constructor(ctx: GraphStructureListContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.graphStructures = ctx.graphStructure().map(x => x.accept(visitor))
    }

}
