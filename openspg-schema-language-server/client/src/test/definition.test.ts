import * as vscode from 'vscode';
import * as assert from 'assert';
import { getDocUri, activate, doc, findKeywordRange, toLocation, center, createTicker } from './helper';

suite('Definition', () => {
    const fileName = 'definition.schema';
    const docUri = getDocUri(fileName);

    const { fireTick, waitingForTick } = createTicker();

    test(`Open [${fileName}]`, async () => {
        await activate(docUri);
        fireTick();
    });

    test(`Find entity [Keyword]`, async () => {
        await waitingForTick();
        await testDefinition(docUri, center(findKeywordRange(doc, 'Keyword', 1)), [
            toLocation(docUri, findKeywordRange(doc, 'Keyword', 2))
        ]);
    });

    test(`Find entity [Date]`, async () => {
        await waitingForTick();
        await testDefinition(docUri, center(findKeywordRange(doc, 'Date', 2)), [
            toLocation(docUri, findKeywordRange(doc, 'Date', 1))
        ]);
    });

    test(`Find entity [Chunk]`, async () => {
        await waitingForTick();
        await testDefinition(docUri, center(findKeywordRange(doc, 'Chunk', 2)), [
            toLocation(docUri, findKeywordRange(doc, 'Chunk', 1))
        ]);
    });

    test(`Find entity [GeographicLocation]`, async () => {
        await waitingForTick();
        await testDefinition(docUri, center(findKeywordRange(doc, 'GeographicLocation', 2)), [
            toLocation(docUri, findKeywordRange(doc, 'GeographicLocation', 1))
        ]);
    });

    test(`Find entity [Person]`, async () => {
        await waitingForTick();
        await testDefinition(docUri, center(findKeywordRange(doc, 'Person', 2)), [
            toLocation(docUri, findKeywordRange(doc, 'Person', 1))
        ]);
        await testDefinition(docUri, center(findKeywordRange(doc, 'Person', 3)), [
            toLocation(docUri, findKeywordRange(doc, 'Person', 1))
        ]);
    });
});

const testDefinition = async (docUri: vscode.Uri, position: vscode.Position, expectedLocations: vscode.Location[]) => {
    const actualLocations = await vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeDefinitionProvider',
        docUri,
        position
    );

    assert.equal(actualLocations.length, expectedLocations.length);

    expectedLocations.forEach((expectedLocation, i) => {
        const actualLocation = actualLocations[i];
        assert.deepEqual(actualLocation.range, expectedLocation.range);
    });
};
