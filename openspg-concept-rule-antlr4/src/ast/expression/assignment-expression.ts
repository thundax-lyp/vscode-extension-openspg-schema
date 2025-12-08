import {BaseNode} from '../base';
import {AssignmentExpressionContext, ConceptRuleParserVisitor} from '../../antlr4';
import {Identifier} from "../literal";
import {ExpressionSet} from "./expression-set";


// assignmentExpression : identifier EQ expressionSet;
export class AssignmentExpression extends BaseNode {

    type = 'AssignmentExpression' as const;

    variable: Identifier
    expressionSet: ExpressionSet

    constructor(ctx: AssignmentExpressionContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.variable = ctx.identifier().accept(visitor)
        this.expressionSet = ctx.expressionSet().accept(visitor)
    }

}
