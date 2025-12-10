import {SemanticTokensBuilder} from 'vscode-languageserver';
import {Context, OnSemanticTokens} from '../context';
import * as schema from "openspg-schema-antlr4";

enum TokenTypes {
    none = 0,
    comment = 1,
    keyword = 2,
    string = 3,
    namespace = 4,
    structure = 5,
    inherited = 6,
    property = 7,
    variable = 8,
}

enum TokenModifiers {
    none = 0,
    deprecated = 1,
    declaration = 2,
    readonly = 3,
}


export const onSemanticTokens = (ctx: Context): OnSemanticTokens => async ({textDocument}) => {
    const builder = new SemanticTokensBuilder();

    const document = ctx.documents.get(textDocument.uri);
    if (!document || !document.ast) {
        return builder.build();
    }

    const syntaxNodeEmitters: Record<`handle${schema.SyntaxNodeType}`, HandleSyntaxNodeFunc | null> = Object.assign(
        {},
        new SyntaxNodeEmitter(),
    );

    schema.traverse(document.ast, (path) => {
        const emitterName = `handle${path.node.type}` as `handle${schema.SyntaxNodeType}`;
        const emitter = syntaxNodeEmitters[emitterName];
        if (emitter) {
            const result = emitter(path);
            if (result.tokenType !== TokenTypes.none) {
                const {line, column} = path.node.location.start;
                builder.push(line - 1, column, path.node.range[1] - path.node.range[0] + 1, result.tokenType, result.tokenModifier)
            }
        }
    })

    return builder.build();
}

class HandleSyntaxNodeResult {
    tokenType: TokenTypes;
    tokenModifier: TokenModifiers;

    constructor(tokenType: TokenTypes, tokenModifier: TokenModifiers = TokenModifiers.none) {
        this.tokenType = tokenType;
        this.tokenModifier = tokenModifier;
    }
}

type HandleSyntaxNodeFunc<T extends schema.SyntaxNode = schema.SyntaxNode> = (path: schema.TraversePath<T>) => HandleSyntaxNodeResult;

class SyntaxNodeEmitter implements Record<`handle${schema.SyntaxNodeType}`, HandleSyntaxNodeFunc<any> | null> {
    handleNamespaceDeclaration = null;
    handleNamespaceVariable = () => new HandleSyntaxNodeResult(TokenTypes.variable);
    handleEntityDeclaration = null;
    handleEntityMetaDeclaration = null;
    handlePropertyDeclaration = null;
    handlePropertyMetaDeclaration = null;
    handleSubPropertyDeclaration = null;
    handleSubPropertyMetaDeclaration = null;
    handleBasicPropertyDeclaration = null;
    handleBasicPropertyName = () => new HandleSyntaxNodeResult(TokenTypes.property);
    handleBasicPropertyValue = () => new HandleSyntaxNodeResult(TokenTypes.variable);
    handleBasicStructureDeclaration = null;
    handleBasicStructureType = () => new HandleSyntaxNodeResult(TokenTypes.keyword);
    handleBasicStructureTypeExpression = null;
    handleBlockPropertyValue = () => new HandleSyntaxNodeResult(TokenTypes.string);
    handleBuiltinPropertyName = () => new HandleSyntaxNodeResult(TokenTypes.keyword);
    handleBuiltinPropertyValue = () => new HandleSyntaxNodeResult(TokenTypes.keyword);
    handleInheritedStructureTypeExpression = null;
    handleKnowledgeStructureType = () => new HandleSyntaxNodeResult(TokenTypes.keyword);
    handlePropertyNameExpression = null;
    handlePropertyValueExpression = null;
    handleStandardStructureType = () => new HandleSyntaxNodeResult(TokenTypes.keyword);
    handleStructureAlias = () => new HandleSyntaxNodeResult(TokenTypes.string);
    handleStructureAliasExpression = null;
    handleStructureName = null;
    handleStructureNameExpression = null;
    handleStructureRealName = ({path}: { path: string }) => {
        if (path.split('.').includes('BasicStructureTypeExpression')) {
            return new HandleSyntaxNodeResult(TokenTypes.inherited);
        }
        return new HandleSyntaxNodeResult(TokenTypes.structure);
    };
    handleStructureSemanticName = ({path}: { path: string }) => {
        if (path.split('.').includes('BasicStructureTypeExpression')) {
            return new HandleSyntaxNodeResult(TokenTypes.inherited);
        }
        return new HandleSyntaxNodeResult(TokenTypes.structure);
    };
    handleIdentifier = null;
    handleSourceUnit = null;
}

