import {BaseNodeUnion} from '../base';
import {InheritedStructureTypeVariableContext, SchemaParserVisitor} from '../../antlr4';
import {KnowledgeStructureType} from "./knowledge-structure-type";
import {StandardStructureType} from "./standard-structure-type";
import {VariableStructureType} from "./variable-structure-type";

// inheritedStructureTypeVariable  : knowledgeStructureType | standardStructureType | variableStructureType ;
export class InheritedStructureTypeVariable extends BaseNodeUnion<
    | KnowledgeStructureType
    | StandardStructureType
    | VariableStructureType
> {

    constructor(ctx: InheritedStructureTypeVariableContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, [
            ctx.knowledgeStructureType(),
            ctx.standardStructureType(),
            ctx.variableStructureType(),
        ], visitor);
    }

}
