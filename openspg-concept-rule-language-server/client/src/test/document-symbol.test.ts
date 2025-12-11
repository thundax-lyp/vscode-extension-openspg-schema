import * as vscode from 'vscode';
import * as assert from 'assert';
import {DocumentSymbol, SymbolKind} from 'vscode';
import {activate, createTicker, getDocUri, toRange} from './helper';

suite('Document Symbols', () => {
    const fileName = 'document-symbol.concept.rule';
    const docUri = getDocUri(fileName);

    const {fireTick, waitingForTick} = createTicker()

    test(`Open [${fileName}]`, async () => {
        await activate(docUri);
        fireTick()
    });

    test('Find Symbols', async () => {
        await waitingForTick()
        await testDocumentSymbol(docUri, [
            toSymbol('DocumentSymbol', SymbolKind.Namespace, toRange(0, 0, 0, 24)),
            toSymbol('`TaxOfRiskApp`/`赌博应用`:', SymbolKind.Class, toRange(2, 0, 13, 6), [
                toSymbol('Define (s:App)-[p:belongTo]->(o:`TaxOfRiskApp`/`赌博应用`)', SymbolKind.Struct, toRange(4, 8, 12, 9), [
                    toSymbol('Structure', SymbolKind.Function, toRange(5, 12, 6, 13)),
                    toSymbol('Rule', SymbolKind.Function, toRange(7, 12, 9, 13)),
                    toSymbol('Action', SymbolKind.Function, toRange(10, 12, 11, 13)),
                ]),
            ]),
            toSymbol('`TaxOfRiskUser`/`赌博App开发者`:', SymbolKind.Class, toRange(15, 0, 24, 6), [
                toSymbol('Define (s:Person)-[p:belongTo]->(o:`TaxOfRiskUser`/`赌博App开发者`)', SymbolKind.Struct, toRange(17, 8, 23, 9), [
                    toSymbol('GraphStructure', SymbolKind.Function, toRange(18, 12, 19, 13)),
                    toSymbol('Constraint', SymbolKind.Function, toRange(20, 12, 22, 13)),
                ]),
            ]),
            toSymbol('`TaxOfRiskUser`/`赌博App老板`:', SymbolKind.Class, toRange(26, 0, 34, 6), [
                toSymbol('Define (s:Person)-[p:belongTo]->(o:`TaxOfRiskUser`/`赌博App老板`)', SymbolKind.Struct, toRange(28, 8, 33, 9), [
                    toSymbol('Structure', SymbolKind.Function, toRange(29, 12, 30, 13)),
                    toSymbol('Action', SymbolKind.Function, toRange(31, 12, 32, 13)),
                ]),
            ]),
        ]);
    });
});

const toSymbol = (name: string, kind: vscode.SymbolKind, range: vscode.Range, children: vscode.DocumentSymbol[] = []): vscode.DocumentSymbol => ({
    name, kind, range, selectionRange: range, detail: '', children: children,
})

async function testDocumentSymbol(docUri: vscode.Uri, expectedSymbols: vscode.DocumentSymbol[]) {
    const actualSymbols = await vscode.commands.executeCommand<DocumentSymbol[]>('vscode.executeDocumentSymbolProvider', docUri);

    checkSymbols(actualSymbols, expectedSymbols)
}

const checkSymbols = (actualSymbols: vscode.DocumentSymbol[], expectedSymbols: vscode.DocumentSymbol[]) => {
    assert.equal(actualSymbols.length, expectedSymbols.length);
    expectedSymbols.forEach((expectedSymbol, i) => {
        const actualSymbol = actualSymbols[i];
        checkSymbol(actualSymbol, expectedSymbol)
    });
}

const checkSymbol = (actualSymbol: vscode.DocumentSymbol, expectedSymbol: vscode.DocumentSymbol) => {
    assert.equal(actualSymbol.name, expectedSymbol.name);
    assert.equal(actualSymbol.kind, expectedSymbol.kind);
    assert.deepEqual(actualSymbol.range, expectedSymbol.range);

    checkSymbols(actualSymbol.children, expectedSymbol.children)
}
