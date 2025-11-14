import {BaseNodeString} from "../base";
import {ConceptRuleParserVisitor, ParserRuleContext} from "../../antlr4";

// theGraphStructureHead : GRAPH_STRUCTURE_KEYWORD | STRUCTURE_KEYWORD;
export class TheGraphStructureHead extends BaseNodeString {

    type = 'TheGraphStructureHead' as const;

    constructor(ctx: ParserRuleContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.text = ctx.getText().toLowerCase() === 'structure' ? 'Structure' : 'GraphStructure'
    }
}
