import {BaseNode} from "../base";
import {BaseRuleDefineContext, ConceptRuleParserVisitor} from "../../antlr4";
import {TheGraphStructure} from "./the-graph-structure";
import {TheRule} from "./the-rule";
import {TheAction} from "./the-action";


// baseRuleDefine : theGraphStructure theRule? theAction?;
export class BaseRuleDefine extends BaseNode {

    type = 'BaseRuleDefine' as const;

    theGraphStructure: TheGraphStructure;
    theRule: TheRule | null = null;
    theAction: TheAction | null = null;

    constructor(ctx: BaseRuleDefineContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);

        this.theGraphStructure = ctx.theGraphStructure().accept(visitor)
        this.theRule = ctx.theRule()?.accept(visitor) ?? null
        this.theAction = ctx.theAction()?.accept(visitor) ?? null
    }
}
