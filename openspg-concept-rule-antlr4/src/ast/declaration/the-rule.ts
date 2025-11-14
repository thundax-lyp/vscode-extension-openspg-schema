import {BaseNode} from "../base";
import {ConceptRuleParserVisitor, TheRuleContext} from "../../antlr4";
import {TheRuleHead} from "./the-rule-head";
import {TheRuleBody} from "./the-rule-body";


// theRule : theRuleHead LBRACE theRuleBody RBRACE;
export class TheRule extends BaseNode {

    type = 'TheRule' as const;

    head: TheRuleHead
    body: TheRuleBody

    constructor(ctx: TheRuleContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.head = ctx.theRuleHead().accept(visitor)
        this.body = ctx.theRuleBody().accept(visitor)
    }
}
