import {SyntaxNode, SyntaxNodeType} from "openspg-schema-antlr4";

export type PrintFunc<T extends SyntaxNode = SyntaxNode> = (node: T, path: SyntaxNodeType[]) => string | string[];

export type MixinPrinter = Record<string, PrintFunc<any>>;

export const format = (node: SyntaxNode, mixin: MixinPrinter): string => {

    const doFormat = (n: SyntaxNode, path: SyntaxNodeType[]) => {
        const printerName = `print${node.type}`;
        const printer = mixin[printerName];
        if (!printer) {
            throw new Error(`missing printer for node type "${node.type}"`);
        }

        const result = printer(n, [...path, n.type]);
        return typeof result === "string" ? result : result.join('');
    }

    return doFormat(node, [])
}
