import { BaseNode } from "../base";
import { InheritedStructureTypeExpressionContext, SchemaParserVisitor } from "../../antlr4";
import { InheritedStructureTypeVariableNode } from "./inherited-structure-type-variable";

/**
 * ### Grammar:
 * ```
 * inheritedStructureTypeDeclaration : '->' ( inheritedStructureTypeVariable ',' )* inheritedStructureTypeVariable ':' ;
 * ```
 * ### Example:
 * ```
 * OnePunchMan(一拳超人) -> Superman, Person:
 * ```
 */
export class InheritedStructureTypeExpression extends BaseNode {
    type = "InheritedStructureTypeExpression" as const;

    /**
     * ```typescript
     * export type InheritedStructureTypeVariableNode =
     *     | KnowledgeStructureType
     *     | StandardStructureType
     *     | VariableStructureTypeNode
     *
     * export type VariableStructureTypeNode =
     *     | StructureName
     * ```
     * > **Links**:
     * > - {@link KnowledgeStructureType}
     * > - {@link StandardStructureType}
     * > - {@link StructureName}
     */
    variables: InheritedStructureTypeVariableNode[];

    constructor(ctx: InheritedStructureTypeExpressionContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.variables = ctx.inheritedStructureTypeVariable().map((x) => x.accept(visitor));
    }
}
