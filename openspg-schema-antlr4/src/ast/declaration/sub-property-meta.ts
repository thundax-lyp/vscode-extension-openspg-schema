import {BaseNode} from '../base';
import {SchemaParserVisitor, SubPropertyMetaContext} from '../../antlr4';
import {BasicPropertyDeclaration} from "../expression";

// subPropertyMeta : INDENT_SUBPROP_META basicPropertyDeclaration ;
export class SubPropertyMeta extends BaseNode {

    type = 'SubPropertyMeta' as const;

    declaration: BasicPropertyDeclaration

    constructor(ctx: SubPropertyMetaContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.declaration = ctx.basicPropertyDeclaration().accept(visitor)
    }

}
