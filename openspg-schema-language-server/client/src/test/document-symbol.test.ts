import * as vscode from 'vscode';
import {DocumentSymbol, SymbolKind} from 'vscode';
import {activate, createTicker, getDocUri, toRange} from './helper';
import assert = require("node:assert");

suite('Document Symbols', () => {
    const fileName = 'document-symbol.schema';
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
            toSymbol('Person', SymbolKind.Class, toRange(2, 0, 6, 23)),
            toSymbol('Works', SymbolKind.Class, toRange(8, 0, 11, 26)),
        ]);
    });
});

const toSymbol = (name: string, kind: vscode.SymbolKind, range: vscode.Range): vscode.DocumentSymbol => ({
    name, kind, range, selectionRange: range, detail: '', children: [],
})

async function testDocumentSymbol(docUri: vscode.Uri, expectedSymbols: vscode.DocumentSymbol[]) {
    console.log('URI: ' + docUri.toString(false));

    await activate(docUri);

    let actualSymbols = await vscode.commands.executeCommand<DocumentSymbol[]>('vscode.executeDocumentSymbolProvider', docUri);

    assert.equal(actualSymbols.length, expectedSymbols.length);

    expectedSymbols.forEach((expectedSymbol, i) => {
        const actualSymbol = actualSymbols[i];
        assert.equal(actualSymbol.name, expectedSymbol.name);
        assert.equal(actualSymbol.kind, expectedSymbol.kind);
        assert.deepEqual(actualSymbol.range, expectedSymbol.range);
    });
}
