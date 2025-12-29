import * as parser from '../antlr4';
import * as ast from './index';

export type Result = ast.SyntaxNode;

export class SchemaASTBuilder extends parser.SchemaParserVisitor<ast.SyntaxNode | any> {

    visitSourceUnit = (ctx: parser.SourceUnitContext) => new ast.SourceUnit(ctx, this);

    visitNamespaceDeclaration = (ctx: parser.NamespaceDeclarationContext) => new ast.NamespaceDeclaration(ctx, this);

    visitNamespaceVariable = (ctx: parser.NamespaceVariableContext) => new ast.NamespaceVariable(ctx, this);

    visitBasicStructureDeclaration = (ctx: parser.BasicStructureDeclarationContext) => new ast.BasicStructureDeclaration(ctx, this);

    visitStructureNameExpression = (ctx: parser.StructureNameExpressionContext) => new ast.StructureNameExpression(ctx, this);

    visitStructureName = (ctx: parser.StructureNameContext) => new ast.StructureName(ctx, this);

    visitStructureSemanticName = (ctx: parser.StructureSemanticNameContext) => new ast.StructureSemanticName(ctx, this);

    visitStructureRealName = (ctx: parser.StructureRealNameContext) => new ast.StructureRealName(ctx, this);

    visitStructureAliasExpression = (ctx: parser.StructureAliasExpressionContext) => new ast.StructureAliasExpression(ctx, this);

    visitStructureAlias = (ctx: parser.StructureAliasContext) => new ast.StructureAlias(ctx, this);

    visitStructureTypeExpression = (ctx: parser.StructureTypeExpressionContext) => new ast.StructureTypeExpression(ctx, this);

    visitBasicStructureTypeExpression = (ctx: parser.BasicStructureTypeExpressionContext) => new ast.BasicStructureTypeExpression(ctx, this);

    visitBasicStructureTypeVariable = (ctx: parser.BasicStructureTypeVariableContext) => new ast.BasicStructureTypeVariable(ctx, this);

    visitInheritedStructureTypeExpression = (ctx: parser.InheritedStructureTypeExpressionContext) => new ast.InheritedStructureTypeExpression(ctx, this);

    visitInheritedStructureTypeVariable = (ctx: parser.InheritedStructureTypeVariableContext) => new ast.InheritedStructureTypeVariable(ctx, this);

    visitKnowledgeStructureType = (ctx: parser.KnowledgeStructureTypeContext) => new ast.KnowledgeStructureType(ctx, this);

    visitBasicStructureType = (ctx: parser.BasicStructureTypeContext) => new ast.BasicStructureType(ctx, this);

    visitStandardStructureType = (ctx: parser.StandardStructureTypeContext) => new ast.StandardStructureType(ctx, this);

    visitVariableStructureType = (ctx: parser.VariableStructureTypeContext) => new ast.VariableStructureType(ctx, this);

    visitBasicPropertyDeclaration = (ctx: parser.BasicPropertyDeclarationContext) => new ast.BasicPropertyDeclaration(ctx, this);

    visitPropertyNameExpression = (ctx: parser.PropertyNameExpressionContext) => new ast.PropertyNameExpression(ctx, this);

    visitPropertyNameVariable = (ctx: parser.PropertyNameVariableContext) => new ast.PropertyNameVariable(ctx, this);

    visitBasicPropertyName = (ctx: parser.BasicPropertyNameContext) => new ast.BasicPropertyName(ctx, this);

    visitBuiltinPropertyName = (ctx: parser.BuiltinPropertyNameContext) => new ast.BuiltinPropertyName(ctx, this);

    visitPropertyValueExpression = (ctx: parser.PropertyValueExpressionContext) => new ast.PropertyValueExpression(ctx, this);

    visitPropertyValueVariable = (ctx: parser.PropertyValueVariableContext) => new ast.PropertyValueVariable(ctx, this);

    visitBasicPropertyValue = (ctx: parser.BasicPropertyValueContext) => new ast.BasicPropertyValue(ctx, this);

    visitBuiltinPropertyValue = (ctx: parser.BuiltinPropertyValueContext) => new ast.BuiltinPropertyValue(ctx, this);

    visitBlockPropertyValue = (ctx: parser.BlockPropertyValueContext) => new ast.BlockPropertyValue(ctx, this);

    visitBlockContent = (ctx: parser.BlockContentContext) => new ast.BlockContent(ctx, this);

    visitEntityDeclaration = (ctx: parser.EntityDeclarationContext) => new ast.EntityDeclaration(ctx, this);

    visitPropertyDeclaration = (ctx: parser.PropertyDeclarationContext) => new ast.PropertyDeclaration(ctx, this);

}

export const schemaASTBuilder = new SchemaASTBuilder();
