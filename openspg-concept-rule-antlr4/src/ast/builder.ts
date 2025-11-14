import * as parser from '../antlr4';
import * as ast from './index';

export type Result = ast.SyntaxNode;

export class ConceptRuleASTBuilder extends parser.ConceptRuleParserVisitor<ast.SyntaxNode | any> {

    visitSourceUnit = (ctx: parser.SourceUnitContext) => new ast.SourceUnit(ctx, this);

    visitNamespace = (ctx: parser.NamespaceContext) => new ast.Namespace(ctx, this);
    // visitNamespaceValue?: (ctx: parser.NamespaceValueContext) => Result;

    visitRuleWrapper = (ctx: parser.RuleWrapperContext) => new ast.RuleWrapper(ctx, this);
    visitRuleWrapperHead = (ctx: parser.RuleWrapperHeadContext) => new ast.RuleWrapperHead(ctx, this);
    // visitRuleWrapperPattern?: (ctx: parser.RuleWrapperPatternContext) => Result;
    visitRuleWrapperBody = (ctx: parser.RuleWrapperBodyContext) => new ast.RuleWrapperBody(ctx, this);
    // visitBaseRuleDefine?: (ctx: parser.BaseRuleDefineContext) => Result;
    visitTheDefineStructure = (ctx: parser.TheDefineStructureContext) => new ast.TheDefineStructure(ctx, this);
    // visitPredicatedDefine?: (ctx: parser.PredicatedDefineContext) => Result;

    visitTheGraphStructure = (ctx: parser.TheGraphStructureContext) => new ast.TheGraphStructure(ctx, this);
    visitTheGraphStructureHead= (ctx: parser.TheGraphStructureHeadContext)=> new ast.TheGraphStructureHead(ctx, this);
    visitTheGraphStructureBody= (ctx: parser.TheGraphStructureBodyContext)=> new ast.TheGraphStructureBody(ctx, this);
    visitGraphStructureList= (ctx: parser.GraphStructureListContext)=> new ast.GraphStructureList(ctx, this);
    visitGraphStructure= (ctx: parser.GraphStructureContext)=> new ast.GraphStructure(ctx, this);
    visitDefineEdge= (ctx: parser.DefineEdgeContext)=> new ast.DefineEdge(ctx, this);
    // visitEdgeDirection?: (ctx: EdgeDirectionContext) => Result;
    // visitRepeatTime?: (ctx: RepeatTimeContext) => Result;
    // visitVertexFrom?: (ctx: VertexFromContext) => Result;
    // visitVertexTo?: (ctx: VertexToContext) => Result;
    // visitEdgeName?: (ctx: EdgeNameContext) => Result;
    visitDefineVertex= (ctx: parser.DefineVertexContext)=> new ast.DefineVertex(ctx, this);
    // visitVertexName?: (ctx: VertexNameContext) => Result;
    visitLabelPropertyList = (ctx: parser.LabelPropertyListContext) => new ast.LabelPropertyList(ctx, this);
    visitPropertyExpression = (ctx: parser.PropertyExpressionContext) => new ast.PropertyExpression(ctx, this);
    visitLabelNameList = (ctx: parser.LabelNameListContext) => new ast.LabelNameList(ctx, this);
    // visitPropertyKey?: (ctx: PropertyKeyContext) => Result;
    // visitPropertyValue?: (ctx: PropertyValueContext) => Result;
    visitPathPatternList= (ctx: parser.PathPatternListContext)=> new ast.PathPatternList(ctx, this);
    visitPathPattern= (ctx: parser.PathPatternContext)=> new ast.PathPattern(ctx, this);
    // visitPathCondition?: (ctx: PathConditionContext) => Result;
    // visitPathVariable?: (ctx: PathVariableContext) => Result;
    visitElementPatternList= (ctx: parser.ElementPatternListContext)=> new ast.ElementPatternList(ctx, this);
    visitElementPattern= (ctx: parser.ElementPatternContext)=> new ast.ElementPattern(ctx, this);
    visitElementPatternAddition= (ctx: parser.ElementPatternAdditionContext)=> new ast.ElementPatternAddition(ctx, this);
    visitNodePattern= (ctx: parser.NodePatternContext)=> new ast.NodePattern(ctx, this);
    visitEdgePattern= (ctx: parser.EdgePatternContext)=> new ast.EdgePattern(ctx, this);
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

    visitElementPatternDeclarationAndFiller = (ctx: parser.ElementPatternDeclarationAndFillerContext) => new ast.ElementPatternDeclarationAndFiller(ctx, this);
    visitElementLookup = (ctx: parser.ElementLookupContext) => new ast.ElementLookup(ctx, this);
    visitElementVariableDeclaration = (ctx: parser.ElementVariableDeclarationContext) => new ast.ElementVariableDeclaration(ctx, this);
    // visitElementVariable?: (ctx: ElementVariableContext) => Result;

    visitLabelExpression = (ctx: parser.LabelExpressionContext) => new ast.LabelExpression(ctx, this);
    visitLabelName = (ctx: parser.LabelNameContext) => new ast.LabelName(ctx, this);
    visitConceptType = (ctx: parser.ConceptTypeContext) => new ast.ConceptType(ctx, this);
    visitConceptName = (ctx: parser.ConceptNameContext) => new ast.ConceptName(ctx, this);
    // visitConceptInstanceId?: (ctx: ConceptInstanceIdContext) => Result;
    // visitLinkedEdge?: (ctx: LinkedEdgeContext) => Result;
    // visitElementPatternWhereClause = (ctx: parser.ElementPatternWhereClauseContext) => new ast.ElementPatternWhereClause(ctx, this);
    // visitSearchCondition?: (ctx: SearchConditionContext) => Result;
    visitTheRule = (ctx: parser.TheRuleContext) => new ast.TheRule(ctx, this);
    // visitRuleHead?: (ctx: RuleHeadContext) => Result;
    // visitRuleExpressionBody?: (ctx: RuleExpressionBodyContext) => Result;

    visitRuleExpression= (ctx: parser.RuleExpressionContext)=> new ast.RuleExpression(ctx, this);
    visitProjectRuleExpression= (ctx: parser.ProjectRuleExpressionContext)=> new ast.ProjectRuleExpression(ctx, this);
    visitLogicRuleExpression= (ctx: parser.LogicRuleExpressionContext)=> new ast.LogicRuleExpression(ctx, this);
    // visitExplain?: (ctx: ExplainContext) => Result;
    visitExpressionSet = (ctx: parser.ExpressionSetContext) => new ast.ExpressionSet(ctx, this);
    visitValueExpression = (ctx: parser.ValueExpressionContext) => new ast.ValueExpression(ctx, this);

    // visitListOpExpress?: (ctx: ListOpExpressContext) => Result;
    // visitListOp?: (ctx: ListOpContext) => Result;
    // visitListCommonAggExpress?: (ctx: ListCommonAggExpressContext) => Result;
    // visitListOpArgs?: (ctx: ListOpArgsContext) => Result;
    // visitListCommonAggName?: (ctx: ListCommonAggNameContext) => Result;
    // visitListCommonAggIfName?: (ctx: ListCommonAggIfNameContext) => Result;
    // visitOrderOpName?: (ctx: OrderOpNameContext) => Result;
    // visitListFilterOpName?: (ctx: ListFilterOpNameContext) => Result;
    // visitListCommonAggIfExpress?: (ctx: ListCommonAggIfExpressContext) => Result;
    // visitListCommonAggIfChainExpress?: (ctx: ListCommonAggIfChainExpressContext) => Result;
    // visitListCommonAggIfOneExpress?: (ctx: ListCommonAggIfOneExpressContext) => Result;
    // visitListOrderOp?: (ctx: ListOrderOpContext) => Result;
    // visitListLimitOp?: (ctx: ListLimitOpContext) => Result;
    // visitListLimitOpAll?: (ctx: ListLimitOpAllContext) => Result;
    // visitListOrderAndLimit?: (ctx: ListOrderAndLimitContext) => Result;
    // visitIndexParameter?: (ctx: IndexParameterContext) => Result;
    // visitListGetOp?: (ctx: ListGetOpContext) => Result;
    // visitListSliceOp?: (ctx: ListSliceOpContext) => Result;
    // visitListStrJoinOp?: (ctx: ListStrJoinOpContext) => Result;
    // visitAccumulateSupportOp?: (ctx: AccumulateSupportOpContext) => Result;
    // visitListAccumulateOp?: (ctx: ListAccumulateOpContext) => Result;
    // visitListHeadEleOp?: (ctx: ListHeadEleOpContext) => Result;
    // visitListTailEleOp?: (ctx: ListTailEleOpContext) => Result;
    // visitIntegerLiteralFull?: (ctx: IntegerLiteralFullContext) => Result;
    // visitListNodesOp?: (ctx: ListNodesOpContext) => Result;
    // visitListEdgesOp?: (ctx: ListEdgesOpContext) => Result;
    // visitListReduceOp?: (ctx: ListReduceOpContext) => Result;
    // visitListConstraintOp?: (ctx: ListConstraintOpContext) => Result;
    // visitGraphGroupOpExpress?: (ctx: GraphGroupOpExpressContext) => Result;
    // visitGraphOp?: (ctx: GraphOpContext) => Result;
    // visitGraphCommonAggLookup?: (ctx: GraphCommonAggLookupContext) => Result;
    // visitGraphCommonAggUdfExpress?: (ctx: GraphCommonAggUdfExpressContext) => Result;
    // visitGraphCommonAggExpress?: (ctx: GraphCommonAggExpressContext) => Result;
    // visitGraphCommonAggName?: (ctx: GraphCommonAggNameContext) => Result;
    // visitGraphCommonAggIfName?: (ctx: GraphCommonAggIfNameContext) => Result;
    // visitGraphCommonAggIfExpress?: (ctx: GraphCommonAggIfExpressContext) => Result;
    // visitGraphCommonAggIfChainExpress?: (ctx: GraphCommonAggIfChainExpressContext) => Result;
    // visitGraphCommonAggIfOneExpress?: (ctx: GraphCommonAggIfOneExpressContext) => Result;
    // visitGraphOrderOp?: (ctx: GraphOrderOpContext) => Result;
    // visitGraphOrderAndSliceOp?: (ctx: GraphOrderAndSliceOpContext) => Result;
    // visitGraphLimitOp?: (ctx: GraphLimitOpContext) => Result;
    // visitGraphFilterOp?: (ctx: GraphFilterOpContext) => Result;
    // visitGraphAlias?: (ctx: GraphAliasContext) => Result;
    // visitGraphAliasWithProperty?: (ctx: GraphAliasWithPropertyContext) => Result;
    // visitGraphAliasElementList?: (ctx: GraphAliasElementListContext) => Result;

    visitTheAction = (ctx: parser.TheActionContext) => new ast.TheAction(ctx, this);
    // visitActionBody?: (ctx: ActionBodyContext) => Result;
    visitAddEdge = (ctx: parser.AddEdgeContext) => new ast.AddEdge(ctx, this);
    visitAddType = (ctx: parser.AddTypeContext) => new ast.AddType(ctx, this);
    visitAddEdgeParam = (ctx: parser.AddEdgeParamContext) => new ast.AddEdgeParam(ctx, this);
    visitAddProps = (ctx: parser.AddPropsContext) => new ast.AddProps(ctx, this);
    visitAddNode = (ctx: parser.AddNodeContext) => new ast.AddNode(ctx, this);

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
    // visitComplexObjExpr?: (ctx: ComplexObjExprContext) => Result;
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
