import { BaseNode } from "../base";
import { ConceptRuleParserVisitor, LabelPropertyListContext } from "../../antlr4";
import { LabelNameList } from "./label-name-list";
import { PropertyExpression } from "./property-expression";

// labelPropertyList : (labelNameList | propertyExpression) (COMMA propertyExpression)*;
export class LabelPropertyList extends BaseNode {
    type = "LabelPropertyList" as const;

    labelNameList: LabelNameList | null = null;
    propertyExpressions: PropertyExpression[];

    constructor(ctx: LabelPropertyListContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);

        this.labelNameList = ctx.labelNameList()?.accept(visitor) ?? null;
        this.propertyExpressions = ctx.propertyExpression().map((x) => x.accept(visitor));
    }
}
