import {SemanticTokensBuilder, SemanticTokenModifiers, SemanticTokenTypes} from 'vscode-languageserver';
import * as syntax from 'openspg-concept-rule-antlr4'
import {Context, OnSemanticTokens} from '../context';


export const onSemanticTokens = (ctx: Context): OnSemanticTokens => async ({textDocument}) => {
    const builder = new SemanticTokensBuilder();

    const document = ctx.documents.get(textDocument.uri);
    if (!document || !document.ast) {
        return builder.build();
    }

    const syntaxNodeEmitters: Record<`handle${syntax.SyntaxNodeType}`, HandleSyntaxNodeFunc | null> = Object.assign(
        {},
        new SyntaxNodeEmitter(),
    );

    const tokenTypes = Object.values(SemanticTokenTypes)
    const tokenModifiers = Object.values(SemanticTokenModifiers)

    syntax.traverse(document.ast, (path) => {
        const emitterName = `handle${path.node.type}` as `handle${syntax.SyntaxNodeType}`;
        const emitter = syntaxNodeEmitters[emitterName];
        if (emitter) {
            const result = emitter(path);
            if (result) {
                const {line, column} = path.node.location.start;
                builder.push(
                    line - 1, column, path.node.range[1] - path.node.range[0] + 1,
                    tokenTypes.indexOf(result.tokenType), tokenModifiers.indexOf(result.tokenModifier)
                )
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

type HandleSyntaxNodeFunc<T extends syntax.SyntaxNode = syntax.SyntaxNode> = (path: syntax.TraversePath<T>) => HandleSyntaxNodeResult | null;

class SyntaxNodeEmitter implements Record<`handle${syntax.SyntaxNodeType}`, HandleSyntaxNodeFunc<any> | null> {
    handleNamespaceDeclaration = null;
    handleNamespaceVariable = () => new HandleSyntaxNodeResult(SemanticTokenTypes.variable);

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

