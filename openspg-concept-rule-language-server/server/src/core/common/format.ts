import * as syntax from "openspg-concept-rule-antlr4";

export type PrintFunc<T extends syntax.SyntaxNode = syntax.SyntaxNode> = (
    node: T,
    path: syntax.SyntaxNodeType[]
) => string | string[];

export type MixinPrinter = Record<string, PrintFunc<any>>;

export const format = (node: syntax.SyntaxNode | null, mixin: MixinPrinter): string => {
    const formatInner = (n: syntax.SyntaxNode, path: syntax.SyntaxNodeType[]) => {
        const printerName = `print${n.type}`;
        const printer = mixin[printerName];
        if (!printer) {
            throw new Error(`missing printer for node type "${n.type}"`);
        }

        const result = printer(n, [...path, n.type]);
        return typeof result === "string" ? result : result.join("");
    };

    return node ? formatInner(node!, []) : "";
};
