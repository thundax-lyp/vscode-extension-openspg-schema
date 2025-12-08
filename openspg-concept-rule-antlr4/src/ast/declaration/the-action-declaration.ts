import {BaseNode} from "../base";
import {ConceptRuleParserVisitor, TheActionDeclarationContext} from "../../antlr4";
import {TheActionHead} from "./the-action-head";
import {TheActionExpressionNode} from "../expression";


/**
 * ### Grammar:
 * ```
 * theActionDeclaration : theActionHead '{' theActionBody '}' ;
 *
 * theActionHead : 'Action' ;
 *
 * theActionBody : theActionExpression*
 * ```
 **/
export class TheActionDeclaration extends BaseNode {
    type = 'TheActionDeclaration' as const;

    head: TheActionHead;
    expressions: TheActionExpressionNode[]

    constructor(ctx: TheActionDeclarationContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.head = ctx.theActionHead().accept(visitor);
        this.expressions = ctx.theActionBody().theActionExpression().map(x => x.accept(visitor))
    }
}
