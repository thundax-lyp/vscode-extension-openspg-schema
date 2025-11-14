import * as ast from '../../ast';
import {BasePrinter, PrintFunc} from './base';
import {Doc} from "prettier";

export class PrinterDeclaration extends BasePrinter implements Record<`print${ast.DeclarationNodeType}`, PrintFunc<any>> {

    printNamespace: PrintFunc<ast.Namespace> = ({node}): Doc[] => [
        "namespace", this.space, node.value
    ]

    printEntity: PrintFunc<ast.Entity> = ({node, path, print}) => [
        path.call(print, 'declaration'),
        node.children.length > 0
            ? this.block(
                this.builders.join(this.builders.hardline, path.map(print, 'children'))
            )
            : []
    ]

    printEntityMeta: PrintFunc<ast.EntityMeta> = ({node, path, print}) => [
        path.call(print, 'declaration'),
        node.children.length > 0
            ? this.block(
                this.builders.join(this.builders.hardline, path.map(print, 'children'))
            )
            : []
    ]

    printProperty: PrintFunc<ast.Property> = ({node, path, print}) => [
        path.call(print, 'declaration'),
        node.children.length > 0
            ? this.block(
                this.builders.join(this.builders.hardline, path.map(print, 'children'))
            )
            : []
    ]

    printPropertyMeta: PrintFunc<ast.PropertyMeta> = ({node, path, print}) => [
        path.call(print, 'declaration'),
        node.children.length > 0
            ? this.block(
                this.builders.join(this.builders.hardline, path.map(print, 'children'))
            )
            : []
    ]

    printSubProperty: PrintFunc<ast.SubProperty> = ({node, path, print}) => [
        path.call(print, 'declaration'),
        node.children.length > 0
            ? this.block(
                this.builders.join(this.builders.hardline, path.map(print, 'children'))
            )
            : []
    ]

    printSubPropertyMeta: PrintFunc<ast.SubPropertyMeta> = ({path, print}) => [
        path.call(print, 'declaration')
    ]

}
