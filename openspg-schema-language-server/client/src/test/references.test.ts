import * as vscode from 'vscode';
import * as assert from 'assert';
import {getDocUri, activate, doc, center, findKeywordRange, toLocation} from './helper';

suite('References', () => {
    const docUri = getDocUri('references.schema');

    test('Find entity references', async () => {
        await activate(docUri);

        await testReferences(docUri, center(findKeywordRange(doc, 'Keyword', 2)), [
            toLocation(docUri, findKeywordRange(doc, 'Keyword', 1)),
        ]);

        await testReferences(docUri, center(findKeywordRange(doc, 'Date', 1)), [
            toLocation(docUri, findKeywordRange(doc, 'Date', 2)),
            toLocation(docUri, findKeywordRange(doc, 'Date', 3)),
        ]);

        await testReferences(docUri, center(findKeywordRange(doc, 'Chunk', 1)), [
            toLocation(docUri, findKeywordRange(doc, 'Chunk', 2)),
        ]);

        await testReferences(docUri, center(findKeywordRange(doc, 'GeographicLocation', 1)), [
            toLocation(docUri, findKeywordRange(doc, 'GeographicLocation', 2)),
        ]);

        await testReferences(docUri, center(findKeywordRange(doc, 'Person', 1)), [
            toLocation(docUri, findKeywordRange(doc, 'Person', 2)),
            toLocation(docUri, findKeywordRange(doc, 'Person', 3)),
            toLocation(docUri, findKeywordRange(doc, 'Person', 4)),
        ]);

    });

});

const testReferences = async (docUri: vscode.Uri, position: vscode.Position, expectedLocations: vscode.Location[]) => {
    const actualLocations = await vscode.commands.executeCommand<vscode.Location[]>('vscode.executeReferenceProvider', docUri, position);

    assert(actualLocations.length === expectedLocations.length);

    expectedLocations.forEach((expectedLocation, i) => {
        const actualLocation = actualLocations[i];
        assert.deepEqual(actualLocation.range, expectedLocation.range);
    });
}
