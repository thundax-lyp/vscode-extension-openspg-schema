import {BaseNodeUnion} from '../base';
import {PropertyNameDeclarationContext, SchemaParserVisitor} from '../../antlr4';
import {PropertyNameVariable} from "./property-name-variable";

// propertyNameDeclaration : propertyNameVariable ;
export class PropertyNameDeclaration extends BaseNodeUnion<
    | PropertyNameVariable
> {

    constructor(ctx: PropertyNameDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, [
            ctx.propertyNameVariable()
        ], visitor);
    }

}
