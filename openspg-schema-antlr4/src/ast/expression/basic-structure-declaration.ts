import {BaseNode} from '../base';
import {BasicStructureDeclarationContext, SchemaParserVisitor} from '../../antlr4';
import {StructureAliasDeclaration} from "./structure-alias-declaration";
import {StructureTypeDeclaration} from "./structure-type-declaration";
import {StructureNameDeclaration} from "./structure-name-declaration";

// basicStructureDeclaration : structureNameDeclaration LPARENTH structureAliasDeclaration RPARENTH structureTypeDeclaration ;
export class BasicStructureDeclaration extends BaseNode {

    type = 'BasicStructureDeclaration' as const;

    name: StructureNameDeclaration
    alias: StructureAliasDeclaration
    structureType: StructureTypeDeclaration

    constructor(ctx: BasicStructureDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.name = ctx.structureNameDeclaration().accept(visitor)
        this.alias = ctx.structureAliasDeclaration().accept(visitor)
        this.structureType = ctx.structureTypeDeclaration().accept(visitor)
    }

}
