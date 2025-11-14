import {BaseNode} from '../base';
import {PropertyMetaContext, SchemaParserVisitor} from '../../antlr4';
import {BasicPropertyDeclaration} from "../expression";
import {SubProperty} from "./sub-property";

export class PropertyMeta extends BaseNode {

    type = 'PropertyMeta' as const;

    declaration: BasicPropertyDeclaration
    children: SubProperty[]

    constructor(ctx: PropertyMetaContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.declaration = ctx.propertyMetaHead().accept(visitor)
        this.children = (ctx.propertyMetaBody()?.subProperty() || []).map(x => x.accept(visitor))
    }

}
