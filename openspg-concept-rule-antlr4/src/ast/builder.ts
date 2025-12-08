import * as parser from '../antlr4';
import * as ast from './index';
import {RuleWrapperRuleDeclarationContext, RuleWrapperRuleHeadContext} from "../antlr4";

export type Result = ast.SyntaxNode;

export class ConceptRuleASTBuilder extends parser.ConceptRuleParserVisitor<ast.SyntaxNode | any> {

    visitSourceUnit = (ctx: parser.SourceUnitContext) => new ast.SourceUnit(ctx, this);

    /**
     * Grammar
     *     namespaceDeclaration: NAMESPACE_KEYWORD namespaceVariable ;
     *     namespaceVariable: UNESCAPED_SYMBOLIC_NAME | STRING_LITERAL | ESCAPED_SYMBOLIC_NAME ;
     */
    visitNamespaceDeclaration = (ctx: parser.NamespaceDeclarationContext) => new ast.NamespaceDeclaration(ctx, this);
    visitNamespaceVariable = (ctx: parser.NamespaceVariableContext) => new ast.NamespaceVariable(ctx, this);

    /**
     * Grammar
     *     ruleWrapperDeclaration : ruleWrapperHead ruleWrapperBody ;
     *     ruleWrapperHead : labelExpression (COLON labelExpression)+ | labelExpression COLON ;
     *     ruleWrapperBody : ruleWrapperRuleDeclaration* ;
     *     ruleWrapperRuleDeclaration : ruleWrapperRuleHead COLON OPEN_RULE_BLOCK ruleWrapperRuleBody CLOSE_RULE_BLOCK ;
     *     ruleWrapperRuleHead : WRAPPER_RULE_KEYWORD ;
     *     ruleWrapperRuleBody : conceptRuleDeclaration* ;
     */
    visitRuleWrapperDeclaration = (ctx: parser.RuleWrapperDeclarationContext) => new ast.RuleWrapperDeclaration(ctx, this);
    visitRuleWrapperHead = (ctx: parser.RuleWrapperHeadContext) => new ast.RuleWrapperHead(ctx, this);
    // visitRuleWrapperBody?: (ctx: RuleWrapperBodyContext) => Result;
    visitRuleWrapperRuleDeclaration = (ctx: RuleWrapperRuleDeclarationContext)  => new ast.RuleWrapperRuleDeclaration(ctx, this);
    visitRuleWrapperRuleHead = (ctx: RuleWrapperRuleHeadContext) => new ast.RuleWrapperRuleHead(ctx, this);
    // visitRuleWrapperRuleBody = (ctx: RuleWrapperRuleBodyContext) => new ast.RuleWrapperRuleDeclaration(ctx, this);;

    /**
     * Grammar
     *     conceptRuleDeclaration : conceptRuleHead LBRACE conceptRuleBody RBRACE ;
     *     conceptRuleHead : DEFINE_KEYWORD nodePattern fullEdgePointingRight nodePattern ;
     *     conceptRuleBody : theGraphStructureDeclaration theRuleDeclaration? theActionDeclaration? ;
     */
    visitConceptRuleDeclaration = (ctx: parser.ConceptRuleDeclarationContext) => new ast.ConceptRuleDeclaration(ctx, this);
    visitConceptRuleHead = (ctx: parser.ConceptRuleHeadContext) => new ast.ConceptRuleHead(ctx, this);
    // visitConceptRuleBody?: (ctx: ConceptRuleBodyContext) => Result;

    /**
     * Grammar
     *     theGraphStructureDeclaration : theGraphStructureHead LBRACE theGraphStructureBody? RBRACE ;
     *     theGraphStructureHead : GRAPH_STRUCTURE_KEYWORD | STRUCTURE_KEYWORD ;
     *     theGraphStructureBody : graphStructureList | pathPatternList ;
     *     graphStructureList : graphStructure+;
     */
    visitTheGraphStructureDeclaration = (ctx: parser.TheGraphStructureDeclarationContext) => new ast.TheGraphStructureDeclaration(ctx, this);
    visitTheGraphStructureHead = (ctx: parser.TheGraphStructureHeadContext) => new ast.TheGraphStructureHead(ctx, this);
    // visitTheGraphStructureBody?: (ctx: GraphStructureBodyContext) => Result;
    // visitGraphStructureList?: (ctx: GraphStructureListContext) => Result;

    /**
     * Grammar
     *     graphStructure : edgeExpression | vertexExpression;
     */
    visitGraphStructure = (ctx: parser.GraphStructureContext) => new ast.GraphStructure(ctx, this);

    /**
     * Grammar
     *     edgeExpression: vertexFrom edgeDirection vertexTo (LBRACKET labelPropertyList RBRACKET)? (REPEAT_KEYWORD repeatTime)? (AS_KEYWORD edgeName)?;
     *     edgeDirection: RIGHT_ARROW | BOTH_ARROW;
     *     repeatTime : LPARENTH lowerBound COMMA upperBound RPARENTH;
     *     vertexFrom : vertexName;
     *     vertexTo : vertexName;
     *     edgeName : identifier;
     */
    visitEdgeExpression = (ctx: parser.EdgeExpressionContext) => new ast.EdgeExpression(ctx, this);
    // visitEdgeDirection?: (ctx: parser.EdgeDirectionContext) => Result;
    // visitRepeatTime?: (ctx: parser.RepeatTimeContext) => Result;
    // visitVertexFrom?: (ctx: parser.VertexFromContext) => Result;
    // visitVertexTo?: (ctx: parser.VertexToContext) => Result;
    // visitEdgeName?: (ctx: parser.EdgeNameContext) => Result;

    /**
     * Grammar
     *     vertexExpression : vertexName (COMMA vertexName)* (LBRACKET labelPropertyList RBRACKET)?;
     *     vertexName : identifier;
     */
    visitVertexExpression = (ctx: parser.VertexExpressionContext) => new ast.VertexExpression(ctx, this);
    // visitVertexName?: (ctx: VertexNameContext) => Result;


    /**
     * Grammar
     *     labelPropertyList : (labelNameList | propertyExpression) (COMMA propertyExpression)*;
     *     labelNameList : labelName (COMMA labelName);
     *     propertyExpression: propertyKey EQ propertyValue;
     *     propertyKey : identifier;
     *     propertyValue : numericLiteral | identifier | characterStringLiteral | parameterValueSpecification;
     */
    visitLabelPropertyList = (ctx: parser.LabelPropertyListContext) => new ast.LabelPropertyList(ctx, this);
    visitLabelNameList = (ctx: parser.LabelNameListContext) => new ast.LabelNameList(ctx, this);
    visitPropertyExpression = (ctx: parser.PropertyExpressionContext) => new ast.PropertyExpression(ctx, this);
    // visitPropertyKey?: (ctx: PropertyKeyContext) => Result;
    // visitPropertyValue?: (ctx: PropertyValueContext) => Result;


    /**
     * Grammar
     *     pathPatternList : pathPattern+;
     *     pathPattern : (pathCondition? pathVariable COLON )? elementPatternList;
     *     pathCondition : OPTIONAL_KEYWORD;
     *     pathVariable : identifier;
     */
    visitPathPatternList = (ctx: parser.PathPatternListContext) => new ast.PathPatternList(ctx, this);
    visitPathPattern = (ctx: parser.PathPatternContext) => new ast.PathPattern(ctx, this);
    // visitPathCondition?: (ctx: PathConditionContext) => Result;
    // visitPathVariable?: (ctx: PathVariableContext) => Result;


    /**
     * Grammar
     *     elementPatternList : elementPattern (COMMA elementPattern)*;
     *     elementPattern : nodePattern elementPatternAddition*;
     *     elementPatternAddition : edgePattern nodePattern;
     *     nodePattern : LPARENTH elementPatternDeclarationAndFiller RPARENTH;
     *     edgePattern : (fullEdgePattern | abbreviatedEdgePattern) graphPatternQuantifier?;
     */
    visitElementPatternList = (ctx: parser.ElementPatternListContext) => new ast.ElementPatternList(ctx, this);
    visitElementPattern = (ctx: parser.ElementPatternContext) => new ast.ElementPattern(ctx, this);
    visitElementPatternAddition = (ctx: parser.ElementPatternAdditionContext) => new ast.ElementPatternAddition(ctx, this);
    visitNodePattern = (ctx: parser.NodePatternContext) => new ast.NodePattern(ctx, this);
    visitEdgePattern = (ctx: parser.EdgePatternContext) => new ast.EdgePattern(ctx, this);

    // visitFullEdgePattern?: (ctx: FullEdgePatternContext) => Result;
    // visitFullEdgePointingRight?: (ctx: FullEdgePointingRightContext) => Result;
    // visitFullEdgePointingLeft?: (ctx: FullEdgePointingLeftContext) => Result;
    // visitFullEdgeAnyDirection?: (ctx: FullEdgeAnyDirectionContext) => Result;
    // visitEdgePatternPerNodeLimitClause?: (ctx: EdgePatternPerNodeLimitClauseContext) => Result;
    // visitPerNodeLimit?: (ctx: PerNodeLimitContext) => Result;
    // visitGraphPatternQuantifier?: (ctx: GraphPatternQuantifierContext) => Result;
    // visitQuantifier?: (ctx: QuantifierContext) => Result;
    // visitLowerBound?: (ctx: LowerBoundContext) => Result;
    // visitUpperBound?: (ctx: UpperBoundContext) => Result;
    // visitAbbreviatedEdgePattern?: (ctx: AbbreviatedEdgePatternContext) => Result;

    /**
     * Grammar
     *     elementPatternDeclarationAndFiller : elementVariableDeclaration? elementLookup? elementPatternWhereClause?;
     *     elementLookup : COLON ( labelExpression | linkedEdge )?;
     *     elementVariableDeclaration : elementVariable;
     *     elementVariable : identifier;
     *     linkedEdge : functionExpr;
     */
    visitElementPatternDeclarationAndFiller = (ctx: parser.ElementPatternDeclarationAndFillerContext) => new ast.ElementPatternDeclarationAndFiller(ctx, this);
    visitElementLookup = (ctx: parser.ElementLookupContext) => new ast.ElementLookup(ctx, this);
    visitElementVariableDeclaration = (ctx: parser.ElementVariableDeclarationContext) => new ast.ElementVariableDeclaration(ctx, this);
    // visitElementVariable?: (ctx: ElementVariableContext) => Result;
    // visitLinkedEdge?: (ctx: LinkedEdgeContext) => Result;


    /**
     * Grammar
     *     labelExpression : labelName (VBAR labelName)*;
     *     labelName : (conceptName (PLUS conceptName)*) | conceptType;
     *     conceptType : identifier (DOT identifier)?;
     *     conceptName : conceptType DIV conceptInstanceId;
     *     conceptInstanceId : ESCAPED_SYMBOLIC_NAME;
     */
    visitLabelExpression = (ctx: parser.LabelExpressionContext) => new ast.LabelExpression(ctx, this);
    visitLabelName = (ctx: parser.LabelNameContext) => new ast.LabelName(ctx, this);
    visitConceptType = (ctx: parser.ConceptTypeContext) => new ast.ConceptType(ctx, this);
    visitConceptName = (ctx: parser.ConceptNameContext) => new ast.ConceptName(ctx, this);
    // visitConceptInstanceId?: (ctx: ConceptInstanceIdContext) => Result;


    /**
     * Grammar
     *     elementPatternWhereClause : WHERE_KEYWORD searchCondition;
     *     searchCondition : logicValueExpression;
     */
    visitElementPatternWhereClause = (ctx: parser.ElementPatternWhereClauseContext) => new ast.ElementPatternWhereClause(ctx, this);
    // visitSearchCondition?: (ctx: SearchConditionContext) => Result;


    /**
     * Grammar
     *     theRuleDeclaration : theRuleHead LBRACE theRuleBody RBRACE;
     *     theRuleHead : CONSTRAINT_KEYWORD | RULE_KEYWORD;
     *     theRuleBody : ruleExpression*;
     */
    visitTheRuleDeclaration = (ctx: parser.TheRuleDeclarationContext) => new ast.TheRuleDeclaration(ctx, this);
    visitTheRuleHead = (ctx: parser.TheRuleHeadContext) => new ast.TheRuleHead(ctx, this);
    // visitTheRuleBody?: (ctx: TheRuleBodyContext) => Result;
    visitTheRuleExpression = (ctx: parser.TheRuleExpressionContext) => new ast.TheRuleExpression(ctx, this);


    /**
     * Grammar
     *     projectRuleExpression : identifier (DOT propertyName)? explain? EQ expressionSet;
     *     logicRuleExpression : identifier explain? COLON expressionSet;
     *     explain : LPARENTH unbrokenCharacterStringLiteral RPARENTH;
     *     expressionSet : graphGroupOpExpress | listOpExpress | valueExpression;
     *     valueExpression : logicValueExpression | projectValueExpression;
     */
    visitProjectRuleExpression = (ctx: parser.ProjectRuleExpressionContext) => new ast.ProjectRuleExpression(ctx, this);
    visitLogicRuleExpression = (ctx: parser.LogicRuleExpressionContext) => new ast.LogicRuleExpression(ctx, this);
    // visitExplain?: (ctx: ExplainContext) => Result;
    visitExpressionSet = (ctx: parser.ExpressionSetContext) => new ast.ExpressionSet(ctx, this);
    visitValueExpression = (ctx: parser.ValueExpressionContext) => new ast.ValueExpression(ctx, this);

    /**
     * Grammar
     *     theActionDeclaration : theActionHead LBRACE theActionBody* RBRACE;
     *     theActionHead : ACTION_KEYWORD;
     *     theActionBody : addNodeFunction | addEdgeFunction;
     *     addNodeFunction : (identifier EQ)? ADD_NODE_KEYWORD LPARENTH typeFunctionParam COMMA objectFunctionParam RPARENTH;
     *     addEdgeFunction : ADD_EDGE_KEYWORD LPARENTH nodeFunctionParam COMMA nodeFunctionParam COMMA typeFunctionParam COMMA objectFunctionParam RPARENTH;
     *     typeFunctionParam : identifier EQ labelExpression;
     *     nodeFunctionParam : identifier EQ identifier;
     *     objectFunctionParam : identifier EQ complexObjExpression;
     */

    visitTheActionDeclaration = (ctx: parser.TheActionDeclarationContext) => new ast.TheActionDeclaration(ctx, this);
    visitTheActionHead = (ctx: parser.TheActionHeadContext) => new ast.TheActionHead(ctx, this);
    // visitTheActionBody?: (ctx: TheActionBodyContext) => Result;
    visitTheActionExpression = (ctx: parser.TheActionExpressionContext) => new ast.TheActionExpression(ctx, this);
    visitAddNodeFunction = (ctx: parser.AddNodeFunctionContext) => new ast.AddNodeFunction(ctx, this);
    visitAddEdgeFunction = (ctx: parser.AddEdgeFunctionContext) => new ast.AddEdgeFunction(ctx, this);
    visitTypeFunctionParam = (ctx: parser.TypeFunctionParamContext) => new ast.TypeFunctionParam(ctx, this);
    visitNodeFunctionParam = (ctx: parser.NodeFunctionParamContext) => new ast.NodeFunctionParam(ctx, this);
    visitObjectFunctionParam = (ctx: parser.ObjectFunctionParamContext) => new ast.ObjectFunctionParam(ctx, this);

    // visitAnd?: (ctx: AndContext) => Result;
    // visitOr?: (ctx: OrContext) => Result;
    // visitNot?: (ctx: NotContext) => Result;
    // visitXor?: (ctx: XorContext) => Result;
    // visitValueExpressionPrimary?: (ctx: ValueExpressionPrimaryContext) => Result;
    // visitParenthesizedValueExpression?: (ctx: ParenthesizedValueExpressionContext) => Result;
    // visitNonParenthesizedValueExpressionPrimaryWithProperty?: (ctx: NonParenthesizedValueExpressionPrimaryWithPropertyContext) => Result;
    // visitNonParenthesizedValueExpressionPrimary?: (ctx: NonParenthesizedValueExpressionPrimaryContext) => Result;
    // visitPropertyName?: (ctx: PropertyNameContext) => Result;
    // visitBindingVariable?: (ctx: BindingVariableContext) => Result;
    // visitBindingVariableName?: (ctx: BindingVariableNameContext) => Result;
    // visitUnsignedValueSpecification?: (ctx: UnsignedValueSpecificationContext) => Result;
    // visitUnsignedLiteral?: (ctx: UnsignedLiteralContext) => Result;
    // visitGeneralLiteral?: (ctx: GeneralLiteralContext) => Result;
    // visitPredefinedTypeLiteral?: (ctx: PredefinedTypeLiteralContext) => Result;
    // visitBooleanLiteral?: (ctx: BooleanLiteralContext) => Result;
    // visitCharacterStringLiteral?: (ctx: CharacterStringLiteralContext) => Result;
    // visitParameterValueSpecification?: (ctx: ParameterValueSpecificationContext) => Result;
    // visitListLiteral?: (ctx: ListLiteralContext) => Result;
    // visitListElementList?: (ctx: ListElementListContext) => Result;
    // visitListElement?: (ctx: ListElementContext) => Result;
    // visitExpr?: (ctx: ExprContext) => Result;
    // visitBinaryExpr?: (ctx: BinaryExprContext) => Result;
    // visitBinaryOp?: (ctx: BinaryOpContext) => Result;
    // visitUnaryExpr?: (ctx: UnaryExprContext) => Result;
    // visitUnaryOp?: (ctx: UnaryOpContext) => Result;
    // visitFunctionExpr?: (ctx: FunctionExprContext) => Result;
    // visitFunctionName?: (ctx: FunctionNameContext) => Result;
    // visitFunctionArgs?: (ctx: FunctionArgsContext) => Result;
    // visitLambdaExpr?: (ctx: LambdaExprContext) => Result;
    // visitBinaryLambdaArgs?: (ctx: BinaryLambdaArgsContext) => Result;
    // visitLogicValueExpression?: (ctx: LogicValueExpressionContext) => Result;
    // visitLogicTerm?: (ctx: LogicTermContext) => Result;
    // visitLogicItem?: (ctx: LogicItemContext) => Result;
    // visitLogicFactor?: (ctx: LogicFactorContext) => Result;
    // visitLogicTest?: (ctx: LogicTestContext) => Result;
    // visitTruthValue?: (ctx: TruthValueContext) => Result;
    // visitUnsignedNumericLiteral?: (ctx: UnsignedNumericLiteralContext) => Result;
    // visitSign?: (ctx: SignContext) => Result;
    // visitComplexObjExpression?: (ctx: ComplexObjExpressionContext) => Result;

    /**
     * Grammar
     *     assignmentExpression : identifier EQ expressionSet;
     */
    visitAssignmentExpression = (ctx: parser.AssignmentExpressionContext) => new ast.AssignmentExpression(ctx, this);

    // visitProjectValueExpression?: (ctx: ProjectValueExpressionContext) => Result;
    // visitTerm?: (ctx: TermContext) => Result;
    // visitFactor?: (ctx: FactorContext) => Result;
    // visitProjectPrimary?: (ctx: ProjectPrimaryContext) => Result;
    // visitNumericValueFunction?: (ctx: NumericValueFunctionContext) => Result;
    // visitAbsoluteValueExpression?: (ctx: AbsoluteValueExpressionContext) => Result;
    // visitFloorFunction?: (ctx: FloorFunctionContext) => Result;
    // visitCeilingFunction?: (ctx: CeilingFunctionContext) => Result;
    // visitSpoRule?: (ctx: SpoRuleContext) => Result;
    // visitRuleNameDeclaration?: (ctx: RuleNameDeclarationContext) => Result;
    // visitSeparator?: (ctx: SeparatorContext) => Result;
    // visitUnbrokenCharacterStringLiteral?: (ctx: UnbrokenCharacterStringLiteralContext) => Result;
    // visitNumericLiteral?: (ctx: NumericLiteralContext) => Result;

    visitIdentifier = (ctx: parser.IdentifierContext) => new ast.Identifier(ctx, this);


}

export const conceptRuleASTBuilder = new ConceptRuleASTBuilder();
