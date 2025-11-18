import {BaseNodeUnion} from '../base';
import {InheritedStructureTypeVariableContext, SchemaParserVisitor} from '../../antlr4';
import {KnowledgeStructureType} from "./knowledge-structure-type";
import {StandardStructureType} from "./standard-structure-type";
import {VariableStructureTypeNode} from "./variable-structure-type";


export type InheritedStructureTypeVariableNode =
    | KnowledgeStructureType
    | StandardStructureType
    | VariableStructureTypeNode

// inheritedStructureTypeVariable  : knowledgeStructureType | standardStructureType | variableStructureType ;
export class InheritedStructureTypeVariable extends BaseNodeUnion<
    | KnowledgeStructureType
    | StandardStructureType
    | VariableStructureTypeNode
> {

    constructor(ctx: InheritedStructureTypeVariableContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, [
            ctx.knowledgeStructureType(),
            ctx.standardStructureType(),
            ctx.variableStructureType(),
        ], visitor);
    }

}
