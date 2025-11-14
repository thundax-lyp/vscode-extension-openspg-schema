import {BaseNode} from '../base';
import {ConceptRuleParserVisitor, ElementPatternWhereClauseContext} from '../../antlr4';

// elementPatternWhereClause : WHERE_KEYWORD searchCondition;
export class ElementPatternWhereClause extends BaseNode {

    type = 'ElementPatternWhereClause' as const;

    condition: string

    constructor(ctx: ElementPatternWhereClauseContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.condition = ctx.searchCondition().getText()
    }

}
