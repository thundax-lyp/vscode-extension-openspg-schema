import {BaseNode} from "../base";
import {ConceptRuleParserVisitor, TheGraphStructureContext} from "../../antlr4";
import {TheGraphStructureHead} from "./the-graph-structure-head";
import {TheGraphStructureBody} from "./the-graph-structure-body";

// theGraphStructure : theGraphStructureHead LBRACE theGraphStructureBody? RBRACE;
export class TheGraphStructure extends BaseNode {

    type = 'TheGraphStructure' as const;

    head: TheGraphStructureHead
    body: TheGraphStructureBody | null = null

    constructor(ctx: TheGraphStructureContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.head = ctx.theGraphStructureHead().accept(visitor)
        this.body = ctx.theGraphStructureBody()?.accept(visitor) ?? null
    }

}
