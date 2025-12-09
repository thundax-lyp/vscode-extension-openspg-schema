import {SemanticTokensBuilder} from 'vscode-languageserver';
import {Context, OnSemanticTokens} from '../context';
import * as schema from "openspg-schema-antlr4";

export enum TokenTypes {
    unused = -1,
    comment = 0,
    keyword = 1,
    string = 2,
    namespace = 3,
    structure = 4,
    inherited = 5,
    property = 6,
    variable = 7,
    _ = 8
}

enum TokenModifiers {
    default = 0,
    deprecated = 1,
    _ = 2,
}

export type HandleSyntaxNodeFunc<T extends schema.SyntaxNode = schema.SyntaxNode> = (path: schema.TraversePath<T>) => number;

const defaultSyntaxNodeFunc = () => TokenTypes.unused;

class SyntaxNodeEmitter implements Record<`handle${schema.SyntaxNodeType}`, HandleSyntaxNodeFunc<any>> {
    handleNamespaceDeclaration = defaultSyntaxNodeFunc;
    handleNamespaceVariable = () => TokenTypes.variable;
    handleEntityDeclaration = defaultSyntaxNodeFunc;
    handleEntityMetaDeclaration = defaultSyntaxNodeFunc;
    handlePropertyDeclaration = defaultSyntaxNodeFunc;
    handlePropertyMetaDeclaration = defaultSyntaxNodeFunc;
    handleSubPropertyDeclaration = defaultSyntaxNodeFunc;
    handleSubPropertyMetaDeclaration = defaultSyntaxNodeFunc;
    handleBasicPropertyDeclaration = defaultSyntaxNodeFunc;
    handleBasicPropertyName = () => TokenTypes.property;
    handleBasicPropertyValue = () => TokenTypes.variable;
    handleBasicStructureDeclaration = defaultSyntaxNodeFunc;
    handleBasicStructureType = () => TokenTypes.keyword;
    handleBasicStructureTypeExpression = defaultSyntaxNodeFunc;
    handleBlockPropertyValue = () => TokenTypes.string;
    handleBuiltinPropertyName = () => TokenTypes.keyword;
    handleBuiltinPropertyValue = () => TokenTypes.keyword;
    handleInheritedStructureTypeExpression = defaultSyntaxNodeFunc;
    handleKnowledgeStructureType = () => TokenTypes.keyword;
    handlePropertyNameExpression = defaultSyntaxNodeFunc;
    handlePropertyValueExpression = defaultSyntaxNodeFunc;
    handleStandardStructureType = () => TokenTypes.keyword;
    handleStructureAlias = () => TokenTypes.string;
    handleStructureAliasExpression = defaultSyntaxNodeFunc;
    handleStructureName = defaultSyntaxNodeFunc;
    handleStructureNameExpression = defaultSyntaxNodeFunc;
    handleStructureRealName = ({path}: { path: string }) => {
        if (path.split('.').includes('BasicStructureTypeExpression')) {
            return TokenTypes.inherited;
        }
        return TokenTypes.structure;
    };
    handleStructureSemanticName = ({path}: { path: string }) => {
        if (path.split('.').includes('BasicStructureTypeExpression')) {
            return TokenTypes.inherited;
        }
        return TokenTypes.structure;
    };
    handleIdentifier = defaultSyntaxNodeFunc;
    handleSourceUnit = defaultSyntaxNodeFunc;
}

const syntaxNodeEmitters: Record<`handle${schema.SyntaxNodeType}`, HandleSyntaxNodeFunc> = Object.assign(
    {},
    new SyntaxNodeEmitter(),
);

export const onSemanticTokens = (ctx: Context): OnSemanticTokens => async ({textDocument}) => {
    const builder = new SemanticTokensBuilder();

    const document = ctx.documents.get(textDocument.uri);
    if (!document || !document.ast) {
        return builder.build();
    }

    schema.traverse(document.ast, (path) => {
        const emitterName = `handle${path.node.type}` as `handle${schema.SyntaxNodeType}`;
        const emitter = syntaxNodeEmitters[emitterName];
        if (!emitter) {
            throw new Error(`missing emitter for node type "${path.node.type}"`);
        }

        const tokenType = emitter(path);
        if (tokenType !== TokenTypes.unused) {
            const {line, column} = path.node.location.start;
            const tokenModifiers = TokenModifiers.default;
            builder.push(line - 1, column, path.node.range[1] - path.node.range[0] + 1, tokenType, tokenModifiers)
        }
    })

    return builder.build();
}
