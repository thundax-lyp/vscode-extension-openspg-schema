import * as vscode from 'vscode';
import * as assert from 'assert';
import {getDocUri, activate, toRange, createTicker} from './helper';

suite('Document Formatting', () => {
    const fileName = 'document-formatting.concept.rule';
    const docUri = getDocUri(fileName);

    const {fireTick, waitingForTick} = createTicker()

    test(`Open [${fileName}]`, async () => {
        await activate(docUri);
        fireTick()
    });

    test('Formatting document-formatting.concept.rule', async () => {
        await waitingForTick()
        await testDocumentFormatting(docUri, [
            {newText: "\n        ", range: toRange(3, 12, 3, 12)},
            {newText: "}", range: toRange(4, 23, 4, 23)},
            {newText: "\n", range: toRange(5, 0, 5, 0)},
            {newText: "", range: toRange(5, 12, 5, 17)},
            {newText: "        ", range: toRange(6, 0, 6, 0)},
            {newText: "", range: toRange(6, 19, 6, 20)},
            {newText: "", range: toRange(6, 22, 6, 23)},
            {newText: "     ", range: toRange(7, 0, 7, 0)},
            {newText: "   ", range: toRange(7, 8, 7, 8)},
            {newText: "", range: toRange(7, 19, 7, 20)},
            {newText: "", range: toRange(7, 22, 7, 23)},
            {newText: "\n", range: toRange(10, 6, 10, 6)},
            {newText: "\n", range: toRange(16, 13, 16, 13)},
            {newText: "", range: toRange(18, 42, 18, 43)},
            {newText: "\n", range: toRange(20, 0, 20, 0)},
            {newText: "   ", range: toRange(24, 0, 24, 0)},
            {newText: " ", range: toRange(24, 20, 24, 20)},
            {newText: "   ", range: toRange(25, 0, 25, 0)},
            {newText: " ", range: toRange(25, 20, 25, 20)},
            {newText: "   ", range: toRange(26, 0, 26, 0)},
            {newText: " ", range: toRange(26, 20, 26, 20)},
            {newText: "   ", range: toRange(27, 0, 27, 0)},
            {newText: " ", range: toRange(27, 20, 27, 20)},
            {newText: " ", range: toRange(31, 23, 31, 23)},
            {newText: " ", range: toRange(31, 24, 31, 24)},
            {newText: " ", range: toRange(32, 23, 32, 23)},
            {newText: " ", range: toRange(32, 24, 32, 24)},
            {newText: "}", range: toRange(34, 29, 34, 29)},
            {newText: "", range: toRange(35, 16, 35, 17)},
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
