import {BaseNodeUnion} from '../base';
import {BasicStructureTypeVariableContext, SchemaParserVisitor} from '../../antlr4';
import {KnowledgeStructureType} from "./knowledge-structure-type";
import {BasicStructureType} from "./basic-structure-type";
import {StandardStructureType} from "./standard-structure-type";
import {VariableStructureType} from "./variable-structure-type";

// basicStructureTypeVariable      : knowledgeStructureType | basicStructureType | standardStructureType | variableStructureType ;
export class BasicStructureTypeVariable extends BaseNodeUnion<
    | KnowledgeStructureType
    | BasicStructureType
    | StandardStructureType
    | VariableStructureType
> {

    constructor(ctx: BasicStructureTypeVariableContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, [
            ctx.knowledgeStructureType(),
            ctx.basicStructureType(),
            ctx.standardStructureType(),
            ctx.variableStructureType(),
        ], visitor);
    }

}
