import {Doc} from "prettier";
import * as ast from '../../ast';
import {BasePrinter, PrintFunc} from './base';

export class PrinterDeclaration extends BasePrinter implements Record<`print${ast.DeclarationNodeType}`, PrintFunc<any>> {

    printNamespaceDeclaration: PrintFunc<ast.NamespaceDeclaration> = ({path, print}): Doc[] => [
        "namespace", this.space, path.call(print, 'variable')
    ]

    printNamespaceVariable: PrintFunc<ast.NamespaceVariable> = ({node}) => node.text

    printEntityDeclaration: PrintFunc<ast.EntityDeclaration> = ({node, path, print}) => [
        path.call(print, 'declaration'),
        node.children.length > 0
            ? [
                this.block(
                    this.builders.join(this.builders.hardline, path.map(print, 'children'))
                )
            ]
            : []
    ]

    printEntityMetaDeclaration: PrintFunc<ast.EntityMetaDeclaration> = ({node, path, print}) => [
        path.call(print, 'declaration'),
        node.children.length > 0
            ? [
                this.block(
                    this.builders.join(this.builders.hardline, path.map(print, 'children'))
                )
            ]
            : []
    ]

    printPropertyDeclaration: PrintFunc<ast.PropertyDeclaration> = ({node, path, print}) => [
        path.call(print, 'declaration'),
        node.children.length > 0
            ? [
                this.block(
                    this.builders.join(this.builders.hardline, path.map(print, 'children'))
                )
            ]
            : []
    ]

    printPropertyMetaDeclaration: PrintFunc<ast.PropertyMetaDeclaration> = ({node, path, print}) => [
        path.call(print, 'declaration'),
        node.children.length > 0
            ? [
                this.block(
                    this.builders.join(this.builders.hardline, path.map(print, 'children'))
                )
            ]
            : []
    ]

    printSubPropertyDeclaration: PrintFunc<ast.SubPropertyDeclaration> = ({node, path, print}) => [
        path.call(print, 'declaration'),
        node.children.length > 0
            ? [
                this.block(
                    this.builders.join(this.builders.hardline, path.map(print, 'children'))
                )
            ]
            : []
    ]

    printSubPropertyMetaDeclaration: PrintFunc<ast.SubPropertyMetaDeclaration> = ({path, print}) => [
        path.call(print, 'declaration')
    ]

}
