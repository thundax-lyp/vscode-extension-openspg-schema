import {BaseNodeUnion} from '../base';
import {SchemaParserVisitor, StructureTypeDeclarationContext} from '../../antlr4';
import {BasicStructureTypeDeclaration} from "./basic-structure-type-declaration";
import {InheritedStructureTypeDeclaration} from "./inherited-structure-type-declaration";

export type StructureTypeDeclarationNode =
    | BasicStructureTypeDeclaration
    | InheritedStructureTypeDeclaration

// structureTypeDeclaration : basicStructureTypeDeclaration | inheritedStructureTypeDeclaration ;
export class StructureTypeDeclaration extends BaseNodeUnion<
    | BasicStructureTypeDeclaration
    | InheritedStructureTypeDeclaration
> {

    constructor(ctx: StructureTypeDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, [
            ctx.basicStructureTypeDeclaration(),
            ctx.inheritedStructureTypeDeclaration()
        ], visitor);
    }

}
