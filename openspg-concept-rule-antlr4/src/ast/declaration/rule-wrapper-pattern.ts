import {BaseNode} from '../base';
import {ConceptRuleParserVisitor, RuleWrapperPatternContext} from '../../antlr4';
import {LabelExpression} from "../expression";


// ruleWrapperPattern :  labelExpression (COLON labelExpression)+ | labelExpression COLON;
export class RuleWrapperPattern extends BaseNode {

    type = 'RuleWrapperPattern' as const;

    labelExpressions: LabelExpression[];

    constructor(ctx: RuleWrapperPatternContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.labelExpressions = ctx.labelExpression().map(x => x.accept(visitor))
    }

}

