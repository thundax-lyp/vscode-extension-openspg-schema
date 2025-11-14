import {BaseNode} from '../base';
import {ConceptRuleParserVisitor, RuleWrapperBodyContext} from '../../antlr4';
import {TheDefineStructure} from "./the-define-structure";


// ruleWrapperBody : WRAPPER_RULE_KEYWORD COLON OPEN_RULE_BLOCK theDefineStructure* CLOSE_RULE_BLOCK;
export class RuleWrapperBody extends BaseNode {

    type = 'RuleWrapperBody' as const;

    theDefineStructures: TheDefineStructure[];

    constructor(ctx: RuleWrapperBodyContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.theDefineStructures = ctx.theDefineStructure().map(x => x.accept(visitor))
    }

}

