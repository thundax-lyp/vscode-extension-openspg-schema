import {BaseNodeUnion} from '../base';
import {SchemaParserVisitor, StructureAliasDeclarationContext} from '../../antlr4';
import {StructureAlias} from "./structure-alias";

// structureAliasDeclaration   : structureAlias ;
export class StructureAliasDeclaration extends BaseNodeUnion<
    | StructureAlias
> {

    constructor(ctx: StructureAliasDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, [
            ctx.structureAlias()
        ], visitor);
    }

}
