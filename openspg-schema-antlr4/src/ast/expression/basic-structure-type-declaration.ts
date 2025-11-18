import {BaseNode} from '../base';
import {BasicStructureTypeDeclarationContext, SchemaParserVisitor} from '../../antlr4';
import {BasicStructureTypeVariableNodes} from "./basic-structure-type-variable";

// basicStructureTypeDeclaration   : COLON basicStructureTypeVariable ;
export class BasicStructureTypeDeclaration extends BaseNode {

    type = 'BasicStructureTypeDeclaration' as const;

    variable: BasicStructureTypeVariableNodes

    constructor(ctx: BasicStructureTypeDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.variable = ctx.basicStructureTypeVariable().accept(visitor)
    }

}
