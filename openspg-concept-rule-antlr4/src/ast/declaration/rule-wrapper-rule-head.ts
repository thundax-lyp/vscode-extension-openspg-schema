import {BaseNodeString} from '../base';
import {ConceptRuleParserVisitor, RuleWrapperRuleHeadContext} from '../../antlr4';


/**
 * ### Grammar:
 * ```
 * ruleWrapperRuleHead : 'rule' ;
 * ```
 **/
export class RuleWrapperRuleHead extends BaseNodeString {

    type = 'RuleWrapperRuleHead' as const;

    constructor(ctx: RuleWrapperRuleHeadContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.text = "rule";
    }

}

