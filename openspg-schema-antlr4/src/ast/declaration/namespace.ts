import {BaseNode} from '../base';
import {NamespaceContext, SchemaParserVisitor} from '../../antlr4';

export class Namespace extends BaseNode {

    type = 'Namespace' as const;

    value: string

    constructor(ctx: NamespaceContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.value = ctx.namespaceValue().getText()
    }

}
