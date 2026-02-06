import { BaseNode } from "../base";
import { ConceptRuleParserVisitor, ConceptTypeContext } from "../../antlr4";
import { Identifier } from "../literal";

// conceptType : identifier (DOT identifier)?;
export class ConceptType extends BaseNode {
    type = "ConceptType" as const;

    identifiers: Identifier[];

    constructor(ctx: ConceptTypeContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.identifiers = ctx.identifier().map((x) => x.accept(visitor));
    }
}
