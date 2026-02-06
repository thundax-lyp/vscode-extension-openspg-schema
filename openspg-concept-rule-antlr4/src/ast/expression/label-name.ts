import { BaseNode } from "../base";
import { ConceptRuleParserVisitor, LabelNameContext } from "../../antlr4";
import { ConceptName } from "./concept-name";
import { ConceptType } from "./concept-type";

// labelName : (conceptName (PLUS conceptName)*) | conceptType;
export class LabelName extends BaseNode {
    type = "LabelName" as const;

    conceptNames: ConceptName[];
    conceptType: ConceptType | null = null;

    constructor(ctx: LabelNameContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.conceptNames = (ctx.conceptName() || []).map((x) => x.accept(visitor));
        this.conceptType = ctx.conceptType()?.accept(visitor) ?? null;
    }
}
