import {BaseNode} from '../base';
import {ConceptRuleParserVisitor, NodePatternContext} from '../../antlr4';
import {ElementPatternDeclarationAndFiller} from "./element-pattern-declaration-and-filler";


export class NodePattern extends BaseNode {

    type = 'NodePattern' as const;

    declarationAndFiller : ElementPatternDeclarationAndFiller

    constructor(ctx: NodePatternContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.declarationAndFiller = ctx.elementPatternDeclarationAndFiller().accept(visitor)
    }

}
