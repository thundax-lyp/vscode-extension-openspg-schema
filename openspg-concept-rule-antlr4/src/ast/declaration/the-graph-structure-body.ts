import {BaseNodeUnion} from "../base";
import {ConceptRuleParserVisitor, TheGraphStructureBodyContext} from "../../antlr4";
import {GraphStructureList} from "./graph-structure-list";
import {PathPatternList} from "../expression";


// theGraphStructureBody : graphStructureList | pathPatternList;
export class TheGraphStructureBody extends BaseNodeUnion<
    | GraphStructureList
    | PathPatternList
> {
    constructor(ctx: TheGraphStructureBodyContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, [
            ctx.graphStructureList(),
            ctx.pathPatternList(),
        ], visitor);
    }

}
