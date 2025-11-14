import {BaseNode} from '../base';
import {ConceptRuleParserVisitor, RuleWrapperBodyContext} from '../../antlr4';
import {TheDefineStructure} from "./the-define-structure";


export class RuleWrapperBody extends BaseNode {

    type = 'RuleWrapperBody' as const;

    theDefineStructures: TheDefineStructure[];

    constructor(ctx: RuleWrapperBodyContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.theDefineStructures = ctx.theDefineStructure().map(x => x.accept(visitor))
    }

}

