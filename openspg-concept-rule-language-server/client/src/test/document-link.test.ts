import * as vscode from 'vscode';
import * as assert from 'assert';
import {DocumentSymbol, SymbolKind} from 'vscode';
import {activate, createTicker, getDocUri, toRange} from './helper';

suite('Document Link', () => {
    const fileName = 'document-links.concept.rule';
    const docUri = getDocUri(fileName);

    const {fireTick, waitingForTick} = createTicker()

    test(`Open [${fileName}]`, async () => {
        await activate(docUri);
        fireTick()
    });

    test('Find Document Links', async () => {
        await waitingForTick()
        await testDocumentLink(docUri, [
            toSymbol('DocumentSymbol', SymbolKind.Namespace, toRange(0, 0, 0, 24)),
        ]);
    });
});

const toSymbol = (name: string, kind: vscode.SymbolKind, range: vscode.Range, children: vscode.DocumentSymbol[] = []): vscode.DocumentSymbol => ({
    name, kind, range, selectionRange: range, detail: '', children: children,
})

async function testDocumentLink(docUri: vscode.Uri, expectedLinks: vscode.DocumentLink[]) {
    const actualLinks = await vscode.commands.executeCommand<DocumentSymbol[]>('vscode.executeLinkProvider', docUri);
    console.log('='.repeat(20))
    console.log(JSON.stringify(actualLinks))
    console.log('='.repeat(10))
    actualLinks.forEach(actualLink => {
        traceLink(actualLink)
    })
    // checkSymbols(actualSymbols, expectedSymbols)
}

const traceLink = (link: vscode.DocumentLink) => {
    const {start, end} = link.range;
    console.log(`[(${start.line},${start.character}), (${end.line},${end.character})] [${link.target}]`);
}
