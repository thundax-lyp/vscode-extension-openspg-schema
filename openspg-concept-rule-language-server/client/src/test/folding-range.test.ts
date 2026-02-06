import * as vscode from "vscode";
import * as assert from "assert";
import { getDocUri, activate, createTicker } from "./helper";

suite("Folding Ranges", () => {
    const fileName = "folding-range.concept.rule";
    const docUri = getDocUri(fileName);

    const { fireTick, waitingForTick } = createTicker();

    test(`Open [${fileName}]`, async () => {
        await activate(docUri);
        fireTick();
    });

    test("Folding [All]", async () => {
        await waitingForTick();

        await testFoldingRanges(docUri, [
            new vscode.FoldingRange(2, 12),
            new vscode.FoldingRange(3, 12),
            new vscode.FoldingRange(4, 11),
            new vscode.FoldingRange(5, 6),
            new vscode.FoldingRange(7, 10),
            new vscode.FoldingRange(14, 41),
            new vscode.FoldingRange(15, 41),
            new vscode.FoldingRange(16, 40),
            new vscode.FoldingRange(17, 19),
            new vscode.FoldingRange(20, 22),
            new vscode.FoldingRange(23, 39),
            new vscode.FoldingRange(26, 31),
            new vscode.FoldingRange(37, 38)
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

const render = (items: vscode.FoldingRange[]) => (items || []).map((x) => renderItem(x)).join("\n");

const testFoldingRanges = async (docUri: vscode.Uri, expectedFoldingRanges: vscode.FoldingRange[]) => {
    console.log("URI: " + docUri.toString(false));

    await activate(docUri);

    let actualFoldingRanges = await vscode.commands.executeCommand<vscode.FoldingRange[]>(
        "vscode.executeFoldingRangeProvider",
        docUri
    );

    assert.equal(render(actualFoldingRanges), render(expectedFoldingRanges));
};
