import {BaseNode} from '../base';
import {ConceptRuleParserVisitor, ElementLookupContext} from '../../antlr4';
import {LabelExpression} from "./label-expression";

// elementLookup : COLON ( labelExpression | linkedEdge )?;
export class ElementLookup extends BaseNode {

    type = 'ElementLookup' as const;

    labelExpression: LabelExpression | null = null
    linkedEdge: string = ''

    constructor(ctx: ElementLookupContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.labelExpression = ctx.labelExpression()?.accept(visitor) ?? null
        this.linkedEdge = ctx.linkedEdge()?.getText() ?? ''
    }

}
