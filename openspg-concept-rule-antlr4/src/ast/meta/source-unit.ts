import {BaseNode} from '../base';
import {ConceptRuleParserVisitor, SourceUnitContext} from '../../antlr4';
import {Namespace, RuleWrapper, TheAction, TheDefineStructure, TheGraphStructure, TheRule,} from '../declaration';

type SourceUnitNodes =
    | Namespace
    | RuleWrapper
    | TheDefineStructure
    | TheGraphStructure
    | TheRule
    | TheAction
    ;

export class SourceUnit extends BaseNode {

    type = 'SourceUnit' as const;

    // 子节点
    nodes: SourceUnitNodes[] = [];

    constructor(ctx: SourceUnitContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.nodes = (ctx.children || []).map((child) => visitor.visit(child)!).filter(Boolean);
    }

}
