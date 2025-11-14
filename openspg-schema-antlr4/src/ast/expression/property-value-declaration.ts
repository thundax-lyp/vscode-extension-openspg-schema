import {BaseNodeUnion} from '../base';
import {PropertyValueDeclarationContext, SchemaParserVisitor} from '../../antlr4';
import {PropertyValueVariable} from "./property-value-variable";

// propertyValueDeclaration: propertyValueVariable;
export class PropertyValueDeclaration extends BaseNodeUnion<
    | PropertyValueVariable
> {

    constructor(ctx: PropertyValueDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, [
            ctx.propertyValueVariable()
        ], visitor);
    }

}
