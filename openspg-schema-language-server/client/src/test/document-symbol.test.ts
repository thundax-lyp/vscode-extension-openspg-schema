import * as vscode from "vscode";
import * as assert from "assert";
import { DocumentSymbol, SymbolKind } from "vscode";
import { activate, createTicker, getDocUri, toRange } from "./helper";

suite("Document Symbols", () => {
    const fileName = "document-symbol.schema";
    const docUri = getDocUri(fileName);

    const { fireTick, waitingForTick } = createTicker();

    test(`Open [${fileName}]`, async () => {
        await activate(docUri);
        fireTick();
    });

    test("Find Symbols", async () => {
        await waitingForTick();
        await testDocumentSymbol(docUri, [
            toSymbol("DocumentSymbol", SymbolKind.Namespace, toRange(0, 0, 0, 24)),
            toSymbol("Person", SymbolKind.Class, toRange(2, 0, 8, 1)),
            toSymbol("Works", SymbolKind.Class, toRange(8, 0, 12, 0))
        ]);
    });
});

const toSymbol = (name: string, kind: vscode.SymbolKind, range: vscode.Range): vscode.DocumentSymbol => ({
    name,
    kind,
    range,
    selectionRange: range,
    detail: "",
    children: []
});

const renderItem = (item: vscode.DocumentSymbol) => {
    const { name, kind, range } = item;
    const kindNames = Object.keys(vscode.SymbolKind).filter((x) => !/[0-9]+/g.test(x));
    return JSON.stringify({
        name,
        kind: kindNames[kind],
        range
    });
};

const render = (items: vscode.DocumentSymbol[]) => items.map((x) => renderItem(x)).join("\n");

async function testDocumentSymbol(docUri: vscode.Uri, expectedSymbols: vscode.DocumentSymbol[]) {
    console.log("URI: " + docUri.toString(false));

    await activate(docUri);

    let actualSymbols = await vscode.commands.executeCommand<DocumentSymbol[]>(
        "vscode.executeDocumentSymbolProvider",
        docUri
    );

    assert.equal(render(actualSymbols), render(expectedSymbols));
}
