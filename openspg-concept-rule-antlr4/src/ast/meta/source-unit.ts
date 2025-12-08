import {BaseNode} from '../base';
import {ConceptRuleParserVisitor, SourceUnitContext} from '../../antlr4';
import {ConceptRuleDeclaration, NamespaceDeclaration, RuleWrapperDeclaration,} from '../declaration';

type SourceUnitNode =
    | NamespaceDeclaration
    | RuleWrapperDeclaration
    | ConceptRuleDeclaration
    ;

/**
 * AST Root Element
 */
export class SourceUnit extends BaseNode {

    type = 'SourceUnit' as const;

    /**
     * ```typescript
     * type SourceUnitNode =
     *     | NamespaceDeclaration
     *     | RuleWrapperDeclaration
     *     | ConceptRuleDeclaration
     * ```
     * > **Links**:
     * > - {@link NamespaceDeclaration}
     * > - {@link RuleWrapperDeclaration}
     * > - {@link ConceptRuleDeclaration}
     */
    nodes: SourceUnitNode[] = [];

    constructor(ctx: SourceUnitContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.nodes = (ctx.children || []).map((child) => visitor.visit(child)!).filter(Boolean);
    }

}
