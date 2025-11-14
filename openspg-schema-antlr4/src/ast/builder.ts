import * as parser from '../antlr4';
import * as ast from './index';

export type Result = ast.SyntaxNode;

export class SchemaASTBuilder extends parser.SchemaParserVisitor<ast.SyntaxNode | any> {

    visitSourceUnit = (ctx: parser.SourceUnitContext) => new ast.SourceUnit(ctx, this);

    visitNamespace = (ctx: parser.NamespaceContext) => new ast.Namespace(ctx, this);

    visitBasicStructureDeclaration = (ctx: parser.BasicStructureDeclarationContext) => new ast.BasicStructureDeclaration(ctx, this);

    visitStructureNameDeclaration = (ctx: parser.StructureNameDeclarationContext) => new ast.StructureNameDeclaration(ctx, this);

    visitStructureName = (ctx: parser.StructureNameContext) => new ast.StructureName(ctx, this);

    visitStructureSemanticName = (ctx: parser.StructureSemanticNameContext) => new ast.StructureSemanticName(ctx, this);

    visitStructureRealName = (ctx: parser.StructureRealNameContext) => new ast.StructureRealName(ctx, this);

    visitStructureAliasDeclaration = (ctx: parser.StructureAliasDeclarationContext) => new ast.StructureAliasDeclaration(ctx, this);

    visitStructureAlias = (ctx: parser.StructureAliasContext) => new ast.StructureAlias(ctx, this);

    visitStructureTypeDeclaration = (ctx: parser.StructureTypeDeclarationContext) => new ast.StructureTypeDeclaration(ctx, this);

    visitBasicStructureTypeDeclaration = (ctx: parser.BasicStructureTypeDeclarationContext) => new ast.BasicStructureTypeDeclaration(ctx, this);

    visitBasicStructureTypeVariable = (ctx: parser.BasicStructureTypeVariableContext) => new ast.BasicStructureTypeVariable(ctx, this);

    visitInheritedStructureTypeDeclaration = (ctx: parser.InheritedStructureTypeDeclarationContext) => new ast.InheritedStructureTypeDeclaration(ctx, this);

    visitInheritedStructureTypeVariable = (ctx: parser.InheritedStructureTypeVariableContext) => new ast.InheritedStructureTypeVariable(ctx, this);

    visitKnowledgeStructureType = (ctx: parser.KnowledgeStructureTypeContext) => new ast.KnowledgeStructureType(ctx, this);

    visitBasicStructureType = (ctx: parser.BasicStructureTypeContext) => new ast.BasicStructureType(ctx, this);

    visitStandardStructureType = (ctx: parser.StandardStructureTypeContext) => new ast.StandardStructureType(ctx, this);

    visitVariableStructureType = (ctx: parser.VariableStructureTypeContext) => new ast.VariableStructureType(ctx, this);

    visitBasicPropertyDeclaration = (ctx: parser.BasicPropertyDeclarationContext) => new ast.BasicPropertyDeclaration(ctx, this);

    visitPropertyNameDeclaration = (ctx: parser.PropertyNameDeclarationContext) => new ast.PropertyNameDeclaration(ctx, this);

    visitPropertyNameVariable = (ctx: parser.PropertyNameVariableContext) => new ast.PropertyNameVariable(ctx, this);

    visitBasicPropertyName = (ctx: parser.BasicPropertyNameContext) => new ast.BasicPropertyName(ctx, this);

    visitBuiltinPropertyName = (ctx: parser.BuiltinPropertyNameContext) => new ast.BuiltinPropertyName(ctx, this);

    visitPropertyValueDeclaration = (ctx: parser.PropertyValueDeclarationContext) => new ast.PropertyValueDeclaration(ctx, this);

    visitPropertyValueVariable = (ctx: parser.PropertyValueVariableContext) => new ast.PropertyValueVariable(ctx, this);

    visitBasicPropertyValue = (ctx: parser.BasicPropertyValueContext) => new ast.BasicPropertyValue(ctx, this);

    visitBuiltinPropertyValue = (ctx: parser.BuiltinPropertyValueContext) => new ast.BuiltinPropertyValue(ctx, this);

    visitBlockPropertyValue = (ctx: parser.BlockPropertyValueContext) => new ast.BlockPropertyValue(ctx, this);

    visitEntity = (ctx: parser.EntityContext) => new ast.Entity(ctx, this);

    visitEntityMeta = (ctx: parser.EntityMetaContext) => new ast.EntityMeta(ctx, this);

    visitProperty = (ctx: parser.PropertyContext) => new ast.Property(ctx, this);

    visitPropertyMeta = (ctx: parser.PropertyMetaContext) => new ast.PropertyMeta(ctx, this);

    visitSubProperty = (ctx: parser.SubPropertyContext) => new ast.SubProperty(ctx, this);

    visitSubPropertyMeta = (ctx: parser.SubPropertyMetaContext) => new ast.SubPropertyMeta(ctx, this);

}

export const schemaASTBuilder = new SchemaASTBuilder();
