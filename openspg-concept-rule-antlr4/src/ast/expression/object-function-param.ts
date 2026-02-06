import { BaseNode } from "../base";
import { Identifier } from "../literal";
import { AssignmentExpression } from "./index";
import { ConceptRuleParserVisitor, ObjectFunctionParamContext } from "../../antlr4";

// complexObjExpr : LBRACE assignmentExpression* RBRACE;
// complexObjExpression : LBRACE assignmentExpression* RBRACE;
export class ObjectFunctionParam extends BaseNode {
    type = "ObjectFunctionParam" as const;

    identifier: Identifier;
    expressions: AssignmentExpression[];

    constructor(ctx: ObjectFunctionParamContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.identifier = ctx.identifier().accept(visitor);
        this.expressions = ctx
            .complexObjExpression()
            .assignmentExpression()
            .map((x) => x.accept(visitor));
    }
}
