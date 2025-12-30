import {BaseNode} from "../base";
import {ConceptRuleDeclarationContext, ConceptRuleParserVisitor} from "../../antlr4";
import {ConceptRuleHead} from "./concept-rule-head";
import {ConceptRuleItemNode} from "./concept-rule-item";

/**
 * ### Grammar:
 * ```
 * conceptRuleDeclaration : conceptRuleHead '{' conceptRuleBody '}' ;
 *
 * conceptRuleHead : 'Define' nodePattern fullEdgePointingRight nodePattern ;
 *
 * conceptRuleBody : conceptRuleItem* ;
 *
 * conceptRuleItem : theGraphStructureDeclaration | theRuleDeclaration | theActionDeclaration ;
 * ```
 **/
export class ConceptRuleDeclaration extends BaseNode {

    type = 'ConceptRuleDeclaration' as const;

    head: ConceptRuleHead;

    children: ConceptRuleItemNode[];

    constructor(ctx: ConceptRuleDeclarationContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);

        this.head = ctx.conceptRuleHead().accept(visitor)

        this.children = ctx.conceptRuleBody().conceptRuleItem().map(x => x.accept(visitor))
    }
}
