import {BaseNode} from '../base';
import {ConceptRuleParserVisitor, LabelExpressionContext} from '../../antlr4';
import {LabelName} from "./label-name";


// labelExpression : labelName (VBAR labelName)*;
export class LabelExpression extends BaseNode {

    type = 'LabelExpression' as const;

    labelNames: LabelName[]

    constructor(ctx: LabelExpressionContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.labelNames = ctx.labelName().map((x) => x.accept(visitor))
    }

}
