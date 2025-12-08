import {Doc} from "prettier";
import * as ast from '../../ast';
import {BasePrinter, PrintFunc} from './base';

export class PrinterExpression extends BasePrinter implements Record<`print${ast.ExpressionNodeType}`, PrintFunc<any>> {

    // addEdgeFunction : ADD_EDGE_KEYWORD LPARENTH nodeFunctionParam COMMA nodeFunctionParam COMMA typeFunctionParam COMMA objectFunctionParam RPARENTH;
    printAddEdgeFunction: PrintFunc<ast.AddEdgeFunction> = ({path, print}): Doc[] => [
        ["createEdgeInstance"],
        this.block(
            this.builders.join(
                [this.comma, this.builders.hardline],
                [
                    path.call(print, "sourceNode"),
                    path.call(print, "targetNode"),
                    path.call(print, "typeParam"),
                    path.call(print, "props")
                ]
            ), {
                openTag: "(", closeTag: ")"
            }
        )
    ]

    // addNodeFunction : (identifier EQ)? ADD_NODE_KEYWORD LPARENTH typeFunctionParam COMMA objectFunctionParam RPARENTH;
    printAddNodeFunction: PrintFunc<ast.AddNodeFunction> = ({node, path, print}) => [
        [node.variable ? [path.call(print, "variable"), this.space, this.eq, this.space] : ""],
        ["createNodeInstance"],
        this.block(
            this.builders.join(
                [this.comma, this.builders.hardline],
                [
                    path.call(print, "typeParam"),
                    path.call(print, "props")
                ]
            ), {
                openTag: "(", closeTag: ")"
            }
        )
    ]


    // assignmentExpression : identifier EQ expressionSet;
    printAssignmentExpression: PrintFunc<ast.AssignmentExpression> = ({path, print}) => [
        path.call(print, "variable"), this.space, this.eq, this.space, path.call(print, "expressionSet"),
    ]


    // conceptName : conceptType DIV conceptInstanceId;
    // conceptInstanceId : ESCAPED_SYMBOLIC_NAME;
    printConceptName: PrintFunc<ast.ConceptName> = ({node, path, print}) => [
        path.call(print, "conceptType"), this.div, node.instanceId
    ]

    // conceptType : identifier (DOT identifier)?;
    printConceptType: PrintFunc<ast.ConceptType> = ({path, print}) => [
        this.builders.join(this.dot, path.map(print, "identifiers"))
    ]

    // edgeExpression: vertexFrom edgeDirection vertexTo (LBRACKET labelPropertyList RBRACKET)? (REPEAT_KEYWORD repeatTime)? (AS_KEYWORD edgeName)?;
    // edgeDirection: RIGHT_ARROW | BOTH_ARROW;
    // repeatTime : LPARENTH lowerBound COMMA upperBound RPARENTH;
    // vertexFrom : vertexName;
    // vertexTo : vertexName;
    // edgeName : identifier;
    printEdgeExpression: PrintFunc<ast.EdgeExpression> = ({node, path, print}) => [
        this.builders.join(this.space, [
            path.call(print, "vertexFrom"),
            node.direction,
            path.call(print, "vertexTo"),
            ...(node.labelPropertyList ? ["[", path.call(print, "labelPropertyList"), "]"] : []),
            ...(node.repeatTime ? ["repeat", this.space, node.repeatTime] : []),
            ...(node.alias ? ["as", this.space, node.alias] : []),
        ])
    ]


    // edgePattern : (fullEdgePattern | abbreviatedEdgePattern) graphPatternQuantifier?;
    printEdgePattern: PrintFunc<ast.EdgePattern> = ({node}) => node.text

    // elementLookup : COLON ( labelExpression | linkedEdge )?;
    printElementLookup: PrintFunc<ast.ElementLookup> = ({node, path, print}) => [
        this.colon,
        path.call(print, "labelExpression"),
        node.linkedEdge,
    ]

    // elementPattern : nodePattern (elementPatternAddition)*;
    printElementPattern: PrintFunc<ast.ElementPattern> = ({path, print}) => [
        path.call(print, "nodePattern"),
        path.map(print, "additions"),
    ]

    // elementPatternAddition : edgePattern nodePattern;
    printElementPatternAddition: PrintFunc<ast.ElementPatternAddition> = ({path, print}) => [
        path.call(print, "edgePattern"),
        path.call(print, "nodePattern"),
    ]

    // elementPatternDeclarationAndFiller : elementVariableDeclaration? elementLookup? elementPatternWhereClause?;
    printElementPatternDeclarationAndFiller: PrintFunc<ast.ElementPatternDeclarationAndFiller> = ({path, print}) => [
        path.call(print, "variable"),
        path.call(print, "lookup"),
        path.call(print, "whereClause"),
    ]

    // elementPatternList : elementPattern (COMMA elementPattern)*;
    printElementPatternList: PrintFunc<ast.ElementPatternList> = ({path, print}) => [
        this.builders.join(this.comma, path.map(print, "elementPatterns"))
    ]

    // elementPatternWhereClause : WHERE_KEYWORD searchCondition;
    printElementPatternWhereClause: PrintFunc<ast.ElementPatternWhereClause> = ({node}) => [
        this.space, "where", this.space, node.condition
    ]

    // elementVariableDeclaration : elementVariable;
    printElementVariableDeclaration: PrintFunc<ast.ElementVariableDeclaration> = ({node}) => node.text

    // expressionSet : graphGroupOpExpress | listOpExpress | valueExpression;
    printExpressionSet: PrintFunc<ast.ExpressionSet> = ({node}) => node.text

    // labelExpression : labelName (VBAR labelName)*;
    printLabelExpression: PrintFunc<ast.LabelExpression> = ({path, print}) => [
        this.builders.join("|", path.map(print, "labelNames"))
    ]

    // labelName : (conceptName (PLUS conceptName)*) | conceptType;
    printLabelName: PrintFunc<ast.LabelName> = ({node, path, print}) => [
        ...(node.conceptType ? [path.call(print, "conceptType")] : []),
        ...(!node.conceptType ? [this.builders.join(this.plus, path.map(print, "conceptNames"))] : [])
    ]

    // labelNameList : labelName (COMMA labelName)*;
    printLabelNameList: PrintFunc<ast.LabelNameList> = ({path, print}) => [
        this.builders.join([this.comma, this.space], path.map(print, "labelNames"))
    ]

    // labelPropertyList : (labelNameList | propertyExpression) (COMMA propertyExpression)*;
    printLabelPropertyList: PrintFunc<ast.LabelPropertyList> = ({node, path, print}) => [
        this.builders.join([this.comma, this.space], [
            ...(node.labelNameList ? [path.call(print, "labelNameList")] : []),
            ...path.map(print, "propertyExpressions")
        ])
    ]

    // logicRuleExpression : identifier explain? COLON expressionSet;
    printLogicRuleExpression: PrintFunc<ast.LogicRuleExpression> = ({node, path, print}) => [
        path.call(print, "identifier"),
        node.explain,
        [this.colon, this.space],
        path.call(print, "expressionSet"),
    ]


    // nodeFunctionParam : identifier EQ identifier;
    printNodeFunctionParam: PrintFunc<ast.NodeFunctionParam> = ({path, print}) => [
        this.builders.join(this.space, [
            path.call(print, "left"),
            this.eq,
            path.call(print, "right"),
        ])
    ]

    // nodePattern : LPARENTH elementPatternDeclarationAndFiller RPARENTH;
    printNodePattern: PrintFunc<ast.NodePattern> = ({path, print}) => [
        "(", path.call(print, "declarationAndFiller"), ")"
    ]

    // complexObjExpr : LBRACE assignmentExpression* RBRACE;
    // complexObjExpression : LBRACE assignmentExpression* RBRACE;
    printObjectFunctionParam: PrintFunc<ast.ObjectFunctionParam> = ({node, path, print}) => [
        [path.call(print, "identifier"), this.space, this.eq, this.space],
        this.block(
            this.builders.join(this.builders.hardline, path.map(print, "expressions")), {
                openTag: "{", closeTag: "}", empty: node.expressions.length === 0
            }
        )
    ]

    // pathPattern : (pathCondition? pathVariable COLON )? pathPatternList;
    printPathPattern: PrintFunc<ast.PathPattern> = ({node, path, print}) => [
        this.builders.join(this.space, [
            ...(node.condition ? [node.condition] : []),
            ...(node.variable ? [path.call(print, "variable"), this.colon] : []),
            path.call(print, "elementPatterns"),
        ])
    ]

    // pathPatternList : pathPattern+;
    printPathPatternList: PrintFunc<ast.PathPatternList> = ({path, print}) => [
        this.builders.join(this.builders.hardline, path.map(print, "patterns"))
    ]

    // projectRuleExpression : identifier (DOT propertyName)? explain? EQ expressionSet;
    printProjectRuleExpression: PrintFunc<ast.ProjectRuleExpression> = ({node, path, print}) => [
        path.call(print, "identifier"),
        node.propertyName ? this.dot : '',
        path.call(print, "propertyName"),
        node.explain === '' ? '' : ['(', node.explain, ')'],
        [this.space, this.eq, this.space],
        path.call(print, "expressionSet"),
    ]

    printPropertyExpression: PrintFunc<ast.PropertyExpression> = ({node}) => [
        node.key, this.eq, node.value
    ]

    // typeFunctionParam : identifier EQ labelExpression;
    printTypeFunctionParam: PrintFunc<ast.TypeFunctionParam> = ({path, print}) => [
        this.builders.join(this.space, [
            path.call(print, "identifier"),
            this.eq,
            path.call(print, "labelExpression")
        ])
    ]

    printValueExpression: PrintFunc<ast.ValueExpression> = ({node}) => node.text

    // vertexExpression : vertexName (COMMA vertexName)* (LBRACKET labelPropertyList RBRACKET)?;
    // vertexName : identifier;
    printVertexExpression: PrintFunc<ast.VertexExpression> = ({node, path, print}) => [
        this.builders.join([this.comma, this.space], path.map(print, "vertexNames")),
        node.labelPropertyList ? ["[", path.call(print, "labelPropertyList"), "]"] : [],
    ]


}
