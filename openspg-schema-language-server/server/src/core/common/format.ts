import { SyntaxNode, SyntaxNodeType } from 'openspg-schema-antlr4';

export type PrintFunc<T extends SyntaxNode = SyntaxNode> = (node: T, path: SyntaxNodeType[]) => string | string[];

export type MixinPrinter = Record<string, PrintFunc<any>>;

export const format = (node: SyntaxNode | null, mixin: MixinPrinter): string => {
    const formatInner = (n: SyntaxNode, path: SyntaxNodeType[]) => {
        const printerName = `print${n.type}`;
        const printer = mixin[printerName];
        if (!printer) {
            throw new Error(`missing printer for node type "${n.type}"`);
        }

        const result = printer(n, [...path, n.type]);
        return typeof result === 'string' ? result : result.join('');
    };

    return node ? formatInner(node!, []) : '';
};
