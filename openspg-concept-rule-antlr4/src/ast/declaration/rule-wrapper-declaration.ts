import {BaseNode} from '../base';
import {ConceptRuleParserVisitor, RuleWrapperDeclarationContext} from '../../antlr4';
import {RuleWrapperHead} from "./rule-wrapper-head";
import {RuleWrapperRuleDeclaration} from "./rule-wrapper-rule-declaration";


// ruleWrapperDeclaration : ruleWrapperHead (ruleWrapperBody)?;
// ruleWrapperHead : ruleWrapperExpression;
// ruleWrapperBody : WRAPPER_RULE_KEYWORD COLON OPEN_RULE_BLOCK conceptRuleDeclaration* CLOSE_RULE_BLOCK;
export class RuleWrapperDeclaration extends BaseNode {

    type = 'RuleWrapperDeclaration' as const;

    head: RuleWrapperHead;
    rules: RuleWrapperRuleDeclaration[];

    constructor(ctx: RuleWrapperDeclarationContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.head = ctx.ruleWrapperHead().accept(visitor);
        this.rules = ctx.ruleWrapperBody().ruleWrapperRuleDeclaration().map(x => x.accept(visitor))
    }

}

