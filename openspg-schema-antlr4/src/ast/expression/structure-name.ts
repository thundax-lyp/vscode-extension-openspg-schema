import {BaseNode} from '../base';
import {SchemaParserVisitor, StructureNameContext} from '../../antlr4';
import {StructureSemanticName} from "./structure-semantic-name";
import {StructureRealName} from "./structure-real-name";

// structureName           : (structureSemanticName HASH)* structureRealName ;
export class StructureName extends BaseNode {

    type = 'StructureName' as const;

    semanticNames: StructureSemanticName[]
    realName: StructureRealName

    constructor(ctx: StructureNameContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.semanticNames = ctx.structureSemanticName().map(x => x.accept(visitor))
        this.realName = ctx.structureRealName().accept(visitor)
    }

}
