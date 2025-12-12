import {SemanticTokensBuilder, SemanticTokenTypes, SemanticTokenModifiers} from 'vscode-languageserver';
import {Context, OnSemanticTokens} from '../context';
import * as schema from "openspg-schema-antlr4";

// enum TokenTypes {
//     none = 0,
//     comment = 1,
//     keyword = 2,
//     string = 3,
//     namespace = 4,
//     structure = 5,
//     inherited = 6,
//     property = 7,
//     variable = 8,
// }
//
// enum TokenModifiers {
//     none = 0,
//     deprecated = 1,
//     declaration = 2,
//     readonly = 3,
// }


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

    const tokenTypes = Object.values(SemanticTokenTypes)
    const tokenModifiers = Object.values(SemanticTokenModifiers)

    schema.traverse(document.ast, (path) => {
        const emitterName = `handle${path.node.type}` as `handle${schema.SyntaxNodeType}`;
        const emitter = syntaxNodeEmitters[emitterName];
        if (emitter) {
            const result = emitter(path);
            if (result) {
                const {line, column} = path.node.location.start;
                const length = path.node.range[1] - path.node.range[0] + 1;
                builder.push(line - 1, column, length, tokenTypes.indexOf(result.tokenType), tokenModifiers.indexOf(result.tokenModifier));
            }
        }
    })

    return builder.build();
}

class HandleSyntaxNodeResult {
    tokenType: SemanticTokenTypes;
    tokenModifier: SemanticTokenModifiers;

    constructor(tokenType: SemanticTokenTypes, tokenModifier: SemanticTokenModifiers = SemanticTokenModifiers.declaration) {
        this.tokenType = tokenType;
        this.tokenModifier = tokenModifier;
    }
}

type HandleSyntaxNodeFunc<T extends schema.SyntaxNode = schema.SyntaxNode> = (path: schema.TraversePath<T>) => HandleSyntaxNodeResult | null;

class SyntaxNodeEmitter implements Record<`handle${schema.SyntaxNodeType}`, HandleSyntaxNodeFunc<any> | null> {
    handleNamespaceDeclaration = null;
    handleNamespaceVariable = () => new HandleSyntaxNodeResult(SemanticTokenTypes.variable);
    handleEntityDeclaration = null;
    handleEntityMetaDeclaration = null;
    handlePropertyDeclaration = null;
    handlePropertyMetaDeclaration = null;
    handleSubPropertyDeclaration = null;
    handleSubPropertyMetaDeclaration = null;
    handleBasicPropertyDeclaration = null;
    handleBasicPropertyName = () => new HandleSyntaxNodeResult(SemanticTokenTypes.property);
    handleBasicPropertyValue = () => new HandleSyntaxNodeResult(SemanticTokenTypes.variable);
    handleBasicStructureDeclaration = null;
    handleBasicStructureType = () => new HandleSyntaxNodeResult(SemanticTokenTypes.keyword);
    handleBasicStructureTypeExpression = null;
    handleBlockPropertyValue = () => new HandleSyntaxNodeResult(SemanticTokenTypes.string);
    handleBuiltinPropertyName = () => new HandleSyntaxNodeResult(SemanticTokenTypes.keyword);
    handleBuiltinPropertyValue = () => new HandleSyntaxNodeResult(SemanticTokenTypes.keyword);
    handleInheritedStructureTypeExpression = null;
    handleKnowledgeStructureType = () => new HandleSyntaxNodeResult(SemanticTokenTypes.keyword);
    handlePropertyNameExpression = null;
    handlePropertyValueExpression = null;
    handleStandardStructureType = () => new HandleSyntaxNodeResult(SemanticTokenTypes.keyword);
    handleStructureAlias = () => new HandleSyntaxNodeResult(SemanticTokenTypes.string);
    handleStructureAliasExpression = null;
    handleStructureName = null;
    handleStructureNameExpression = null;
    handleStructureRealName = ({path}: { path: string }) => {
        if (path.split('.').includes('BasicStructureTypeExpression')) {
            return new HandleSyntaxNodeResult(SemanticTokenTypes.modifier);
        }
        return new HandleSyntaxNodeResult(SemanticTokenTypes.struct);
    };
    handleStructureSemanticName = ({path}: { path: string }) => {
        if (path.split('.').includes('BasicStructureTypeExpression')) {
            return new HandleSyntaxNodeResult(SemanticTokenTypes.modifier);
        }
        return new HandleSyntaxNodeResult(SemanticTokenTypes.struct);
    };
    handleIdentifier = null;
    handleSourceUnit = null;
}

