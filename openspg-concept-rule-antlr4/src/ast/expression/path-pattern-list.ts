import {BaseNode} from "../base";
import {ConceptRuleParserVisitor, PathPatternListContext} from "../../antlr4";
import {PathPattern} from "./path-pattern";

// pathPatternList : pathPattern+;
export class PathPatternList extends BaseNode {

    type = 'PathPatternList' as const;

    patterns: PathPattern[]

    constructor(ctx: PathPatternListContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor)
        this.patterns = ctx.pathPattern().map(x => x.accept(visitor))
    }

}
