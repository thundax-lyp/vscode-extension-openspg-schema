import {BaseNodeUnion} from '../base';
import {PropertyNameDeclarationContext, SchemaParserVisitor} from '../../antlr4';
import {PropertyNameVariableNode} from "./property-name-variable";

export type PropertyNameDeclarationNode =
    | PropertyNameVariableNode

// propertyNameDeclaration : propertyNameVariable ;
export class PropertyNameDeclaration extends BaseNodeUnion<
    | PropertyNameVariableNode
> {

    constructor(ctx: PropertyNameDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, [
            ctx.propertyNameVariable()
        ], visitor);
    }

}
