import * as vscode from 'vscode';
import * as assert from 'assert';
import {getDocUri, activate, createTicker, editor} from './helper';

suite('Document Formatting', () => {
    const fileName = 'document-formatting.schema';
    const docUri = getDocUri(fileName);

    const {fireTick, waitingForTick} = createTicker()

    test(`Open [${fileName}]`, async () => {
        await activate(docUri);
        fireTick()
    });

    test('document-formatting.schema', async () => {
        await waitingForTick()
        const expectedText = '' +
            'namespace DocumentFormatting\n' +
            '\n' +
            'Person(人物): EntityType\n' +
            '    desc: a great name\n' +
            '    properties:\n' +
            '        age(年龄): Text\n' +
            '        birth(生日): Text\n' +
            '\n' +
            'Works(作品): EntityType\n' +
            '    desc: a great book\n' +
            '    properties:\n' +
            '        author(作者): Person\n' +
            '';
        await testDocumentFormatting(docUri, expectedText);
    });
});


async function testDocumentFormatting(docUri: vscode.Uri, expectedText: string) {
    const options: vscode.FormattingOptions = {
        tabSize: 4,
        insertSpaces: true,
        singleQuote: false
    }

    const actualTextEdits = await vscode.commands.executeCommand<vscode.TextEdit[]>('vscode.executeFormatDocumentProvider', docUri, options);

    await editor.edit(editBuilder => actualTextEdits.forEach(x => editBuilder.replace(x.range, x.newText)));
    const actualText = editor.document.getText()

    assert.equal(actualText, expectedText);
}
