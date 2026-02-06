import { BaseNode } from "../base";
import { ConceptRuleParserVisitor, NamespaceDeclarationContext } from "../../antlr4";
import { NamespaceVariable } from "./namespace-variable";

/**
 * ### Grammar:
 * ```
 * namespaceDeclaration : 'namespace' namespaceVariable ;
 *
 * namespaceVariable : unescaped_symbolic_name | string_literal | escaped_symbolic_name ;
 * ```
 **/
export class NamespaceDeclaration extends BaseNode {
    type = "NamespaceDeclaration" as const;

    variable: NamespaceVariable;

    constructor(ctx: NamespaceDeclarationContext, visitor: ConceptRuleParserVisitor<any>) {
        super(ctx, visitor);
        this.variable = ctx.namespaceVariable().accept(visitor);
    }
}
