import { BaseNode } from "../base";
import { ConceptRuleParserVisitor, TheGraphStructureDeclarationContext } from "../../antlr4";
import { PathPattern } from "../expression";
import { GraphStructureNode } from "./graph-structure";
import { TheGraphStructureHead } from "./the-graph-structure-head";

/**
 * ### Grammar:
 * ```
 * theGraphStructureDeclaration : theGraphStructureHead '{' theGraphStructureBody? '}' ;
 *
 * theGraphStructureHead : 'Graph' | 'GraphStructure' ;
 *
 * theGraphStructureBody : graphStructureList | pathPatternList ;
 * ```
 **/
export class TheGraphStructureDeclaration extends BaseNode {
    type = "TheGraphStructureDeclaration" as const;

    head: TheGraphStructureHead;
    graphStructures: GraphStructureNode[];
    pathPatterns: PathPattern[];

    constructor(ctx: TheGraphStructureDeclarationContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.head = ctx.theGraphStructureHead().accept(visitor);
        this.graphStructures = (ctx.theGraphStructureBody()?.graphStructureList()?.graphStructure() || []).map((x) =>
            x.accept(visitor)
        );
        this.pathPatterns = (ctx.theGraphStructureBody()?.pathPatternList()?.pathPattern() || []).map((x) =>
            x.accept(visitor)
        );
    }
}
