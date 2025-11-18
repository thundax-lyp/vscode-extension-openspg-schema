import {BaseNode} from '../base';
import {InheritedStructureTypeDeclarationContext, SchemaParserVisitor} from '../../antlr4';
import {InheritedStructureTypeVariableNode} from "./inherited-structure-type-variable";

// inheritedStructureTypeDeclaration : RIGHT_ARROW (inheritedStructureTypeVariable COMMA)* inheritedStructureTypeVariable COLON ;
export class InheritedStructureTypeDeclaration extends BaseNode {

    type = 'InheritedStructureTypeDeclaration' as const;

    variables: InheritedStructureTypeVariableNode[]

    constructor(ctx: InheritedStructureTypeDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.variables = ctx.inheritedStructureTypeVariable().map(x => x.accept(visitor))
    }

}
