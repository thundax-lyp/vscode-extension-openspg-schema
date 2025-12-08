import {Doc} from "prettier";
import * as ast from '../../ast';
import {BasePrinter, PrintFunc} from './base';

export class PrinterDeclaration extends BasePrinter implements Record<`print${ast.DeclarationNodeType}`, PrintFunc<any>> {

    // namespaceDeclaration: NAMESPACE_KEYWORD namespaceVariable ;
    printNamespaceDeclaration: PrintFunc<ast.NamespaceDeclaration> = ({path, print}): Doc[] => [
        "namespace", this.space, path.call(print, 'variable')
    ]

    // namespaceVariable: UNESCAPED_SYMBOLIC_NAME | STRING_LITERAL | ESCAPED_SYMBOLIC_NAME ;
    printNamespaceVariable: PrintFunc<ast.NamespaceVariable> = ({node}) => node.text

    // ruleWrapperDeclaration : ruleWrapperHead ruleWrapperBody ;
    // ruleWrapperHead : labelExpression (COLON labelExpression)+ | labelExpression COLON ;
    // ruleWrapperBody : ruleWrapperRuleDeclaration* ;
    printRuleWrapperDeclaration: PrintFunc<ast.RuleWrapperDeclaration> = ({path, print}) => [
        path.call(print, 'head'),
        this.block([
            this.builders.join(
                [this.builders.hardline, this.builders.hardline],
                path.map(print, "rules")
            )
        ])
    ]

    // ruleWrapperHead : labelExpression (COLON labelExpression)+ | labelExpression COLON ;
    printRuleWrapperHead: PrintFunc<ast.RuleWrapperHead> = ({node, path, print}) => [
        this.builders.join(this.colon, path.map(print, 'labelExpressions')),
        node.labelExpressions.length === 1 ? this.colon : [],
    ]

    printRuleWrapperRuleDeclaration: PrintFunc<ast.RuleWrapperRuleDeclaration> = ({node, path, print}) => [
        [path.call(print, 'head'), this.colon, this.space],
        this.block(
            this.builders.join(
                [this.builders.hardline, this.builders.hardline],
                path.map(print, "conceptRules")
            ), {
                empty: node.conceptRules.length === 0,
                openTag: "[[",
                closeTag: "]]"
            }
        )
    ]

    printRuleWrapperRuleHead: PrintFunc<ast.RuleWrapperRuleHead> = ({node}) => node.text;

    // conceptRuleDeclaration : conceptRuleHead LBRACE conceptRuleBody RBRACE ;
    // conceptRuleBody : theGraphStructureDeclaration theRuleDeclaration? theActionDeclaration? ;
    printConceptRuleDeclaration: PrintFunc<ast.ConceptRuleDeclaration> = ({node, path, print}) => [
        [path.call(print, 'head'), this.space],
        this.block([
            this.builders.join([this.builders.hardline, this.builders.hardline], [
                path.call(print, 'theGraph'),
                ...(node.theRule ? [path.call(print, "theRule")] : []),
                ...(node.theAction ? [path.call(print, "theAction")] : []),
            ])
        ], {
            openTag: "{", closeTag: "}"
        })
    ]

    // conceptRuleHead : DEFINE_KEYWORD nodePattern fullEdgePointingRight nodePattern ;
    printConceptRuleHead: PrintFunc<ast.ConceptRuleHead> = ({node, path, print}) => [
        ["Define", this.space], path.call(print, 'left'), node.operator, path.call(print, 'right'),
    ]

    // theActionDeclaration : theActionHead LBRACE theActionBody RBRACE ;
    // theActionHead : ACTION_KEYWORD ;
    // theActionBody : theActionExpression* ;
    // theActionExpression: addNodeFunction | addEdgeFunction ;
    printTheActionDeclaration: PrintFunc<ast.TheActionDeclaration> = ({node, path, print}) => [
        [path.call(print, 'head'), this.space],
        this.block(
            this.builders.join([this.builders.hardline], path.map(print, "expressions")), {
                openTag: "{", closeTag: "}", empty: node.expressions.length === 0,
            }
        )
    ]

    // theActionHead : ACTION_KEYWORD ;
    printTheActionHead: PrintFunc<ast.TheActionHead> = ({node}) => node.text;

    // theGraphStructureDeclaration : theGraphStructureHead LBRACE theGraphStructureBody? RBRACE ;
    // theGraphStructureHead: GRAPH_STRUCTURE_KEYWORD | STRUCTURE_KEYWORD ;
    // theGraphStructureBody : graphStructureList | pathPatternList ;
    printTheGraphStructureDeclaration: PrintFunc<ast.TheGraphStructureDeclaration> = ({node, path, print}) => [
        [path.call(print, "head"), this.space],
        this.block([
            this.builders.join(this.builders.hardline, path.map(print, "graphStructures")),
            this.builders.join(this.builders.hardline, path.map(print, "pathPatterns")),
        ], {
            openTag: "{", closeTag: "}", empty: node.graphStructures.length === 0 && node.pathPatterns.length === 0
        })
    ]

    printTheGraphStructureHead: PrintFunc<ast.TheActionHead> = ({node}) => node.text;


    // theRuleDeclaration : theRuleHead LBRACE theRuleBody RBRACE;
    // theRuleHead : CONSTRAINT_KEYWORD | RULE_KEYWORD;
    // theRuleBody : theRuleExpression*;
    printTheRuleDeclaration: PrintFunc<ast.TheRuleDeclaration> = ({node, path, print}) => [
        [path.call(print, 'head'), this.space],
        this.block(
            this.builders.join(this.builders.hardline, path.map(print, "expressions")), {
                openTag: "{", closeTag: "}", empty: node.expressions.length === 0
            }
        )
    ]

    printTheRuleHead: PrintFunc<ast.TheRuleHead> = ({node}) => node.text

}
