import * as vscode from 'vscode';
import * as assert from 'assert';
import {getDocUri, activate, createTicker, toRange} from './helper';

suite('Diagnostics', () => {
    const fileName = 'diagnostics.concept.rule';
    const docUri = getDocUri(fileName);

    const {fireTick, waitingForTick} = createTicker()

    test(`Open [${fileName}]`, async () => {
        await activate(docUri);
        fireTick()
    });

    test('Diagnoses [Full]', async () => {
        await waitingForTick()

        await testDiagnostics(docUri, [
            toDiagnostic(toRange(4, 8, 4, 62), "Redeclare block-scoped concept rule"),
            toDiagnostic(toRange(4, 8, 7, 9), "\"Structure/GraphStructure\" is required"),
            toDiagnostic(toRange(9, 8, 9, 62), "Redeclare block-scoped concept rule"),
            toDiagnostic(toRange(12, 12, 13, 13), "\"Structure/GraphStructure\" should be the first one in the scope"),
            toDiagnostic(toRange(17, 8, 17, 62), "Redeclare block-scoped concept rule"),
            toDiagnostic(toRange(17, 8, 30, 9), "\"Structure/GraphStructure\" is already defined in the scope"),
            toDiagnostic(toRange(26, 12, 27, 13), "\"Rule/Constraint\" is already defined in the scope"),
            toDiagnostic(toRange(28, 12, 29, 13), "\"Action\" is already defined in the scope"),
            toDiagnostic(toRange(33, 0, 33, 54), "Redeclare block-scoped concept rule"),
            toDiagnostic(toRange(38, 0, 38, 54), "Redeclare block-scoped concept rule"),
        ]);
    });

});

const toDiagnostic = (range: vscode.Range, message: string, severity: vscode.DiagnosticSeverity = vscode.DiagnosticSeverity.Information) => {
    return new vscode.Diagnostic(range, message, severity);
}

const renderItem = (item: vscode.Diagnostic) => {
    const {range, message} = item;
    return JSON.stringify({
        range: `${range.start.line}:${range.start.character} - ${range.end.line}:${range.end.character}`, message
    })
}

const render = (items: vscode.Diagnostic[]) => (items || []).map(x => renderItem(x)).join('\n');

async function testDiagnostics(docUri: vscode.Uri, expectedDiagnostics: vscode.Diagnostic[]) {
    await activate(docUri);

    const actualDiagnostics = vscode.languages.getDiagnostics(docUri);

    assert.equal(render(actualDiagnostics), render(expectedDiagnostics));
}
