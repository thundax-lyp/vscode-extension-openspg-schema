import {BaseNode} from '../base';
import {ConceptRuleParserVisitor, RuleWrapperRuleDeclarationContext} from '../../antlr4';
import {ConceptRuleDeclaration} from "./concept-rule-declaration";
import {RuleWrapperHead} from "./rule-wrapper-head";


/**
 * ### Grammar:
 * ```
 * ruleWrapperRuleDeclaration : ruleWrapperRuleHead ':' '[[' ruleWrapperRuleBody ']]' ;
 *
 * ruleWrapperRuleHead : 'rule' ;
 *
 * ruleWrapperRuleBody : conceptRuleDeclaration* ;
 * ```
 **/
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

