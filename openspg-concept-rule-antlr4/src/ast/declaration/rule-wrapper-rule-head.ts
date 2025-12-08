import {BaseNodeString} from '../base';
import {ConceptRuleParserVisitor, RuleWrapperRuleHeadContext} from '../../antlr4';


/**
 * ### Grammar:
 * ```
 * ruleWrapperDeclaration : ruleWrapperHead ruleWrapperBody ;
 *
 * ruleWrapperHead : labelExpression (COLON labelExpression)+ | labelExpression COLON ;
 *
 * ruleWrapperBody : ruleWrapperRuleDeclaration* ;
 * ```
 **/
export class RuleWrapperRuleHead extends BaseNodeString {

    type = 'RuleWrapperRuleHead' as const;

    constructor(ctx: RuleWrapperRuleHeadContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.text = "rule";
    }

}

