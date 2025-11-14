import {BaseNode} from '../base';
import {ConceptRuleParserVisitor, PropertyExpressionContext} from '../../antlr4';

// propertyExpression: propertyKey EQ propertyValue;
// propertyKey : identifier;
// propertyValue : numericLiteral | identifier | characterStringLiteral | parameterValueSpecification;
export class PropertyExpression extends BaseNode {

    type = 'PropertyExpression' as const;

    key: string
    value: string

    constructor(ctx: PropertyExpressionContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);

        this.key = ctx.propertyKey().getText()
        this.value = ctx.propertyValue().getText()
    }

}
