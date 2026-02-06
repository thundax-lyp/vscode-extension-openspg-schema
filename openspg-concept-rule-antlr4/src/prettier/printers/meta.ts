import * as ast from "../../ast";
import { BasePrinter, PrintFunc } from "./base";

export class PrinterMeta extends BasePrinter implements Record<`print${ast.MetaNodeType}`, PrintFunc<any>> {
    printSourceUnit: PrintFunc<ast.SourceUnit> = ({ path, print }) => {
        return [
            this.builders.join([this.builders.hardline, this.builders.line], path.map(print, "nodes")),
            this.builders.hardline
        ];
    };
}
