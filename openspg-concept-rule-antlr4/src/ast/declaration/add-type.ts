import {BaseNode} from "../base";
import {Identifier} from "../literal";
import {LabelExpression} from "../expression";
import {AddTypeContext, ConceptRuleParserVisitor} from "../../antlr4";

// addType : identifier EQ labelExpression;
export class AddType extends BaseNode {
    type = 'AddType' as const;

    identifier: Identifier
    labelExpression: LabelExpression

    constructor(ctx: AddTypeContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.identifier = ctx.identifier().accept(visitor)
        this.labelExpression = ctx.labelExpression().accept(visitor)
    }
}

