import {BaseNodeUnion} from '../base';
import {ConceptRuleParserVisitor, RuleWrapperHeadContext} from '../../antlr4';


// ruleWrapperHead : ruleWrapperPattern;
export class RuleWrapperHead extends BaseNodeUnion {

    constructor(ctx: RuleWrapperHeadContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, [
            ctx.ruleWrapperPattern(),
        ], visitor);
    }

}

