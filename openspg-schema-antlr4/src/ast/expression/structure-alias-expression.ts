import {BaseNode} from '../base';
import {SchemaParserVisitor, StructureAliasExpressionContext} from '../../antlr4';
import {StructureAlias} from "./structure-alias";

/**
 * ### Grammar:
 * ```
 * structureAliasExpression : structureAlias ;
 * ```
 */
export class StructureAliasExpression extends BaseNode {

    type = 'StructureAliasExpression' as const;

    variable: StructureAlias

    constructor(ctx: StructureAliasExpressionContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.variable = ctx.structureAlias().accept(visitor)
    }

}
