import {BaseNode} from '../base';
import {BasicPropertyDeclarationContext, SchemaParserVisitor} from '../../antlr4';
import {PropertyNameDeclarationNode} from "./property-name-declaration";
import {PropertyValueDeclarationNode} from "./property-value-declaration";

// basicPropertyDeclaration : propertyNameDeclaration COLON propertyValueDeclaration? ;
export class BasicPropertyDeclaration extends BaseNode {

    type = 'BasicPropertyDeclaration' as const;

    name: PropertyNameDeclarationNode
    value: PropertyValueDeclarationNode | null

    constructor(ctx: BasicPropertyDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.name = ctx.propertyNameDeclaration().accept(visitor)
        this.value = ctx.propertyValueDeclaration()?.accept(visitor) ?? null
    }

}
