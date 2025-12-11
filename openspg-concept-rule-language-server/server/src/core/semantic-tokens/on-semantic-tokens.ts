import {SemanticTokensBuilder} from 'vscode-languageserver';
import {Context, OnSemanticTokens} from '../context';
import * as ruleSyntax from 'openspg-concept-rule-antlr4'

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

    const syntaxNodeEmitters: Record<`handle${ruleSyntax.SyntaxNodeType}`, HandleSyntaxNodeFunc | null> = Object.assign(
        {},
        new SyntaxNodeEmitter(),
    );

    ruleSyntax.traverse(document.ast, (path) => {
        const emitterName = `handle${path.node.type}` as `handle${ruleSyntax.SyntaxNodeType}`;
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

type HandleSyntaxNodeFunc<T extends ruleSyntax.SyntaxNode = ruleSyntax.SyntaxNode> = (path: ruleSyntax.TraversePath<T>) => HandleSyntaxNodeResult;

class SyntaxNodeEmitter implements Record<`handle${ruleSyntax.SyntaxNodeType}`, HandleSyntaxNodeFunc<any> | null> {
    handleNamespaceDeclaration = null;
    handleNamespaceVariable = () => new HandleSyntaxNodeResult(TokenTypes.variable);

    handleConceptRuleDeclaration = null;
    handleConceptRuleHead = null;
    handleRuleWrapperDeclaration = null;
    handleRuleWrapperHead = null;
    handleRuleWrapperRuleDeclaration = null;
    handleRuleWrapperRuleHead = null;
    handleTheActionDeclaration = null;
    handleTheActionHead = null;
    handleTheGraphStructureDeclaration = null;
    handleTheGraphStructureHead = null;
    handleTheRuleDeclaration = null;
    handleTheRuleHead = null;
    handleAddEdgeFunction = null;
    handleAddNodeFunction = null;
    handleAssignmentExpression = null;
    handleConceptName = null;
    handleConceptType = null;
    handleEdgeExpression = null;
    handleEdgePattern = null;
    handleElementLookup = null;
    handleElementPattern = null;
    handleElementPatternAddition = null;
    handleElementPatternDeclarationAndFiller = null;
    handleElementPatternList = null;
    handleElementPatternWhereClause = null;
    handleElementVariableDeclaration = null;
    handleExpressionSet = null;
    handleLabelExpression = null;
    handleLabelName = null;
    handleLabelNameList = null;
    handleLabelPropertyList = null;
    handleLogicRuleExpression = null;
    handleNodeFunctionParam = null;
    handleNodePattern = null;
    handleObjectFunctionParam = null;
    handlePathPattern = null;
    handlePathPatternList = null;
    handleProjectRuleExpression = null;
    handlePropertyExpression = null;
    handleTypeFunctionParam = null;
    handleValueExpression = null;
    handleVertexExpression = null;
    handleIdentifier = null;
    handleSourceUnit = null;
}

