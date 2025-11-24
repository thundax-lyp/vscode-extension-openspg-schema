import {BaseNodeUnion} from '../base';
import {SchemaParserVisitor, StructureAliasDeclarationContext} from '../../antlr4';
import {StructureAlias} from "./structure-alias";

export type StructureAliasDeclarationNode =
    | StructureAlias

// structureAliasDeclaration   : structureAlias ;
export class StructureAliasDeclaration extends BaseNodeUnion<
    | StructureAlias
> {

    structureAlias: StructureAlias

    constructor(ctx: StructureAliasDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, [
            ctx.structureAlias()
        ], visitor);
    }

}
