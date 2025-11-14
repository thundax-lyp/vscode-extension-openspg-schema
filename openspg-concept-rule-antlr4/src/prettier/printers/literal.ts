import * as ast from '../../ast';
import {BasePrinter, PrintFunc} from './base';

export class PrinterLiteral extends BasePrinter implements Record<`print${ast.LiteralNodeType}`, PrintFunc<any>> {

    printIdentifier: PrintFunc<ast.Identifier> = ({node}) => [node.text]

}
