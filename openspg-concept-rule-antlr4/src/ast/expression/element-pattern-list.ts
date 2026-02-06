import { BaseNode } from "../base";
import { ConceptRuleParserVisitor, ElementPatternListContext } from "../../antlr4";
import { ElementPattern } from "./element-pattern";

// elementPatternList : elementPattern (COMMA elementPattern)*;
export class ElementPatternList extends BaseNode {
    type = "ElementPatternList" as const;

    elementPatterns: ElementPattern[];

    constructor(ctx: ElementPatternListContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.elementPatterns = ctx.elementPattern().map((x) => x.accept(visitor));
    }
}
