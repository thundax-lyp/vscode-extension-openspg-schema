import {BaseNodeString} from "../base";
import {ConceptRuleParserVisitor, ParserRuleContext} from "../../antlr4";

// theActionHead : ACTION_KEYWORD ;
export class TheActionHead extends BaseNodeString {

    type = 'TheActionHead' as const;

    constructor(ctx: ParserRuleContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.text = 'Action'
    }
}
