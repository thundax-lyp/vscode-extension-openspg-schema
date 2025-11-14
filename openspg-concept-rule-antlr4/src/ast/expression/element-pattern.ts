import {BaseNode} from '../base';
import {ConceptRuleParserVisitor, ElementPatternContext} from '../../antlr4';
import {NodePattern} from "./node-pattern";
import {ElementPatternAddition} from "./element-pattern-addition";


// elementPattern : nodePattern (elementPatternAddition)*;
export class ElementPattern extends BaseNode {

    type = 'ElementPattern' as const;

    nodePattern: NodePattern
    additions: ElementPatternAddition[]

    constructor(ctx: ElementPatternContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.nodePattern = ctx.nodePattern().accept(visitor)
        this.additions = ctx.elementPatternAddition().map(x => x.accept(visitor))
    }

}
