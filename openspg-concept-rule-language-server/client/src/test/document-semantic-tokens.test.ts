import * as vscode from 'vscode';
import * as assert from 'assert';
import {getDocUri, activate, doc, findKeywordRange, createTicker, toRange} from './helper';
import {SemanticTokenTypes} from "vscode-languageclient";

suite('Document Semantic Tokens', () => {
    const fileName = 'document-semantic-tokens.concept.rule';
    const docUri = getDocUri(fileName);

    const {fireTick, waitingForTick} = createTicker()

    test(`Open [${fileName}]`, async () => {
        await activate(docUri);
        fireTick();
    });

    test(`Semantic Tokens [All]`, async () => {
        await waitingForTick()

        await testSemanticTokens(docUri, toSemanticTokens([
            {range: findKeywordRange(doc, 'DocumentSemanticTokens', 1), tokenType: SemanticTokenTypes.variable},
            {range: findKeywordRange(doc, '`TaxOfRiskApp`/`赌博应用`', 1), tokenType: SemanticTokenTypes.variable},
            {range: findKeywordRange(doc, 'rule', 1), tokenType: SemanticTokenTypes.property},
            {range: findKeywordRange(doc, 'Define', 1), tokenType: SemanticTokenTypes.keyword},
            {range: findKeywordRange(doc, '"s:App', 1), tokenType: SemanticTokenTypes.variable},
            {range: findKeywordRange(doc, 'o:`TaxOfRiskApp`/`赌博应用`', 1), tokenType: SemanticTokenTypes.variable},
            {range: findKeywordRange(doc, '`TaxOfRiskApp`/`赌博应用`', 2), tokenType: SemanticTokenTypes.variable},
            {range: findKeywordRange(doc, 'Structure', 1), tokenType: SemanticTokenTypes.keyword},
            {range: findKeywordRange(doc, 'Rule', 1), tokenType: SemanticTokenTypes.keyword},
            {range: findKeywordRange(doc, 'Action', 1), tokenType: SemanticTokenTypes.keyword},
        ]));
    });

});

const toSemanticTokens = (records: { range: vscode.Range, tokenType: SemanticTokenTypes }[]) => {
    const builder = new vscode.SemanticTokensBuilder();
    const tokenTypes = Object.values(SemanticTokenTypes)
    records.forEach(({range, tokenType}) => {
        builder.push(range.start.line, range.start.character, range.end.character - range.start.character, tokenTypes.indexOf(tokenType), 0);
    })
    return builder.build()
}

const testSemanticTokens = async (docUri: vscode.Uri, expectedSemanticTokens: vscode.SemanticTokens) => {
    const actualSemanticTokens = await vscode.commands.executeCommand<vscode.SemanticTokens>('vscode.provideDocumentSemanticTokens', docUri);

    assert.equal(actualSemanticTokens?.data?.length, expectedSemanticTokens.data.length);

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
        const [ln, col, len, tokenType] = item;
        const text = doc.getText(toRange(ln, col, ln, col + len));
        const type = Object.values(SemanticTokenTypes)[tokenType];
        return JSON.stringify({
            index: index + 1, ln, col, len, type, text
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
