import * as ast from '../../ast';
import {BasePrinter, PrintFunc} from './base';
import {Doc} from "prettier";

export class PrinterExpression extends BasePrinter implements Record<`print${ast.ExpressionNodeType}`, PrintFunc<any>> {

    // assignmentExpression : identifier EQ expressionSet;
    printAssignmentExpression: PrintFunc<ast.AssignmentExpression> = ({path, print}) => {
        return [
            path.call(print, "identifier"), this.space, this.eq, this.space, path.call(print, "expressionSet"),
        ]
    };

    // conceptName : conceptType DIV conceptInstanceId;
    // conceptInstanceId : ESCAPED_SYMBOLIC_NAME;
    printConceptName: PrintFunc<ast.ConceptName> = ({node, path, print}) => {
        return [path.call(print, "conceptType"), this.div, node.instanceId]
    };

    // conceptType : identifier (DOT identifier)?;
    printConceptType: PrintFunc<ast.ConceptType> = ({path, print}) => {
        return this.builders.join(this.dot, path.map(print, "identifiers"))
    };

    // edgePattern : (fullEdgePattern | abbreviatedEdgePattern) graphPatternQuantifier?;
    printEdgePattern: PrintFunc<ast.EdgePattern> = ({node}) => {
        return [node.text]
    };

    // elementLookup : COLON ( labelExpression | linkedEdge )?;
    printElementLookup: PrintFunc<ast.ElementLookup> = ({node, path, print}) => {
        return [
            this.colon,
            path.call(print, "labelExpression"),
            node.linkedEdge,
        ]
    };

    // elementPattern : nodePattern (elementPatternAddition)*;
    printElementPattern: PrintFunc<ast.ElementPattern> = ({path, print}) => {
        return [
            path.call(print, "nodePattern"),
            path.map(print, "additions"),
        ]
    };

    // elementPatternAddition : edgePattern nodePattern;
    printElementPatternAddition: PrintFunc<ast.ElementPatternAddition> = ({path, print}) => {
        return [
            path.call(print, "edgePattern"),
            path.call(print, "nodePattern"),
        ]
    };

    // elementPatternList : elementPattern (COMMA elementPattern)*;
    printElementPatternList: PrintFunc<ast.ElementPatternList> = ({path, print}) => {
        return this.builders.join(this.comma, path.map(print, "elementPatterns"))
    };

    // elementPatternDeclarationAndFiller : elementVariableDeclaration? elementLookup? elementPatternWhereClause?;
    printElementPatternDeclarationAndFiller: PrintFunc<ast.ElementPatternDeclarationAndFiller> = ({node, path, print}) => {
        return [
            path.call(print, "variable"),
            path.call(print, "lookup"),
            path.call(print, "whereClause"),
        ]
    };

    // elementPatternWhereClause : WHERE_KEYWORD searchCondition;
    printElementPatternWhereClause: PrintFunc<ast.ElementPatternWhereClause> = ({node}) => {
        return [this.space, "where", this.space, node.condition]
    };

    // elementVariableDeclaration : elementVariable;
    printElementVariableDeclaration: PrintFunc<ast.ElementVariableDeclaration> = ({node}) => {
        return node.text
    };

    // expressionSet : graphGroupOpExpress | listOpExpress | valueExpression;
    printExpressionSet: PrintFunc<ast.ExpressionSet> = ({node}) => {
        return node.text
    };

    // labelExpression : labelName (VBAR labelName)*;
    printLabelExpression: PrintFunc<ast.LabelExpression> = ({path, print}) => {
        return this.builders.join("|", path.map(print, "labelNames"))
    }

    // labelName : (conceptName (PLUS conceptName)*) | conceptType;
    printLabelName: PrintFunc<ast.LabelName> = ({node, path, print}) => {
        if (node.conceptType) {
            return [path.call(print, "conceptType")]
        }
        return this.builders.join(this.plus, path.map(print, "conceptNames"))
    };

    // logicRuleExpression : identifier explain? COLON expressionSet;
    printLogicRuleExpression: PrintFunc<ast.LogicRuleExpression> = ({node, path, print}) => {
        return [
            path.call(print, "identifier"),
            node.explain === '' ? '' : ['(', node.explain, ')'],
            [this.colon, this.space],
            path.call(print, "expressionSet"),
        ]
    };

    // nodePattern : LPARENTH elementPatternDeclarationAndFiller RPARENTH;
    printNodePattern: PrintFunc<ast.NodePattern> = ({path, print}) => {
        return ["(", path.call(print, "declarationAndFiller"), ")"]
    };


    // pathPattern : (pathCondition? pathVariable COLON )? pathPatternList;
    printPathPattern: PrintFunc<ast.PathPattern> = ({node, path, print}) => {
        const parts: Doc[] = []
        if (node.condition) {
            parts.push([node.condition])
        }
        if (node.variable) {
            parts.push([path.call(print, "variable"), this.colon])
        }
        parts.push(path.call(print, "elementPatterns"))
        return this.builders.join(this.space, parts)
    };

    // pathPatternList : pathPattern+;
    printPathPatternList: PrintFunc<ast.PathPatternList> = ({path, print}) => {
        return this.builders.join(this.builders.hardline, path.map(print, "patterns"))
    };

    // projectRuleExpression : identifier (DOT propertyName)? explain? EQ expressionSet;
    printProjectRuleExpression: PrintFunc<ast.ProjectRuleExpression> = ({node, path, print}) => {
        return [
            path.call(print, "identifier"),
            node.propertyName ? this.dot : '',
            path.call(print, "propertyName"),
            node.explain === '' ? '' : ['(', node.explain, ')'],
            [this.space, this.eq, this.space],
            path.call(print, "expressionSet"),
        ]
    };

    // labelPropertyList : (labelNameList | propertyExpression) (COMMA propertyExpression)*;
    printLabelPropertyList: PrintFunc<ast.LabelPropertyList> = ({node, path, print}) => {
        const parts: Doc[] = []
        if (node.labelNameList) {
            parts.push(path.call(print, "labelNameList"))
        }
        parts.push(...path.map(print, "propertyExpressions"))
        return this.builders.join([this.comma, this.space], parts)
    };

    // labelNameList : labelName (COMMA labelName)*;
    printLabelNameList: PrintFunc<ast.LabelNameList> = ({path, print}) => {
        return this.builders.join([this.comma, this.space], path.map(print, "labelNames"))
    };

    printPropertyExpression: PrintFunc<ast.PropertyExpression> = ({node}) => {
        return [node.key, "=", node.value]
    };

    // ruleExpression : projectRuleExpression | logicRuleExpression | expressionSet;
    printRuleExpression: PrintFunc<ast.RuleExpression> = () => {
        throw new Error("Unreachable Code")
    };

    printValueExpression: PrintFunc<ast.ValueExpression> = ({node, path, print}) => {
        return ["printValueExpression", this.builders.hardline]
    };

}
