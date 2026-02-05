import * as vscode from 'vscode';
import * as assert from 'assert';
import { activate, createTicker, getDocUri, toRange } from './helper';

suite('Document Symbols', () => {
    const fileName = 'document-symbol.concept.rule';
    const docUri = getDocUri(fileName);

    const { fireTick, waitingForTick } = createTicker();

    test(`Open [${fileName}]`, async () => {
        await activate(docUri);
        fireTick();
    });

    test('Find Symbols', async () => {
        await waitingForTick();
        await testDocumentSymbol(docUri, [
            toSymbol('DocumentSymbol', vscode.SymbolKind.Namespace, toRange(0, 0, 0, 24)),
            toSymbol('`TaxOfRiskApp`/`赌博应用`', vscode.SymbolKind.Class, toRange(2, 0, 11, 6), [
                toSymbol(
                    '(s:App)-[p:belongTo]->(o:`TaxOfRiskApp`/`赌博应用`)',
                    vscode.SymbolKind.Struct,
                    toRange(4, 8, 10, 9),
                    [
                        toSymbol('Structure', vscode.SymbolKind.Function, toRange(5, 12, 5, 24)),
                        toSymbol('Rule', vscode.SymbolKind.Function, toRange(7, 12, 7, 19)),
                        toSymbol('Action', vscode.SymbolKind.Function, toRange(9, 12, 9, 21))
                    ]
                )
            ]),
            toSymbol('`TaxOfRiskUser`/`赌博App开发者`', vscode.SymbolKind.Class, toRange(13, 0, 20, 6), [
                toSymbol(
                    '(s:Person)-[p:belongTo]->(o:`TaxOfRiskUser`/`赌博App开发者`)',
                    vscode.SymbolKind.Struct,
                    toRange(15, 8, 19, 9),
                    [
                        toSymbol('GraphStructure', vscode.SymbolKind.Function, toRange(16, 12, 16, 29)),
                        toSymbol('Constraint', vscode.SymbolKind.Function, toRange(18, 12, 18, 25))
                    ]
                )
            ]),
            toSymbol('`TaxOfRiskUser`/`赌博App老板`', vscode.SymbolKind.Class, toRange(22, 0, 29, 6), [
                toSymbol(
                    '(s:Person)-[p:belongTo]->(o:`TaxOfRiskUser`/`赌博App老板`)',
                    vscode.SymbolKind.Struct,
                    toRange(24, 8, 28, 9),
                    [
                        toSymbol('Structure', vscode.SymbolKind.Function, toRange(25, 12, 25, 24)),
                        toSymbol('Action', vscode.SymbolKind.Function, toRange(27, 12, 27, 21))
                    ]
                )
            ]),
            toSymbol(
                '(s:Person)-[p:belongTo]->(o:`TaxOfRiskUser`/`赌博App老板`)',
                vscode.SymbolKind.Struct,
                toRange(31, 0, 35, 1),
                [
                    toSymbol('Structure', vscode.SymbolKind.Function, toRange(32, 4, 32, 16)),
                    toSymbol('Action', vscode.SymbolKind.Function, toRange(34, 4, 34, 13))
                ]
            )
        ]);
    });
});

const toSymbol = (
    name: string,
    kind: vscode.SymbolKind,
    range: vscode.Range,
    children: vscode.DocumentSymbol[] = []
): vscode.DocumentSymbol => ({
    name,
    kind,
    range,
    selectionRange: range,
    detail: '',
    children: children
});

const renderItem = (item: vscode.DocumentSymbol, indent = '') => {
    const { name, kind, range, children = [] } = item;
    const kindNames = Object.keys(vscode.SymbolKind).filter((x) => !/[0-9]+/g.test(x));
    const text =
        indent +
        JSON.stringify({
            name,
            kind: kindNames[kind],
            range: `${range.start.line}:${range.start.character}-${range.end.line}:${range.end.character}`
        });
    if (children.length > 0) {
        return text + '\n' + render(children, indent + ' '.repeat(4));
    }
    return text;
};

const render = (items: vscode.DocumentSymbol[], indent = ''): string =>
    (items || []).map((x) => renderItem(x, indent)).join('\n');

async function testDocumentSymbol(docUri: vscode.Uri, expectedSymbols: vscode.DocumentSymbol[]) {
    const actualSymbols = await vscode.commands.executeCommand<vscode.DocumentSymbol[]>(
        'vscode.executeDocumentSymbolProvider',
        docUri
    );
    assert.equal(render(actualSymbols), render(expectedSymbols));
}
