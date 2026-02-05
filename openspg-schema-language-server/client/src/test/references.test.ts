import * as vscode from 'vscode';
import * as assert from 'assert';
import { getDocUri, activate, doc, center, findKeywordRange, toLocation, createTicker } from './helper';

suite('References', () => {
    const fileName = 'references.schema';
    const docUri = getDocUri(fileName);

    const { fireTick, waitingForTick } = createTicker();

    test(`Open [${fileName}]`, async () => {
        await activate(docUri);
        fireTick();
    });

    test(`Find entity references [Keyword]`, async () => {
        await waitingForTick();
        await testReferences(docUri, center(findKeywordRange(doc, 'Keyword', 2)), [
            toLocation(docUri, findKeywordRange(doc, 'Keyword', 1))
        ]);
    });

    test(`Find entity references [Date]`, async () => {
        await waitingForTick();
        await testReferences(docUri, center(findKeywordRange(doc, 'Date', 1)), [
            toLocation(docUri, findKeywordRange(doc, 'Date', 2)),
            toLocation(docUri, findKeywordRange(doc, 'Date', 3))
        ]);
    });

    test(`Find entity references [Chunk]`, async () => {
        await waitingForTick();
        await testReferences(docUri, center(findKeywordRange(doc, 'Chunk', 1)), [
            toLocation(docUri, findKeywordRange(doc, 'Chunk', 2))
        ]);
    });

    test(`Find entity references [GeographicLocation]`, async () => {
        await waitingForTick();
        await testReferences(docUri, center(findKeywordRange(doc, 'GeographicLocation', 1)), [
            toLocation(docUri, findKeywordRange(doc, 'GeographicLocation', 2))
        ]);
    });

    test(`Find entity references [Person]`, async () => {
        await waitingForTick();
        await testReferences(docUri, center(findKeywordRange(doc, 'Person', 1)), [
            toLocation(docUri, findKeywordRange(doc, 'Person', 2)),
            toLocation(docUri, findKeywordRange(doc, 'Person', 3)),
            toLocation(docUri, findKeywordRange(doc, 'Person', 4))
        ]);
    });
});

const renderItem = (item: vscode.Location) => {
    const { start, end } = item.range;
    return JSON.stringify({
        start,
        end
    });
};

const render = (items: vscode.Location[]) => (items || []).map((x) => renderItem(x)).join('\n');

const testReferences = async (docUri: vscode.Uri, position: vscode.Position, expectedLocations: vscode.Location[]) => {
    const actualLocations = await vscode.commands.executeCommand<vscode.Location[]>(
        'vscode.executeReferenceProvider',
        docUri,
        position
    );
    assert.equal(render(actualLocations), render(expectedLocations));
};
