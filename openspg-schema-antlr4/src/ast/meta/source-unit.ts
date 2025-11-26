import {BaseNode} from '../base';
import {SchemaParserVisitor, SourceUnitContext} from '../../antlr4';
import {EntityDeclaration, NamespaceDeclaration} from '../declaration';

export type SourceUnitNode =
    | NamespaceDeclaration
    | EntityDeclaration
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
     *     | EntityDeclaration
     * ```
     * > **Links**:
     * > - {@link NamespaceDeclaration}
     * > - {@link EntityDeclaration}
     */
    nodes: SourceUnitNode[] = [];

    constructor(ctx: SourceUnitContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.nodes = (ctx.children || []).map((child) => visitor.visit(child)!).filter(Boolean);
    }

}
