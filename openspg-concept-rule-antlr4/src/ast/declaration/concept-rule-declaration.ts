import {BaseNode} from "../base";
import {ConceptRuleDeclarationContext, ConceptRuleParserVisitor} from "../../antlr4";
import {TheGraphStructureDeclaration} from "./the-graph-structure-declaration";
import {ConceptRuleHead} from "./concept-rule-head";
import {TheRuleDeclaration} from "./the-rule-declaration";
import {TheActionDeclaration} from "./the-action-declaration";

/**
 * ### Grammar:
 * ```
 * conceptRuleDeclaration : conceptRuleHead '{' conceptRuleBody '}' ;
 *
 * conceptRuleHead : 'Define' nodePattern fullEdgePointingRight nodePattern ;
 *
 * conceptRuleBody : theGraphStructureDeclaration theRuleDeclaration? theActionDeclaration? ;
 * ```
 **/
export class ConceptRuleDeclaration extends BaseNode {

    type = 'ConceptRuleDeclaration' as const;

    head: ConceptRuleHead;

    theGraph: TheGraphStructureDeclaration
    theRule: TheRuleDeclaration | null = null;
    theAction: TheActionDeclaration | null = null;

    constructor(ctx: ConceptRuleDeclarationContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);

        this.head = ctx.conceptRuleHead().accept(visitor)

        this.theGraph = ctx.conceptRuleBody().theGraphStructureDeclaration().accept(visitor)
        this.theRule = ctx.conceptRuleBody().theRuleDeclaration()?.accept(visitor) ?? null
        this.theAction = ctx.conceptRuleBody().theActionDeclaration()?.accept(visitor) ?? null
    }
}
