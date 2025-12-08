import {BaseNode} from "../base";
import {Identifier} from "../literal";
import {LabelExpression} from "./index";
import {ConceptRuleParserVisitor, TypeFunctionParamContext} from "../../antlr4";

// typeFunctionParam : identifier EQ labelExpression;
export class TypeFunctionParam extends BaseNode {
    type = 'TypeFunctionParam' as const;

    identifier: Identifier
    labelExpression: LabelExpression

    constructor(ctx: TypeFunctionParamContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.identifier = ctx.identifier().accept(visitor)
        this.labelExpression = ctx.labelExpression().accept(visitor)
    }
}

