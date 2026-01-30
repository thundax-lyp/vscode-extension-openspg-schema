import * as vscode from 'vscode';
import * as assert from 'assert';
import {getDocUri, activate, createTicker} from './helper';
import {getLanguageClient} from "../extension";

suite('AST', () => {
    const fileName = 'ast.schema';
    const docUri = getDocUri(fileName);

    const {fireTick, waitingForTick} = createTicker()

    test(`Open [${fileName}]`, async () => {
        await activate(docUri);
        fireTick()
    });

    test(`Find All`, async () => {
        await waitingForTick()
        await testAST(docUri, [{
            "type": "NamespaceDeclaration",
            "location": "1-1",
        }, {
            "type": "EntityDeclaration",
            "location": "3-10",
            "children": [{
                "type": "PropertyDeclaration",
                "location": "4-4",
            }, {
                "type": "PropertyDeclaration",
                "location": "5-10",
                "children": [{
                    "type": "EntityDeclaration",
                    "location": "6-10",
                    "children": [{
                        "type": "PropertyDeclaration",
                        "location": "7-7",
                    }]
                }]
            }]
        }, {
            "type": "EntityDeclaration",
            "location": "10-13",
            "children": [{
                "type": "PropertyDeclaration",
                "location": "11-13",
                "children": [{
                    "type": "EntityDeclaration",
                    "location": "12-12"
                }]
            }]
        }]);
    });

});

const render = (response: Object) => {
    const replacer = (key: string, value: any) => {
        if (key === 'location' && typeof value !== 'string') {
            return `${value.start.line}-${value.end.line}`;
        } else if (key === 'range' || key === 'keywords' || key === 'variable' || key === 'declaration') {
            return undefined;
        } else if (Array.isArray(value) && value.length === 0) {
            return undefined;
        }
        return value;
    }
    return JSON.stringify(response, replacer, 4)
}

const testAST = async (docUri: vscode.Uri, expectedResponse: Object) => {
    const client = getLanguageClient();
    const actualResponse: Object = await client.sendRequest("openspg-schema/ast", {
        textDocument: {
            uri: docUri.toString()
        }
    })

    assert.equal(render(actualResponse), render(expectedResponse))
}
