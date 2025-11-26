import * as vscode from 'vscode';
import * as assert from 'assert';
import {getDocUri, activate, doc, findKeywordRange, toLocation, center} from './helper';

suite('Definition', () => {
    const docUri = getDocUri('definition.schema');

    test('Find entity definition', async () => {
        await activate(docUri);

        await testDefinition(docUri, center(findKeywordRange(doc, 'Keyword', 1)), [
            toLocation(docUri, findKeywordRange(doc, 'Keyword', 2)),
        ]);

        await testDefinition(docUri, center(findKeywordRange(doc, 'Date', 2)), [
            toLocation(docUri, findKeywordRange(doc, 'Date', 1)),
        ]);

        await testDefinition(docUri, center(findKeywordRange(doc, 'Chunk', 2)), [
            toLocation(docUri, findKeywordRange(doc, 'Chunk', 1)),
        ]);

        await testDefinition(docUri, center(findKeywordRange(doc, 'GeographicLocation', 2)), [
            toLocation(docUri, findKeywordRange(doc, 'GeographicLocation', 1)),
        ]);

        await testDefinition(docUri, center(findKeywordRange(doc, 'Person', 2)), [
            toLocation(docUri, findKeywordRange(doc, 'Person', 1)),
        ]);

        await testDefinition(docUri, center(findKeywordRange(doc, 'Person', 3)), [
            toLocation(docUri, findKeywordRange(doc, 'Person', 1)),
        ]);
    });

});

const testDefinition = async (docUri: vscode.Uri, position: vscode.Position, expectedLocations: vscode.Location[]) => {
    const actualLocations = await vscode.commands.executeCommand<vscode.Location[]>('vscode.executeDefinitionProvider', docUri, position);

    assert(actualLocations.length === expectedLocations.length);

    expectedLocations.forEach((expectedLocation, i) => {
        const actualLocation = actualLocations[i];
        assert.deepEqual(actualLocation.range, expectedLocation.range);
    });
}
