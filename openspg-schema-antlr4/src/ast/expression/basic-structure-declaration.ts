import {BaseNode} from '../base';
import {BasicStructureDeclarationContext, SchemaParserVisitor} from '../../antlr4';
import {StructureTypeDeclarationNode} from "./structure-type-declaration";
import {StructureNameDeclarationNode} from "./structure-name-declaration";
import {StructureAliasDeclarationNode} from "./structure-alias-declaration";

// basicStructureDeclaration : structureNameDeclaration LPARENTH structureAliasDeclaration RPARENTH structureTypeDeclaration ;
export class BasicStructureDeclaration extends BaseNode {

    type = 'BasicStructureDeclaration' as const;

    name: StructureNameDeclarationNode
    alias: StructureAliasDeclarationNode
    structureType: StructureTypeDeclarationNode

    constructor(ctx: BasicStructureDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.name = ctx.structureNameDeclaration().accept(visitor)
        this.alias = ctx.structureAliasDeclaration().accept(visitor)
        this.structureType = ctx.structureTypeDeclaration().accept(visitor)
    }

}
