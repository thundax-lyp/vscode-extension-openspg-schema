import * as vscode from 'vscode';
import * as assert from 'assert';
import {getDocUri, activate, toRange} from './helper';

suite('Document Formatting', () => {
    const docUri = getDocUri('document-formatting.schema');

    test('document-formatting.schema', async () => {
        await testDocumentFormatting(docUri, [
            {newText: '', range: toRange(0, 0, 1, 0)},
            {newText: '', range: toRange(3, 11, 3, 12)},
            {newText: '', range: toRange(3, 13, 3, 14)},
            {newText: ' ', range: toRange(4, 0, 4, 0)},
            {newText: ' ', range: toRange(4, 2, 4, 2)},
            {newText: '  ', range: toRange(5, 0, 5, 0)},
            {newText: ' ', range: toRange(6, 7, 6, 7)},
            {newText: '', range: toRange(6, 15, 6, 16)},
            {newText: '', range: toRange(6, 17, 6, 18)},
            {newText: ' ', range: toRange(7, 0, 7, 0)},
            {newText: '', range: toRange(7, 18, 7, 20)},
            {newText: '', range: toRange(9, 10, 9, 11)},
            {newText: '', range: toRange(9, 12, 9, 14)},
            {newText: '  ', range: toRange(10, 2, 10, 2)},
            {newText: '  ', range: toRange(11, 2, 11, 2)},
            {newText: '', range: toRange(11, 13, 12, 7)},
        ]);
    });
});


async function testDocumentFormatting(docUri: vscode.Uri, expectedTextEdits: vscode.TextEdit[]) {
    await activate(docUri);

    const options: vscode.FormattingOptions = {
        tabSize: 4,
        insertSpaces: true,
        singleQuote: false
    }
    const actualTextEdits = await vscode.commands.executeCommand<vscode.TextEdit[]>('vscode.executeFormatDocumentProvider', docUri, {
        options
    });

    assert.equal(actualTextEdits.length, expectedTextEdits.length);

    expectedTextEdits.forEach((expectedTextEdit, i) => {
        const actualTextEdit = actualTextEdits[i];
        assert.equal(actualTextEdit.newText, expectedTextEdit.newText);
        assert.deepEqual(actualTextEdit.range, expectedTextEdit.range);
    });
}
