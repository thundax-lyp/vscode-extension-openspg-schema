import {BaseNode} from "../base";
import {ConceptRuleParserVisitor, PathPatternContext} from "../../antlr4";
import {Identifier} from "../literal";
import {ElementPatternList} from "./element-pattern-list";


// pathPattern : (pathCondition? pathVariable COLON )? elementPatternList;
// pathCondition : OPTIONAL_KEYWORD;
// pathVariable : identifier;
export class PathPattern extends BaseNode {

    type = 'PathPattern' as const;

    condition: string | null = null
    variable: Identifier | null = null

    elementPatterns: ElementPatternList

    constructor(ctx: PathPatternContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        if (ctx.pathCondition()) {
            this.condition = 'Optional'
        }
        this.variable = ctx.pathVariable()?.accept(visitor) ?? null
        this.elementPatterns = ctx.elementPatternList().accept(visitor)
    }
}
