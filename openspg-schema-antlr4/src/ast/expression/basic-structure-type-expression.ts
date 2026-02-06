import { BaseNode } from "../base";
import { BasicStructureTypeExpressionContext, SchemaParserVisitor } from "../../antlr4";
import { BasicStructureTypeVariableNode } from "./basic-structure-type-variable";

/**
 * ### Grammar:
 * ```
 * basicStructureTypeDeclaration : ':' basicStructureTypeVariable ;
 * ```
 */
export class BasicStructureTypeExpression extends BaseNode {
    type = "BasicStructureTypeExpression" as const;

    /**
     * ```typescript
     * type BasicStructureTypeVariableNode = KnowledgeStructureType | BasicStructureType | StandardStructureType | VariableStructureTypeNode
     *
     * type VariableStructureTypeNode = StructureName
     * ```
     * > **Links**:
     * > - {@link KnowledgeStructureType}
     * > - {@link BasicStructureType}
     * > - {@link StandardStructureType}
     * > - {@link StructureName}
     */
    variable: BasicStructureTypeVariableNode;

    constructor(ctx: BasicStructureTypeExpressionContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.variable = ctx.basicStructureTypeVariable().accept(visitor);
    }
}
