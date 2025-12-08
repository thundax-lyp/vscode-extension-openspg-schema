import {BaseNode} from "../base";
import {ConceptRuleParserVisitor, TheRuleDeclarationContext} from "../../antlr4";
import {TheRuleHead} from "./the-rule-head";
import {TheRuleExpressionNode} from "../expression";


// theRuleDeclaration : theRuleHead LBRACE theRuleBody RBRACE;
// theRuleHead : CONSTRAINT_KEYWORD | RULE_KEYWORD;
// theRuleBody : theRuleExpression*;
export class TheRuleDeclaration extends BaseNode {

    type = 'TheRuleDeclaration' as const;

    head: TheRuleHead
    expressions: TheRuleExpressionNode[]

    constructor(ctx: TheRuleDeclarationContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.head = ctx.theRuleHead().accept(visitor)
        this.expressions = ctx.theRuleBody().theRuleExpression().map(x => x.accept(visitor))
    }
}
