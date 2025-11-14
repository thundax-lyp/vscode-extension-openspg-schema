import {BaseNode} from '../base';
import {ConceptRuleParserVisitor, RuleWrapperContext} from '../../antlr4';
import {RuleWrapperHead} from "./rule-wrapper-head";
import {RuleWrapperBody} from "./rule-wrapper-body";


export class RuleWrapper extends BaseNode {

    type = 'RuleWrapper' as const;

    head: RuleWrapperHead
    body: RuleWrapperBody | null = null

    constructor(ctx: RuleWrapperContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.head = ctx.ruleWrapperHead().accept(visitor)
        this.body = ctx.ruleWrapperBody()?.accept(visitor) ?? null
    }

}

