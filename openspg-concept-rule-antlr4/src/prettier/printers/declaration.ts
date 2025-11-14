import * as ast from '../../ast';
import {BasePrinter, PrintFunc} from './base';
import {Doc} from "prettier";

export class PrinterDeclaration extends BasePrinter implements Record<`print${ast.DeclarationNodeType}`, PrintFunc<any>> {

    // addEdge : ADD_EDGE_KEYWORD LPARENTH addEdgeParam COMMA addEdgeParam COMMA addType COMMA addProps RPARENTH;
    printAddEdge: PrintFunc<ast.AddEdge> = ({path, print}) => {
        return [
            "createEdgeInstance", "(",
            this.block(
                this.builders.join(
                    [this.comma, this.builders.hardline],
                    [
                        path.call(print, "sourceEdgeParam"),
                        path.call(print, "targetEdgeParam"),
                        path.call(print, "addType"),
                        path.call(print, "addProps")
                    ]
                )
            ),
            ")"
        ]
    }

    // addEdgeParam : identifier EQ identifier;
    printAddEdgeParam: PrintFunc<ast.AddEdgeParam> = ({path, print}) => {
        return [path.call(print, "left"), this.space, this.eq, this.space, path.call(print, "right")]
    }

    // addNode : (identifier EQ)? ADD_NODE_KEYWORD LPARENTH addType COMMA addProps RPARENTH;
    printAddNode: PrintFunc<ast.AddNode> = ({node, path, print}) => {
        return [
            node.identifier ? [path.call(print, "identifier"), this.space, this.eq, this.space] : "",
            "createNodeInstance", "(",
            this.block([
                path.call(print, "addType"),
                this.comma, this.builders.hardline,
                path.call(print, "addProps")
            ]),
            ")"
        ]
    }

    // addProps : identifier EQ complexObjExpr;
    // complexObjExpr : LBRACE assignmentExpression* RBRACE;
    printAddProps: PrintFunc<ast.AddProps> = ({node, path, print}) => {
        return [
            path.call(print, "identifier"),
            this.space, this.eq, this.space, "{",
            node.assignmentExpressions.length > 0
                ? this.block(this.builders.join(this.builders.hardline, path.map(print, "assignmentExpressions")))
                : this.builders.hardline,
            "}"
        ]
    }

    // addType : identifier EQ labelExpression;
    printAddType: PrintFunc<ast.AddType> = ({path, print}) => {
        return [
            path.call(print, "identifier"), this.space, this.eq, this.space, path.call(print, "labelExpression")
        ]
    }

    // defineEdge: vertexFrom edgeDirection vertexTo (LBRACKET labelPropertyList RBRACKET)? (REPEAT_KEYWORD repeatTime)? (AS_KEYWORD edgeName)?;
    printDefineEdge: PrintFunc<ast.DefineEdge> = ({node, path, print}) => {
        const parts: Doc[] = []
        parts.push([
            path.call(print, "vertexFrom"),
            node.direction,
            path.call(print, "vertexTo")
        ])

        if (node.labelPropertyList) {
            parts.push(["[", path.call(print, "labelPropertyList"), "]"])
        }

        if (node.repeatTime) {
            parts.push(["repeat", this.space, node.repeatTime])
        }

        if (node.alias) {
            parts.push(["as", this.space, node.alias])
        }
        return this.builders.join(this.space, parts)
    }

    // defineVertex : vertexName (COMMA vertexName)* (LBRACKET labelPropertyList RBRACKET)?;
    printDefineVertex: PrintFunc<ast.DefineVertex> = ({node, path, print}) => {
        const parts = [
            this.builders.join([this.comma, this.space], path.map(print, "vertexNames"))
        ]

        if (node.labelPropertyList) {
            parts.push(["[", path.call(print, "labelPropertyList"), "]"])
        }
        return this.builders.join(this.space, parts)
    }

    // graphStructure : defineEdge | defineVertex;
    printGraphStructure: PrintFunc<ast.GraphStructure> = ({node, path, print}): Doc[] => {
        throw new Error("Unreachable Code")
    }

    // graphStructureList : graphStructure+;
    printGraphStructureList: PrintFunc<ast.GraphStructureList> = ({path, print}) => {
        return this.builders.join(this.builders.hardline, path.map(print, "graphStructures"))
    }

    printNamespace: PrintFunc<ast.Namespace> = ({node}) => {
        return ["namespace", this.space, node.value]
    }

    // ruleWrapper : ruleWrapperHead (ruleWrapperBody)?;
    printRuleWrapper: PrintFunc<ast.RuleWrapper> = ({node, path, print}) => {
        const parts: Doc[] = [path.call(print, 'head')]
        if (node.body) {
            parts.push(
                this.block([
                    path.call(print, 'body'),
                ])
            )
        }
        return parts;
    }

    printRuleWrapperHead: PrintFunc<ast.RuleWrapperHead> = ({node, path, print}) => {
        return [
            this.builders.join(this.colon, path.map(print, "labelExpressions")),
            node.labelExpressions.length === 1 ? this.colon : '',
        ]
    }

    // ruleWrapperBody : WRAPPER_RULE_KEYWORD COLON OPEN_RULE_BLOCK theDefineStructure* CLOSE_RULE_BLOCK;
    printRuleWrapperBody: PrintFunc<ast.RuleWrapperBody> = ({path, print}) => {
        return [
            ["rule", this.colon, this.space, "[["],
            this.block(
                this.builders.join(
                    [this.builders.hardline, this.builders.hardline],
                    path.map(print, "theDefineStructures")
                )
            ),
            ["]]"],
        ]
    }

    printTheAction: PrintFunc<ast.TheAction> = ({path, print}) => {
        return [
            ["Action", this.space, "{"],
            this.block(
                this.builders.join(
                    [this.builders.hardline],
                    path.map(print, "nodes")
                )
            ),
            ["}"]
        ]
    }

    // theDefineStructure : DEFINE_KEYWORD predicatedDefine LBRACE baseRuleDefine RBRACE;
    // baseRuleDefine : theGraphStructure theRule? theAction?;
    printTheDefineStructure: PrintFunc<ast.TheDefineStructure> = ({node, path, print}) => {
        const parts: Doc[] = [
            path.call(print, "theGraphStructure"),
        ]
        if (node.theRule) {
            parts.push(path.call(print, "theRule"))
        }
        if (node.theAction) {
            parts.push(path.call(print, "theAction"))
        }
        return [
            ["Define", this.space, node.predicatedDefine, this.space, "{"],
            this.block(
                this.builders.join([this.builders.hardline, this.builders.hardline], parts)
            ),
            "}"
        ]
    }

    // theGraphStructure : graphStructureHead LBRACE graphStructureDefine? RBRACE;
    printTheGraphStructure: PrintFunc<ast.TheGraphStructure> = ({node, path, print}) => {
        return [
            [path.call(print, "head"), this.space, "{"],
            node.body ? this.block([path.call(print, "body")]) : this.builders.hardline,
            ["}"]
        ]
    }

    // theGraphStructureBody : graphStructureList | pathPatternList;
    printTheGraphStructureBody: PrintFunc<ast.TheGraphStructureBody> = () => {
        throw new Error("Unreachable Code")
    }

    printTheGraphStructureHead: PrintFunc<ast.TheGraphStructureHead> = ({node}) => {
        return node.text
    }

    printTheRule: PrintFunc<ast.TheRule> = ({node, path, print}) => {
        return [
            [node.head, this.space, "{"],
            this.block(
                this.builders.join(this.builders.hardline, path.map(print, "expressions"))
            ),
            ["}"]
        ]
    }

}
