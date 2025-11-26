import {BaseNode} from '../base';
import {NamespaceDeclarationContext, SchemaParserVisitor} from '../../antlr4';
import {NamespaceVariable} from "./namespace-variable";

/**
 * ### Grammar:
 * ```
 * namespaceDeclaration : 'namespace' namespaceVariable? ;
 *
 * namespaceVariable : identifier | string_literal ;
 * ```
 **/
export class NamespaceDeclaration extends BaseNode {

    type = 'NamespaceDeclaration' as const;

    variable: NamespaceVariable

    constructor(ctx: NamespaceDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.variable = ctx.namespaceVariable().accept(visitor);
    }

}
