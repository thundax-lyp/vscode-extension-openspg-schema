import {BaseNodeUnion} from '../base';
import {PropertyValueDeclarationContext, SchemaParserVisitor} from '../../antlr4';
import {PropertyValueVariableNode} from "./property-value-variable";

export type PropertyValueDeclarationNode =
    | PropertyValueVariableNode

// propertyValueDeclaration: propertyValueVariable;
export class PropertyValueDeclaration extends BaseNodeUnion<
    | PropertyValueVariableNode
> {

    constructor(ctx: PropertyValueDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, [
            ctx.propertyValueVariable()
        ], visitor);
    }

}
