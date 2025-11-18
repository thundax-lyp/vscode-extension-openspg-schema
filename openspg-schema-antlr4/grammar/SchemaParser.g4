
parser grammar SchemaParser;

options { tokenVocab=SchemaLexer; }

sourceUnit : (namespaceDeclaration | entityDeclaration)* ;

/**
 * Namespace declaration
 */
namespaceDeclaration : NAMESPACE_KEY namespaceVariable ;
namespaceVariable : NAMESPACE_IDENTIFIER | NAMESPACE_STRING_LITERAL ;

/**
 * Basic Element declaration
 * Example:
 */
// Example:
// Chunk(文本块): EntityType
// BigChunk("大文本块"): StandardType.Text
// MultiChunk("多个文本块") -> Chunk, BigChunk
// IND#belongTo(属于): TaxOfRiskApp
basicStructureDeclaration : structureNameDeclaration LPARENTH structureAliasDeclaration RPARENTH structureTypeDeclaration ;

structureNameDeclaration: structureName ;
structureName           : (structureSemanticName HASH)* structureRealName ;
structureSemanticName   : DEFINITION_IDENTIFIER ;
structureRealName       : DEFINITION_IDENTIFIER ;

structureAliasDeclaration   : structureAlias ;
structureAlias              : (DEFINITION_IDENTIFIER | DEFINITION_STRING_LITERAL)+ ;

// : EntityType
// -> EntityType, ConceptType, MyType:
structureTypeDeclaration : basicStructureTypeDeclaration | inheritedStructureTypeDeclaration ;

basicStructureTypeDeclaration   : COLON basicStructureTypeVariable ;
basicStructureTypeVariable      : knowledgeStructureType | basicStructureType | standardStructureType | variableStructureType ;

inheritedStructureTypeDeclaration : RIGHT_ARROW (inheritedStructureTypeVariable COMMA)* inheritedStructureTypeVariable COLON ;
inheritedStructureTypeVariable  : knowledgeStructureType | standardStructureType | variableStructureType ;

knowledgeStructureType  : ENTITY_TYPE_KEYWORD | CONCEPT_TYPE_KEYWORD | EVENT_TYPE_KEYWORD | INDEX_TYPE_KEYWORD ;
basicStructureType      : (BASIC_TYPE_KEYWORD DOT)? (INTEGER_KEYWORD | FLOAT_KEYWORD | TEXT_KEYWORD) ;
standardStructureType   : STANDARD_TYPE_KEYWORD DOT DEFINITION_IDENTIFIER ;
variableStructureType   : structureName ;

/**
 * Basic Key-Value Property declaration
 * Example:
 * desc:
 * desc: 文本块
 * desc: [[ plain text... ]]
 */
basicPropertyDeclaration : propertyNameDeclaration KV_COLON propertyValueDeclaration? ;

propertyNameDeclaration : propertyNameVariable;
propertyNameVariable    : builtinPropertyName | basicPropertyName ;
basicPropertyName       : KV_IDENTIFIER ;
builtinPropertyName     : DESC_KEYWORD | PROPERTIES_KEYWORD | RELATIONS_KEYWORD | HYPERNYMP_PREDICATE_KEYWORD | REGULAR_KEYWORD
                        | SPREADABLE_KEYWORD | AUTORELATE_KEYWORD | CONSTRAINT_KEYWORD | RULE_KEYWORD | INDEX_KEYWORD
                        ;

propertyValueDeclaration: propertyValueVariable;
propertyValueVariable   : builtinPropertyValue | blockPropertyValue | basicPropertyValue;
basicPropertyValue      : (KVV_TEXT | KVV_STRING_LITERAL)+;
builtinPropertyValue    : IS_A_KEYWORD | LOCATE_AT_KEYWORD | MANNER_OF_KEYWORD | KV_TEXT_KEYWORD | VECTOR_KEYWORD
                        | TEXT_AND_VECTOR_KEYWORD | SPARSE_VECTOR_KEYWORD | TEXT_AND_SPARSE_VECTOR_KEYWORD | NOT_NULL_KEYWORD
                        | MULTI_VALUE_KEYWORD
                        ;

blockPropertyValue: OPEN_BLOCK (PLAIN_TEXT | PLAIN_TEXT_PATCH) CLOSE_BLOCK ;

//=================================================================================
/**
 * Entity
 * Example:
 * Chunk(文本块): EntityType
 * Chunk(文本块)->EntityType, ConceptType:
 */
entityDeclaration : entityHead entityBody? ;
entityHead : basicStructureDeclaration ;
entityBody : entityMetaDeclaration+ ;


/**
 * EntityMeta
 * Example:
 * Chunk(文本块): EntityType
 *     desc: 文本块
 */
entityMetaDeclaration : entityMetaHead entityMetaBody? ;
entityMetaHead : INDENT_META+ basicPropertyDeclaration ;
entityMetaBody : propertyDeclaration+ ;

/**
 * Property
 * Example:
 * Chunk(文本块): EntityType
 *     properties :
 *         belongTo(属于) : Story
 */
propertyDeclaration : propertyHead propertyBody? ;
propertyHead : INDENT_PROP+ basicStructureDeclaration ;
propertyBody : propertyMetaDeclaration+ ;

/**
 * PropertyMeta
 * Example:
 * Chunk(文本块): EntityType
 *     properties :
 *         belongTo(属于) : Story
 *             desc: 属于
 */
propertyMetaDeclaration : propertyMetaHead propertyMetaBody? ;
propertyMetaHead : INDENT_PROP_META+ basicPropertyDeclaration ;
propertyMetaBody : subPropertyDeclaration+ ;

/**
 * SubProperty
 * Example:
 * Disease(疾病): EntityType
 *     properties:
 *         commonSymptom(常见症状): Symptom
 *             properties:
 *                 desc(描述): Text
 */
subPropertyDeclaration : subPropertyHead subPropertyBody? ;
subPropertyHead : INDENT_SUBPROP+ basicStructureDeclaration ;
subPropertyBody : subPropertyMetaDeclaration+ ;

/**
 * SubPropertyMeta
 * Example:
 * Disease(疾病): EntityType
 *     properties:
 *         commonSymptom(常见症状): Symptom
 *             properties:
 *                 desc(描述): Text
 *                     index: Text
 */
subPropertyMetaDeclaration : INDENT_SUBPROP_META+ basicPropertyDeclaration ;

