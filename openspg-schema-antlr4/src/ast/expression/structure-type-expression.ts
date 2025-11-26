import {BaseNodeUnion} from '../base';
import {SchemaParserVisitor, StructureTypeExpressionContext} from '../../antlr4';
import {InheritedStructureTypeExpression} from "./inherited-structure-type-expression";
import {BasicStructureTypeExpression} from "./basic-structure-type-expression";

export type StructureTypeExpressionNode =
    | BasicStructureTypeExpression
    | InheritedStructureTypeExpression

// structureTypeExpression : basicStructureTypeExpression | inheritedStructureTypeExpression ;
export class StructureTypeExpression extends BaseNodeUnion<
    | BasicStructureTypeExpression
    | InheritedStructureTypeExpression
> {

    constructor(ctx: StructureTypeExpressionContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, [
            ctx.basicStructureTypeExpression(),
            ctx.inheritedStructureTypeExpression()
        ], visitor);
    }

}
