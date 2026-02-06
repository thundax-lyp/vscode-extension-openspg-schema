import * as vscode from "vscode";
import * as assert from "assert";
import { getDocUri, activate, createTicker, toRange } from "./helper";

suite("Diagnostics", () => {
    const fileName = "diagnostics.schema";
    const docUri = getDocUri(fileName);

    const { fireTick, waitingForTick } = createTicker();

    test(`Open [${fileName}]`, async () => {
        await activate(docUri);
        fireTick();
    });

    test("Diagnoses [Full]", async () => {
        await waitingForTick();

        await testDiagnostics(docUri, [
            toDiagnostic(toRange(2, 0, 2, 5), 'Cannot redeclare block-scoped schema "Chunk"'),
            toDiagnostic(toRange(7, 16, 7, 23), 'Cannot redeclare block-scoped schema "keyword"'),
            toDiagnostic(toRange(9, 24, 11, 1), 'Max level of "Schema" is 6'),
            toDiagnostic(toRange(11, 16, 11, 23), 'Cannot redeclare block-scoped schema "keyword"'),
            toDiagnostic(toRange(12, 20, 12, 24), 'Cannot redeclare block-scoped property "desc"'),
            toDiagnostic(toRange(13, 20, 13, 24), 'Cannot redeclare block-scoped property "desc"'),
            toDiagnostic(toRange(14, 20, 14, 24), 'Cannot redeclare block-scoped property "desc"'),
            toDiagnostic(toRange(16, 0, 16, 5), 'Cannot redeclare block-scoped schema "Chunk"'),
            toDiagnostic(toRange(16, 26, 16, 39), 'Undefined type "UndefinedType"'),
            toDiagnostic(toRange(19, 0, 19, 23), 'Duplicate definition of "namespace"')
        ]);
    });
});

const toDiagnostic = (
    range: vscode.Range,
    message: string,
    severity: vscode.DiagnosticSeverity = vscode.DiagnosticSeverity.Information
) => {
    return new vscode.Diagnostic(range, message, severity);
};

const renderItem = (item: vscode.Diagnostic) => {
    const { range, message } = item;
    return JSON.stringify({
        range: `${range.start.line}:${range.start.character} - ${range.end.line}:${range.end.character}`,
        message
    });
};

const render = (items: vscode.Diagnostic[]) => (items || []).map((x) => renderItem(x)).join("\n");

async function testDiagnostics(docUri: vscode.Uri, expectedDiagnostics: vscode.Diagnostic[]) {
    await activate(docUri);

    const actualDiagnostics = vscode.languages.getDiagnostics(docUri);

    assert.equal(render(actualDiagnostics), render(expectedDiagnostics));
}
