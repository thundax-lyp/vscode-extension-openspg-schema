import {BaseNode} from '../base';
import {ConceptRuleParserVisitor, RuleWrapperRuleDeclarationContext} from '../../antlr4';
import {ConceptRuleDeclaration} from "./concept-rule-declaration";
import {RuleWrapperHead} from "./rule-wrapper-head";


// ruleWrapperDeclaration : ruleWrapperHead (ruleWrapperBody)?;
// ruleWrapperHead : ruleWrapperExpression;
// ruleWrapperBody : WRAPPER_RULE_KEYWORD COLON OPEN_RULE_BLOCK conceptRuleDeclaration* CLOSE_RULE_BLOCK;
export class RuleWrapperRuleDeclaration extends BaseNode {

    type = 'RuleWrapperRuleDeclaration' as const;

    head: RuleWrapperHead
    conceptRules: ConceptRuleDeclaration[]

    constructor(ctx: RuleWrapperRuleDeclarationContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.head = ctx.ruleWrapperRuleHead().accept(visitor);
        this.conceptRules = ctx.ruleWrapperRuleBody().conceptRuleDeclaration().map(x => x.accept(visitor))
    }

}

