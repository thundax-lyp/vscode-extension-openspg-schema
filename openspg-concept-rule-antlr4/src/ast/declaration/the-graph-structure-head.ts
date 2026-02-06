import { BaseNodeString } from "../base";
import { ConceptRuleParserVisitor, ParserRuleContext } from "../../antlr4";

/**
 * ### Grammar:
 * ```
 * theGraphStructureHead : 'Graph' | 'GraphStructure' ;
 * ```
 **/
export class TheGraphStructureHead extends BaseNodeString {
    type = "TheGraphStructureHead" as const;

    constructor(ctx: ParserRuleContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.text = ctx.getText().toLowerCase() === "structure" ? "Structure" : "GraphStructure";
    }
}
