import * as vscode from 'vscode';
import * as assert from 'assert';
import {getDocUri, activate, doc, center, findKeywordRange, createTicker} from './helper';

suite('Document Highlight', () => {
    const fileName = 'document-highlight.schema';
    const docUri = getDocUri(fileName);

    const {fireTick, waitingForTick} = createTicker()

    test(`Open [${fileName}]`, async () => {
        await activate(docUri);
        fireTick()
    });

    test(`Highlighting [EntityType]`, async () => {
        await waitingForTick()

        await testHighlight(docUri, center(findKeywordRange(doc, 'EntityType', 1)), [
            toDocumentHighlight(findKeywordRange(doc, 'EntityType', 1)),
            toDocumentHighlight(findKeywordRange(doc, 'EntityType', 2)),
        ]);

        await testHighlight(docUri, center(findKeywordRange(doc, 'EntityType', 2)), [
            toDocumentHighlight(findKeywordRange(doc, 'EntityType', 2)),
            toDocumentHighlight(findKeywordRange(doc, 'EntityType', 2)),
        ]);
    });

    test(`Highlighting [Person]`, async () => {
        await waitingForTick()

        await testHighlight(docUri, center(findKeywordRange(doc, 'Person', 1)), [
            toDocumentHighlight(findKeywordRange(doc, 'Person', 1)),
            toDocumentHighlight(findKeywordRange(doc, 'Person', 2)),
        ]);

        await testHighlight(docUri, center(findKeywordRange(doc, 'Person', 2)), [
            toDocumentHighlight(findKeywordRange(doc, 'Person', 1)),
            toDocumentHighlight(findKeywordRange(doc, 'Person', 2)),
        ]);
    });

});

const toDocumentHighlight = (range: vscode.Range, kind: vscode.DocumentHighlightKind = vscode.DocumentHighlightKind.Text) => {
    return new vscode.DocumentHighlight(range, kind)
}

const testHighlight = async (docUri: vscode.Uri, position: vscode.Position, expectedHighlights: vscode.DocumentHighlight[]) => {
    const actualHighlights = await vscode.commands.executeCommand<vscode.DocumentHighlight[]>('vscode.executeDocumentHighlights', docUri, position);

    assert.equal(actualHighlights.length, expectedHighlights.length);

    expectedHighlights.forEach((expectedHighlight, i) => {
        const actualHighlight = actualHighlights[i];
        // assert.deepEqual(actualLocation.range, expectedLocation.range);
    });
}
