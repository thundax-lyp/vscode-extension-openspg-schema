import {BaseNode} from '../base';
import {ConceptRuleParserVisitor, RuleWrapperHeadContext} from '../../antlr4';
import {LabelExpression} from "../expression";


// ruleWrapperHead : labelExpression (COLON labelExpression)+ | labelExpression COLON ;
export class RuleWrapperHead extends BaseNode {

    type = 'RuleWrapperHead' as const;

    labelExpressions: LabelExpression[];

    constructor(ctx: RuleWrapperHeadContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.labelExpressions = ctx.labelExpression().map(x => x.accept(visitor))
    }

}

