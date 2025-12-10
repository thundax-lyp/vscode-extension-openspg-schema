import * as vscode from 'vscode';
import * as path from 'path';

export let doc: vscode.TextDocument;
export let editor: vscode.TextEditor;
export let documentEol: string;
export let platformEol: string;

/**
 * Activates extension
 */
export async function activate(docUri: vscode.Uri) {
    // The extensionId is `publisher.name` from package.json
    const ext = vscode.extensions.getExtension('thundax-lyp.openspg-schema-language-server')!;
    await ext.activate();

    try {
        doc = await vscode.workspace.openTextDocument(docUri);
        editor = await vscode.window.showTextDocument(doc);
        await sleep(2000); // Wait for server activation
    } catch (e) {
        console.error(e);
    }
}

export async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const getDocPath = (p: string) => {
    return path.resolve(__dirname, '../../testFixture', p);
};

export const getDocUri = (p: string) => {
    return vscode.Uri.file(getDocPath(p));
};

export async function setTestContent(content: string): Promise<boolean> {
    const all = new vscode.Range(
        doc.positionAt(0),
        doc.positionAt(doc.getText().length)
    );
    return editor.edit(eb => eb.replace(all, content));
}

export const toRange = (startLine: number, startChar: number, endLine: number, endChar: number) =>
    new vscode.Range(
        new vscode.Position(startLine, startChar), new vscode.Position(endLine, endChar),
    );

export const center = (range: vscode.Range) =>
    new vscode.Position(Math.ceil((range.start.line + range.end.line) / 2), Math.ceil((range.start.character + range.end.character) / 2))

export const toLocation = (uri: vscode.Uri, range: vscode.Range) =>
    new vscode.Location(uri, range)

export const findKeywordRange = (document: vscode.TextDocument, keyword: string, index: number = 1) => {
    const source = document.getText();
    let searchOffset = 0, nextOffset = 0;
    for (let i = 0; i < index; i++) {
        searchOffset = source.indexOf(keyword, nextOffset)
        if (searchOffset < 0) {
            return new vscode.Range(new vscode.Position(0, 0), new vscode.Position(0, 0));
        }
        nextOffset = searchOffset + keyword.length;
    }
    const start = document.positionAt(searchOffset)
    return new vscode.Range(start, start.translate(0, keyword.length))
}

export const createTicker = (interval = 100) => {
    let fired = false
    return {
        fireTick: () => {
            fired = true
        },
        waitingForTick: async () => {
            while (!fired) {
                await sleep(interval)
            }
        }
    }
}
