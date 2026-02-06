import { BaseNode } from "../base";
import { ConceptRuleHeadContext, ConceptRuleParserVisitor } from "../../antlr4";
import { NodePattern } from "../expression";

/**
 * ### Grammar:
 * ```
 * conceptRuleHead : 'Define' nodePattern fullEdgePointingRight nodePattern ;
 * ```
 **/
export class ConceptRuleHead extends BaseNode {
    type = "ConceptRuleHead" as const;

    left: NodePattern;
    operator: string;
    right: NodePattern;

    constructor(ctx: ConceptRuleHeadContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);

        this.left = ctx.nodePattern(0)!.accept(visitor);
        this.operator = ctx.fullEdgePointingRight().getText();
        this.right = ctx.nodePattern(1)!.accept(visitor);
    }
}
