import * as vscode from 'vscode';
import {getDocUri, activate} from './helper';
import {DocumentSymbol} from "vscode";

suite('Document Symbols', () => {
    const docUri = getDocUri('document-symbol.schema');

    test('Document symbol texts', async () => {
        await testDocumentSymbol(docUri, [
            // { message: 'ANY is all uppercase.', range: toRange(0, 0, 0, 3), severity: vscode.DiagnosticSeverity.Warning, source: 'ex' },
            // { message: 'ANY is all uppercase.', range: toRange(0, 14, 0, 17), severity: vscode.DiagnosticSeverity.Warning, source: 'ex' },
            // { message: 'OS is all uppercase.', range: toRange(0, 18, 0, 20), severity: vscode.DiagnosticSeverity.Warning, source: 'ex' }
        ]);
    });
});


async function testDocumentSymbol(docUri: vscode.Uri, expectedSymbols: vscode.DocumentSymbol[]) {
    console.log('URI: ' + docUri.toString(false));

    await activate(docUri);

    let actualSymbols = await vscode.commands.executeCommand<DocumentSymbol[]>('vscode.executeDocumentSymbolProvider', docUri);

    (actualSymbols || []).forEach(x => {
        console.log(x.name, x.kind)
    })
    console.log('-'.repeat(40))

    // console.log('test symbols >>>');
    // const symbols: [] = await vscode.commands.executeCommand('vscode.executeDocumentSymbolProvider', docUri);
    // console.log(symbols);
    // console.log('test symbols <<<');

    // assert.equal(actualDiagnostics.length, expectedDiagnostics.length);
    //
    // expectedDiagnostics.forEach((expectedDiagnostic, i) => {
    //     const actualDiagnostic = actualDiagnostics[i];
    //     assert.equal(actualDiagnostic.message, expectedDiagnostic.message);
    //     assert.deepEqual(actualDiagnostic.range, expectedDiagnostic.range);
    //     assert.equal(actualDiagnostic.severity, expectedDiagnostic.severity);
    // });
}
