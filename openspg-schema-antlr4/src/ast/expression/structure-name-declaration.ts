import {BaseNodeUnion} from '../base';
import {SchemaParserVisitor, StructureNameDeclarationContext} from '../../antlr4';
import {StructureName} from "./structure-name";

// structureNameDeclaration: structureName ;
export class StructureNameDeclaration extends BaseNodeUnion<
    | StructureName
> {

    constructor(ctx: StructureNameDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, [
            ctx.structureName()
        ], visitor);
    }

}
