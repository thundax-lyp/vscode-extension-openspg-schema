import {BaseNode} from '../base';
import {SchemaParserVisitor, SubPropertyMetaDeclarationContext} from '../../antlr4';
import {BasicPropertyDeclaration} from "../expression";

// subPropertyMeta : INDENT_SUBPROP_META basicPropertyDeclaration ;
export class SubPropertyMetaDeclaration extends BaseNode {

    type = 'SubPropertyMetaDeclaration' as const;

    declaration: BasicPropertyDeclaration

    constructor(ctx: SubPropertyMetaDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.declaration = ctx.basicPropertyDeclaration().accept(visitor)
    }

}
