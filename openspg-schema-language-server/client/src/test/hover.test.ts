import * as vscode from "vscode";
import * as assert from "assert";
import { getDocUri, activate, doc, findKeywordRange, center, createTicker } from "./helper";

suite("Hover", () => {
    const fileName = "hover.schema";
    const docUri = getDocUri(fileName);

    const { fireTick, waitingForTick } = createTicker();

    test(`Open [${fileName}]`, async () => {
        await activate(docUri);
        fireTick();
    });

    test("EntityType Hover [Keyword]", async () => {
        await waitingForTick();
        await testHover(docUri, center(findKeywordRange(doc, "Keyword", 1)), [
            new vscode.Hover(
                new vscode.MarkdownString(
                    "**Keyword** *关键词* ***EntityType***,***ConceptType***\n" +
                        "\n" +
                        "- **info** *信息* ***Text***\n" +
                        "- **semanticType** *语义类型* ***Text***"
                ),
                findKeywordRange(doc, "Keyword", 2)
            )
        ]);
    });

    test("EntityType Hover [Date]", async () => {
        await waitingForTick();
        await testHover(docUri, center(findKeywordRange(doc, "Date", 2)), [
            new vscode.Hover(
                new vscode.MarkdownString(
                    "**Date** *日期* ***EntityType***\n" +
                        "\n" +
                        "- **info** *信息* ***Text***\n" +
                        "- **semanticType** *语义类型* ***Text***"
                ),
                findKeywordRange(doc, "Date", 1)
            )
        ]);
    });

    test("EntityType Hover [Chunk]", async () => {
        await waitingForTick();
        await testHover(docUri, center(findKeywordRange(doc, "Chunk", 2)), [
            new vscode.Hover(
                new vscode.MarkdownString(
                    "**Chunk** *文本块* ***EntityType***\n" +
                        "\n" +
                        "- **content** *内容* ***Text***\n" +
                        "- **keyword** *关键词* ***Keyword***"
                ),
                findKeywordRange(doc, "Chunk", 1)
            )
        ]);
    });

    test("EntityType Hover [GeographicLocation]", async () => {
        await waitingForTick();
        await testHover(docUri, center(findKeywordRange(doc, "GeographicLocation", 2)), [
            new vscode.Hover(
                new vscode.MarkdownString(
                    "**GeographicLocation** *地理位置* ***EntityType***\n" +
                        "\n" +
                        "- **info** *信息* ***Text***\n" +
                        "- **semanticType** *语义类型* ***Text***"
                ),
                findKeywordRange(doc, "GeographicLocation", 1)
            )
        ]);
    });

    test("EntityType Hover [Person]", async () => {
        await waitingForTick();
        await testHover(docUri, center(findKeywordRange(doc, "Person", 2)), [
            new vscode.Hover(
                new vscode.MarkdownString(
                    "**Person** *人物* ***EntityType***\n" +
                        "\n" +
                        "- **info** *信息* ***Text***\n" +
                        "- **semanticType** *语义类型* ***Text***\n" +
                        "- **job** *工作* ***Text***"
                ),
                findKeywordRange(doc, "Person", 1)
            )
        ]);
    });
});

const getHoverContent = (hover: vscode.Hover) =>
    hover.contents.map((x) => (x instanceof vscode.MarkdownString ? x.value : "")).join("");

const testHover = async (docUri: vscode.Uri, position: vscode.Position, expectedHovers: vscode.Hover[]) => {
    const actualHovers = await vscode.commands.executeCommand<vscode.Hover[]>(
        "vscode.executeHoverProvider",
        docUri,
        position
    );

    assert.equal(actualHovers.length, expectedHovers.length);

    expectedHovers.forEach((expectedHover, i) => {
        const actualHover = actualHovers[i];
        assert.deepEqual(actualHover.range?.start, expectedHover.range?.start);
        assert.equal(getHoverContent(actualHover), getHoverContent(expectedHover));
    });
};
