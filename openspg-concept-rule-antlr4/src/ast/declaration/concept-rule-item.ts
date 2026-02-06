import { BaseNodeUnion } from "../base";
import { ConceptRuleItemContext, ConceptRuleParserVisitor } from "../../antlr4";
import { TheGraphStructureDeclaration } from "./the-graph-structure-declaration";
import { TheRuleDeclaration } from "./the-rule-declaration";
import { TheActionDeclaration } from "./the-action-declaration";

export type ConceptRuleItemNode = TheGraphStructureDeclaration | TheRuleDeclaration | TheActionDeclaration;

// conceptRuleItem : theGraphStructureDeclaration | theRuleDeclaration | theActionDeclaration ;
export class ConceptRuleItem extends BaseNodeUnion<
    TheGraphStructureDeclaration | TheRuleDeclaration | TheActionDeclaration
> {
    constructor(ctx: ConceptRuleItemContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, [ctx.theGraphStructureDeclaration(), ctx.theRuleDeclaration(), ctx.theActionDeclaration()], visitor);
    }
}
