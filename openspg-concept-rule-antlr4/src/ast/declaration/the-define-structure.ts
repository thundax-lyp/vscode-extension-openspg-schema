import {BaseNode} from "../base";
import {ConceptRuleParserVisitor, TheDefineStructureContext} from "../../antlr4";
import {BaseRuleDefine} from "./base-rule-define";
import {PredicatedDefine} from "./predicated-define";

// theDefineStructure : DEFINE_KEYWORD predicatedDefine LBRACE baseRuleDefine RBRACE;
export class TheDefineStructure extends BaseNode {

    type = 'TheDefineStructure' as const;

    predicatedDefine: PredicatedDefine
    baseRuleDefine: BaseRuleDefine

    constructor(ctx: TheDefineStructureContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);

        this.predicatedDefine = ctx.predicatedDefine().accept(visitor)
        this.baseRuleDefine = ctx.baseRuleDefine().accept(visitor)
    }
}
