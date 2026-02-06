import { BaseNode } from "../base";
import { ConceptRuleParserVisitor, LabelNameListContext } from "../../antlr4";
import { LabelName } from "./label-name";

// labelNameList : labelName (COMMA labelName)*;
export class LabelNameList extends BaseNode {
    type = "LabelNameList" as const;

    labelNames: LabelName[];

    constructor(ctx: LabelNameListContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.labelNames = ctx.labelName().map((x) => x.accept(visitor));
    }
}
