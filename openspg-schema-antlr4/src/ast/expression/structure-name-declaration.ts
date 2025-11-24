import {BaseNode} from '../base';
import {SchemaParserVisitor, StructureNameDeclarationContext} from '../../antlr4';
import {StructureName} from "./structure-name";

// structureNameDeclaration: structureName ;
export class StructureNameDeclaration extends BaseNode {

    type = 'StructureNameDeclaration' as const;

    name: StructureName

    constructor(ctx: StructureNameDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.name = ctx.structureName().accept(visitor);
    }

}
