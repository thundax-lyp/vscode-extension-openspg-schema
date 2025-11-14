import {BaseNode} from "../base";
import {Identifier} from "../literal";
import {AssignmentExpression} from "../expression";
import {AddPropsContext, ConceptRuleParserVisitor} from "../../antlr4";

// addProps : identifier EQ complexObjExpr;
// complexObjExpr : LBRACE assignmentExpression* RBRACE;
export class AddProps extends BaseNode {

    type = 'AddProps' as const;

    identifier: Identifier
    assignmentExpressions: AssignmentExpression[]

    constructor(ctx: AddPropsContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.identifier = ctx.identifier().accept(visitor)
        this.assignmentExpressions = ctx.complexObjExpr().assignmentExpression().map(x => x.accept(visitor))
    }
}
