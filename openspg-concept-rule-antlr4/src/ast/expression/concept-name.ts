import { BaseNode } from "../base";
import { ConceptNameContext, ConceptRuleParserVisitor } from "../../antlr4";
import { ConceptType } from "./concept-type";
import { ConceptInstanceId } from "./concept-instance-id";

// conceptName : conceptType DIV conceptInstanceId;
// conceptInstanceId : ESCAPED_SYMBOLIC_NAME;
export class ConceptName extends BaseNode {
    type = "ConceptName" as const;

    conceptType: ConceptType;
    instanceId: ConceptInstanceId;

    constructor(ctx: ConceptNameContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.conceptType = ctx.conceptType().accept(visitor);
        this.instanceId = ctx.conceptInstanceId().accept(visitor);
    }
}
