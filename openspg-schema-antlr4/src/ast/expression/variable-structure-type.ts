import {BaseNodeUnion} from '../base';
import {SchemaParserVisitor, VariableStructureTypeContext} from '../../antlr4';
import {StructureName} from "./structure-name";

// variableStructureType   : structureName ;
export class VariableStructureType extends BaseNodeUnion<
    | StructureName
> {

    constructor(ctx: VariableStructureTypeContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, [
            ctx.structureName()
        ],visitor);
    }

}
