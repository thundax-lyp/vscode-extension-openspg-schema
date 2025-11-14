import {BaseNodeString} from '../base';
import {ConceptRuleParserVisitor, EdgePatternContext} from '../../antlr4';


export class EdgePattern extends BaseNodeString {

    type = 'EdgePattern' as const;

    constructor(ctx: EdgePatternContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
    }

}
