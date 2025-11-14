import * as ast from '../../ast';
import {BasePrinter, PrintFunc} from './base';
import {Doc} from "prettier";

export class PrinterDeclaration extends BasePrinter implements Record<`print${ast.DeclarationNodeType}`, PrintFunc<any>> {

    // addEdge : ADD_EDGE_KEYWORD LPARENTH addEdgeParam COMMA addEdgeParam COMMA addType COMMA addProps RPARENTH;
    printAddEdge: PrintFunc<ast.AddEdge> = ({path, print}) => {
        return [
            "createEdgeInstance",
            this.block(
                this.builders.join(
                    [this.comma, this.builders.hardline],
                    [
                        path.call(print, "sourceEdgeParam"),
                        path.call(print, "targetEdgeParam"),
                        path.call(print, "addType"),
                        path.call(print, "addProps")
                    ]
                ), {
                    openTag: '(', closeTag: ')'
                }
            )
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
            "createNodeInstance",
            this.block([
                path.call(print, "addType"),
                this.comma, this.builders.hardline,
                path.call(print, "addProps")
            ], {
                openTag: '(', closeTag: ')'
            })
        ]
    }

    // addProps : identifier EQ complexObjExpr;
    // complexObjExpr : LBRACE assignmentExpression* RBRACE;
    printAddProps: PrintFunc<ast.AddProps> = ({path, print}) => [
        this.builders.join(this.space, [
            path.call(print, "identifier"),
            this.eq,
            this.block(
                this.builders.join(this.builders.hardline, path.map(print, "assignmentExpressions")), {
                    openTag: '{', closeTag: '}'
                }
            )
        ])
    ]

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
    printGraphStructure: PrintFunc<ast.GraphStructure> = (): Doc[] => {
        throw new Error("Unreachable Code")
    }

    // graphStructureList : graphStructure+;
    printGraphStructureList: PrintFunc<ast.GraphStructureList> = ({path, print}) => this.builders.join(
        this.builders.hardline, path.map(print, "graphStructures")
    )

    // namespace: NAMESPACE_KEYWORD namespaceValue;
    printNamespace: PrintFunc<ast.Namespace> = ({path, print}) =>
        ["namespace", this.space, path.call(print, 'value')]

    // namespaceValue: UNESCAPED_SYMBOLIC_NAME | STRING_LITERAL | ESCAPED_SYMBOLIC_NAME;
    printNamespaceValue: PrintFunc<ast.NamespaceValue> = ({node}) => node.text

    // ruleWrapper : ruleWrapperHead (ruleWrapperBody)?;
    printRuleWrapper: PrintFunc<ast.RuleWrapper> = ({node, path, print}) => [
        path.call(print, 'head'),
        node.body ? this.block([path.call(print, 'body')]) : []
    ]

    // ruleWrapperHead : ruleWrapperPattern;
    printRuleWrapperHead: PrintFunc<ast.RuleWrapperHead> = () => {
        throw new Error("Unreachable Code")
    }

    // ruleWrapperPattern :  labelExpression (COLON labelExpression)+ | labelExpression COLON;
    printRuleWrapperPattern: PrintFunc<ast.RuleWrapperPattern> = ({node, path, print}) => {
        return [
            this.builders.join(this.colon, path.map(print, 'labelExpressions')),
            node.labelExpressions.length === 1 ? this.colon : [],
        ]
    }

    // ruleWrapperBody : WRAPPER_RULE_KEYWORD COLON OPEN_RULE_BLOCK theDefineStructure* CLOSE_RULE_BLOCK;
    printRuleWrapperBody: PrintFunc<ast.RuleWrapperBody> = ({path, print}) => {
        return [
            ["rule", this.colon, this.space],
            this.block(
                this.builders.join(
                    [this.builders.hardline, this.builders.hardline],
                    path.map(print, "theDefineStructures")
                ), {
                    openTag: '[[', closeTag: ']]'
                }
            ),
        ]
    }

    printTheAction: PrintFunc<ast.TheAction> = ({path, print}) => [
        ["Action", this.space],
        this.block(
            this.builders.join([this.builders.hardline], path.map(print, "nodes")), {
                openTag: '{', closeTag: '}'
            }
        )
    ]

    // theDefineStructure : DEFINE_KEYWORD predicatedDefine LBRACE baseRuleDefine RBRACE;
    printTheDefineStructure: PrintFunc<ast.TheDefineStructure> = ({path, print}) => [
        ["Define", this.space, path.call(print, 'predicatedDefine'), this.space],
        this.block(path.call(print, 'baseRuleDefine'), {
            openTag: '{', closeTag: '}'
        })
    ]

    // predicatedDefine : nodePattern fullEdgePointingRight nodePattern;
    printPredicatedDefine: PrintFunc<ast.PredicatedDefine> = ({node}) => node.text

    // baseRuleDefine : theGraphStructure theRule? theAction?;
    printBaseRuleDefine: PrintFunc<ast.BaseRuleDefine> = ({node, path, print}) => [
        this.builders.join([this.builders.hardline, this.builders.hardline], [
            path.call(print, "theGraphStructure"),
            ...(node.theRule ? [path.call(print, "theRule")] : []),
            ...(node.theAction ? [path.call(print, "theAction")] : []),
        ])
    ]


    // theGraphStructure : graphStructureHead LBRACE graphStructureDefine? RBRACE;
    printTheGraphStructure: PrintFunc<ast.TheGraphStructure> = ({node, path, print}) => {
        return [
            [path.call(print, "head"), this.space],
            this.block(node.body ? [path.call(print, "body")] : [], {
                openTag: '{', closeTag: '}'
            }),
        ]
    }

    // theGraphStructureHead : GRAPH_STRUCTURE_KEYWORD | STRUCTURE_KEYWORD;
    printTheGraphStructureHead: PrintFunc<ast.TheGraphStructureHead> = ({node}) => node.text

    // theGraphStructureBody : graphStructureList | pathPatternList;
    printTheGraphStructureBody: PrintFunc<ast.TheGraphStructureBody> = () => {
        throw new Error("Unreachable Code")
    }

    // theRule : theRuleHead LBRACE theRuleBody RBRACE;
    printTheRule: PrintFunc<ast.TheRule> = ({path, print}) => {
        return [
            [path.call(print, 'head'), this.space],
            this.block(
                path.call(print, "body"), {
                    openTag: '{', closeTag: '}'
                }
            ),
        ]
    }

    printTheRuleHead: PrintFunc<ast.TheRuleHead> = ({node}) => node.text

    printTheRuleBody: PrintFunc<ast.TheRuleBody> = ({path, print}) => [
        this.builders.join(this.builders.hardline, path.map(print, "expressions"))
    ]

}
