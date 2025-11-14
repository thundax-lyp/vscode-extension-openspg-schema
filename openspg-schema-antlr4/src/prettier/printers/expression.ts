import * as ast from '../../ast';
import {BasePrinter, PrintFunc} from './base';
import {Doc} from "prettier";

export class PrinterExpression extends BasePrinter implements Record<`print${ast.ExpressionNodeType}`, PrintFunc<any>> {

    // basicPropertyDeclaration : propertyNameDeclaration KV_COLON propertyValueDeclaration? ;
    printBasicPropertyDeclaration: PrintFunc<ast.BasicPropertyDeclaration> = ({node, path, print}): Doc[] => [
        path.call(print, "name"), this.colon,
        node.value ? [this.space, path.call(print, "value")] : [],
    ]

    // basicPropertyName : KV_IDENTIFIER ;
    printBasicPropertyName: PrintFunc<ast.BasicPropertyName> = ({node}) => node.text

    // basicPropertyValue : (KVV_TEXT | KVV_STRING_LITERAL)+;
    printBasicPropertyValue: PrintFunc<ast.BasicPropertyValue> = ({node}) => node.text

    // basicStructureDeclaration : structureNameDeclaration LPARENTH structureAliasDeclaration RPARENTH structureTypeDeclaration ;
    printBasicStructureDeclaration: PrintFunc<ast.BasicStructureDeclaration> = ({path, print}) => [
        path.call(print, "name"),
        ["(", path.call(print, "alias"), ")"],
        path.call(print, "structureType"),
    ]

    // basicStructureType : (BASIC_TYPE_KEYWORD DOT)? (INTEGER_KEYWORD | FLOAT_KEYWORD | TEXT_KEYWORD) ;
    printBasicStructureType: PrintFunc<ast.BasicStructureType> = ({node}) => node.text

    // basicStructureTypeDeclaration : COLON basicStructureTypeVariable ;
    printBasicStructureTypeDeclaration: PrintFunc<ast.BasicStructureTypeDeclaration> = ({path, print}) => [
        this.colon, this.space, path.call(print, "variable")
    ]

    // basicStructureTypeVariable : knowledgeStructureType | basicStructureType | standardStructureType | variableStructureType ;
    printBasicStructureTypeVariable: PrintFunc<ast.BasicStructureTypeVariable> = () => {
        throw new Error("Unreachable Code")
    }

    // blockPropertyValue: OPEN_BLOCK (PLAIN_TEXT | PLAIN_TEXT_PATCH) CLOSE_BLOCK ;
    printBlockPropertyValue: PrintFunc<ast.BlockPropertyValue> = ({node}) => node.text

    // builtinPropertyName :
    //     | DESC_KEYWORD | PROPERTIES_KEYWORD | RELATIONS_KEYWORD | HYPERNYMP_PREDICATE_KEYWORD | REGULAR_KEYWORD
    //     | SPREADABLE_KEYWORD | AUTORELATE_KEYWORD | CONSTRAINT_KEYWORD | RULE_KEYWORD | INDEX_KEYWORD
    // ;
    printBuiltinPropertyName: PrintFunc<ast.BuiltinPropertyName> = ({node}) => node.text

    // builtinPropertyValue :
    //     | IS_A_KEYWORD | LOCATE_AT_KEYWORD | MANNER_OF_KEYWORD | KV_TEXT_KEYWORD | VECTOR_KEYWORD | TEXT_AND_VECTOR_KEYWORD
    //     | SPARSE_VECTOR_KEYWORD | TEXT_AND_SPARSE_VECTOR_KEYWORD | NOT_NULL_KEYWORD | MULTI_VALUE_KEYWORD
    // ;
    printBuiltinPropertyValue: PrintFunc<ast.BuiltinPropertyValue> = ({node}) => node.text

    // inheritedStructureTypeDeclaration : RIGHT_ARROW (inheritedStructureTypeVariable COMMA)* inheritedStructureTypeVariable COLON ;
    printInheritedStructureTypeDeclaration: PrintFunc<ast.InheritedStructureTypeDeclaration> = ({path, print}) => [
        "->", this.space,
        this.builders.join(
            [this.comma, this.space], path.map(print, "variables")
        ),
        this.colon
    ]

    // inheritedStructureTypeVariable : knowledgeStructureType | standardStructureType | variableStructureType ;
    printInheritedStructureTypeVariable: PrintFunc<ast.InheritedStructureTypeVariable> = () => {
        throw new Error("Unreachable Code")
    }

    // knowledgeStructureType  : ENTITY_TYPE_KEYWORD | CONCEPT_TYPE_KEYWORD | EVENT_TYPE_KEYWORD | INDEX_TYPE_KEYWORD ;
    printKnowledgeStructureType: PrintFunc<ast.KnowledgeStructureType> = ({node, path, print}) => node.text

    // propertyNameDeclaration : propertyNameVariable ;
    printPropertyNameDeclaration: PrintFunc<ast.PropertyNameDeclaration> = () => {
        throw new Error("Unreachable Code")
    }

    // propertyNameVariable : builtinPropertyName | basicPropertyName ;
    printPropertyNameVariable: PrintFunc<ast.PropertyNameVariable> = () => {
        throw new Error("Unreachable Code")
    }

    // propertyValueDeclaration: propertyValueVariable;
    printPropertyValueDeclaration: PrintFunc<ast.PropertyValueDeclaration> = () => {
        throw new Error("Unreachable Code")
    }

    // propertyValueVariable : builtinPropertyValue | blockPropertyValue | basicPropertyValue;
    printPropertyValueVariable: PrintFunc<ast.PropertyValueVariable> = () => {
        throw new Error("Unreachable Code")
    }

    // standardStructureType : STANDARD_TYPE_KEYWORD DOT DEFINITION_IDENTIFIER ;
    printStandardStructureType: PrintFunc<ast.StandardStructureType> = ({node, path, print}) => node.text

    // structureAlias : (DEFINITION_IDENTIFIER | DEFINITION_STRING_LITERAL)+ ;
    printStructureAlias: PrintFunc<ast.StructureAlias> = ({node}) => node.text

    // structureAliasDeclaration : structureAlias ;
    printStructureAliasDeclaration: PrintFunc<ast.StructureAliasDeclaration> = () => {
        throw new Error("Unreachable Code")
    }

    // structureName : (structureSemanticName HASH)* structureRealName ;
    printStructureName: PrintFunc<ast.StructureName> = ({node, path, print}) => [
        this.builders.join('#', [
            ...path.map(print, "semanticNames"),
            path.call(print, "realName"),
        ])
    ]

    // structureNameDeclaration: structureName ;
    printStructureNameDeclaration: PrintFunc<ast.StructureNameDeclaration> = () => {
        throw new Error("Unreachable Code")
    }

    // structureRealName : DEFINITION_IDENTIFIER ;
    printStructureRealName: PrintFunc<ast.StructureRealName> = ({node, path, print}) => node.text

    // structureSemanticName : DEFINITION_IDENTIFIER ;
    printStructureSemanticName: PrintFunc<ast.StructureSemanticName> = ({node, path, print}) => node.text

    // structureTypeDeclaration : basicStructureTypeDeclaration | inheritedStructureTypeDeclaration ;
    printStructureTypeDeclaration: PrintFunc<ast.StructureTypeDeclaration> = () => {
        throw new Error("Unreachable Code")
    }

    // variableStructureType : structureName ;
    printVariableStructureType: PrintFunc<ast.VariableStructureType> = () => {
        throw new Error("Unreachable Code")
    }
}
