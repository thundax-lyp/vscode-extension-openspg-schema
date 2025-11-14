import {BaseNode} from '../base';
import {ConceptRuleParserVisitor, ElementPatternAdditionContext} from '../../antlr4';
import {NodePattern} from "./node-pattern";
import {EdgePattern} from "./edge-pattern";


// elementPatternAddition : edgePattern nodePattern;
export class ElementPatternAddition extends BaseNode {

    type = 'ElementPatternAddition' as const;

    edgePattern: EdgePattern
    nodePattern: NodePattern

    constructor(ctx: ElementPatternAdditionContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.edgePattern = ctx.edgePattern().accept(visitor)
        this.nodePattern = ctx.nodePattern().accept(visitor)
    }

}
