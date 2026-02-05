import * as vscode from 'vscode';
import * as assert from 'assert';
import { getDocUri, activate, doc, createTicker } from './helper';

suite('Folding Ranges', () => {
    const fileName = 'folding-range.schema';
    const docUri = getDocUri(fileName);

    const { fireTick, waitingForTick } = createTicker();
    let sourceCode = '';

    test(`Open [${fileName}]`, async () => {
        await activate(docUri);
        fireTick();
        sourceCode = doc.getText();
    });

    test(`Folding [All]`, async () => {
        await waitingForTick();

        await testFoldingRanges(docUri, [
            new vscode.FoldingRange(6, 13),
            new vscode.FoldingRange(8, 13),
            new vscode.FoldingRange(9, 10),
            new vscode.FoldingRange(11, 13),
            new vscode.FoldingRange(15, 29),
            new vscode.FoldingRange(16, 20),
            new vscode.FoldingRange(17, 18),
            new vscode.FoldingRange(19, 20),
            new vscode.FoldingRange(21, 26),
            new vscode.FoldingRange(27, 28)
        ]);
    });
});

const renderItem = (item: vscode.FoldingRange) => {
    const { start, end } = item;
    return JSON.stringify({
        start,
        end
    });
};

const render = (items: vscode.FoldingRange[]) => (items || []).map((x) => renderItem(x)).join('\n');

const testFoldingRanges = async (docUri: vscode.Uri, expectedFoldingRanges: vscode.FoldingRange[]) => {
    console.log('URI: ' + docUri.toString(false));

    await activate(docUri);

    let actualFoldingRanges = await vscode.commands.executeCommand<vscode.FoldingRange[]>(
        'vscode.executeFoldingRangeProvider',
        docUri
    );

    assert.equal(render(actualFoldingRanges), render(expectedFoldingRanges));
};
