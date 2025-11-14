import {BaseNode} from '../base';
import {InheritedStructureTypeDeclarationContext, SchemaParserVisitor} from '../../antlr4';
import {InheritedStructureTypeVariable} from "./inherited-structure-type-variable";

// inheritedStructureTypeDeclaration : RIGHT_ARROW (inheritedStructureTypeVariable COMMA)* inheritedStructureTypeVariable COLON ;
export class InheritedStructureTypeDeclaration extends BaseNode {

    type = 'InheritedStructureTypeDeclaration' as const;

    variables: InheritedStructureTypeVariable[]

    constructor(ctx: InheritedStructureTypeDeclarationContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.variables = ctx.inheritedStructureTypeVariable().map(x => x.accept(visitor))
    }

}
