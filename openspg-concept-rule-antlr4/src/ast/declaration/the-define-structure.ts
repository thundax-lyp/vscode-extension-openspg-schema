import {BaseNode} from "../base";
import {ConceptRuleParserVisitor, TheDefineStructureContext} from "../../antlr4";
import {TheGraphStructure} from "./the-graph-structure";
import {TheRule} from "./the-rule";
import {TheAction} from "./the-action";

export class TheDefineStructure extends BaseNode {
    type = 'TheDefineStructure' as const;

    predicatedDefine: string;

    theGraphStructure: TheGraphStructure;
    theRule: TheRule | null = null;
    theAction: TheAction | null = null;

    constructor(ctx: TheDefineStructureContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);

        this.predicatedDefine = ctx.predicatedDefine().getText()

        this.theGraphStructure = ctx.baseRuleDefine().theGraphStructure().accept(visitor)
        this.theRule = ctx.baseRuleDefine().theRule()?.accept(visitor) ?? null
        this.theAction = ctx.baseRuleDefine().theAction()?.accept(visitor) ?? null
    }
}
