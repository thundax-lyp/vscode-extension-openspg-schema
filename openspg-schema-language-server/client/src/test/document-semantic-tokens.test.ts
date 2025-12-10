import * as vscode from 'vscode';
import * as assert from 'assert';
import {getDocUri, activate, doc, findKeywordRange, createTicker, toRange} from './helper';

enum TokenTypes {
    none = 0,
    comment = 1,
    keyword = 2,
    string = 3,
    namespace = 4,
    structure = 5,
    inherited = 6,
    property = 7,
    variable = 8,
}

suite('Document Semantic Tokens', () => {
    const fileName = 'document-semantic-tokens.schema';
    const docUri = getDocUri(fileName);

    const {fireTick, waitingForTick} = createTicker()
    let sourceCode = ''

    test(`Open [${fileName}]`, async () => {
        await activate(docUri);
        fireTick();
        sourceCode = doc.getText();
    });

    test(`Semantic Tokens [All]`, async () => {
        await waitingForTick()

        await testSemanticTokens(docUri, toSemanticTokens([
            {range: findKeywordRange(doc, 'DocumentSemanticTokens', 1), tokenType: TokenTypes.variable},

            {range: findKeywordRange(doc, 'Person', 1), tokenType: TokenTypes.structure},
            {range: findKeywordRange(doc, '人物', 2), tokenType: TokenTypes.string},
            {range: findKeywordRange(doc, 'EntityType', 1), tokenType: TokenTypes.keyword},

            {range: findKeywordRange(doc, 'desc', 1), tokenType: TokenTypes.keyword},
            {range: findKeywordRange(doc, 'a great name', 1), tokenType: TokenTypes.variable},

            {range: findKeywordRange(doc, 'properties', 1), tokenType: TokenTypes.keyword},

            {range: findKeywordRange(doc, 'age', 1), tokenType: TokenTypes.structure},
            {range: findKeywordRange(doc, '年龄', 1), tokenType: TokenTypes.string},
            {range: findKeywordRange(doc, 'Text', 1), tokenType: TokenTypes.keyword},

            {range: findKeywordRange(doc, 'birth', 1), tokenType: TokenTypes.structure},
            {range: findKeywordRange(doc, '生日', 1), tokenType: TokenTypes.string},
            {range: findKeywordRange(doc, 'Text', 2), tokenType: TokenTypes.keyword},

            {range: findKeywordRange(doc, 'Works', 1), tokenType: TokenTypes.structure},
            {range: findKeywordRange(doc, '作品', 2), tokenType: TokenTypes.string},
            {range: findKeywordRange(doc, 'EntityType', 2), tokenType: TokenTypes.keyword},

            {range: findKeywordRange(doc, 'desc', 2), tokenType: TokenTypes.keyword},
            {range: findKeywordRange(doc, 'a great book', 1), tokenType: TokenTypes.variable},

            {range: findKeywordRange(doc, 'properties', 2), tokenType: TokenTypes.keyword},

            {range: findKeywordRange(doc, 'author', 1), tokenType: TokenTypes.structure},
            {range: findKeywordRange(doc, '作者', 1), tokenType: TokenTypes.string},
            {range: findKeywordRange(doc, 'Person', 2), tokenType: TokenTypes.inherited},

        ]));
    });

});

const toSemanticTokens = (records: { range: vscode.Range, tokenType: number }[]) => {
    const builder = new vscode.SemanticTokensBuilder();
    records.forEach(({range, tokenType}) => {
        builder.push(range.start.line, range.start.character, range.end.character - range.start.character, tokenType, 0);
    })
    return builder.build()
}

const testSemanticTokens = async (docUri: vscode.Uri, expectedSemanticTokens: vscode.SemanticTokens) => {
    const actualSemanticTokens = await vscode.commands.executeCommand<vscode.SemanticTokens>('vscode.provideDocumentSemanticTokens', docUri);

    assert.equal(actualSemanticTokens.data.length, expectedSemanticTokens.data.length);

    const decode = (data: Uint32Array) => {
        let lastX = 0, lastY = 0;
        const result = [...data]
        for (let idx = 0; idx < result.length; idx += 5) {
            const offsetY = result[idx], offsetX = result[idx + 1];
            if (offsetY === 0) {
                lastX += offsetX;
            } else {
                lastX = offsetX;
            }
            lastY += offsetY;
            result[idx] = lastY;
            result[idx + 1] = lastX;
        }
        return result;
    }

    const render = (index: number, item: number[]) => {
        const [ln, col, len, type] = item;
        const text = doc.getText(toRange(ln, col, ln, col + len))
        return JSON.stringify({
            ln, col, len, type, text
        })
    }

    const actualItems = decode(actualSemanticTokens.data)
    const expectedItems = decode(expectedSemanticTokens.data)
    for (let idx = 0; idx < actualSemanticTokens.data.length; idx += 5) {
        const actualItem = actualItems.slice(idx, idx + 5)
        const expectedItem = expectedItems.slice(idx, idx + 5)
        assert.equal(render(idx / 5, actualItem), render(idx / 5, expectedItem));
    }
}
