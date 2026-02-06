import * as vscode from "vscode";
import * as assert from "assert";
import { getDocUri, activate, createTicker, editor } from "./helper";

suite("Document Formatting", () => {
    const fileName = "document-formatting.concept.rule";
    const docUri = getDocUri(fileName);

    const { fireTick, waitingForTick } = createTicker();

    test(`Open [${fileName}]`, async () => {
        await activate(docUri);
        fireTick();
    });

    test("Formatting document-formatting.concept.rule", async () => {
        await waitingForTick();
        const expectedText =
            "" +
            "namespace DocumentFormatting\n" +
            "\n" +
            "`TaxOfProdEvent`/`价格上涨`:\n" +
            "  rule: [[\n" +
            "    Define (e:ProductChainEvent)-[p:belongTo]->(o:`TaxOfProdEvent`/`价格上涨`) {\n" +
            "      Structure {}\n" +
            "\n" +
            "      Constraint {\n" +
            "        R1: e.index=='价格'\n" +
            "        R2: e.trend=='上涨'\n" +
            "      }\n" +
            "    }\n" +
            "  ]]\n" +
            "\n" +
            "`TaxOfProdEvent`/`价格上涨`:TaxOfCompanyEvent/`成本上涨`\n" +
            "  rule: [[\n" +
            "    Define (s:`TaxOfProdEvent`/`价格上涨`)-[p:leadTo]->(o:`TaxOfCompanyEvent`/`成本上涨`) {\n" +
            "      Structure {\n" +
            "        (s)-[:subject]->(prod:Product)-[:hasSupplyChain]->(down:Product)<-[:product]-(c:Company)\n" +
            "      }\n" +
            "\n" +
            "      Constraint {\n" +
            '        eventName = concat(c.name,"成本上升事件")\n' +
            "      }\n" +
            "\n" +
            "      Action {\n" +
            "        downEvent = createNodeInstance(\n" +
            "          type = CompanyEvent,\n" +
            "          value = {\n" +
            "            subject = c.id\n" +
            "            name = eventName\n" +
            '            trend = "上涨"\n' +
            '            index = "成本"\n' +
            "          }\n" +
            "        )\n" +
            "        createEdgeInstance(\n" +
            "          src = s,\n" +
            "          dst = downEvent,\n" +
            "          type = leadTo,\n" +
            "          value = {}\n" +
            "        )\n" +
            "      }\n" +
            "    }\n" +
            "  ]]\n" +
            "";
        await testDocumentFormatting(docUri, expectedText);
    });
});

async function testDocumentFormatting(docUri: vscode.Uri, expectedText: string) {
    const options: vscode.FormattingOptions = {
        tabSize: 2,
        insertSpaces: true,
        singleQuote: false
    };

    const actualTextEdits = await vscode.commands.executeCommand<vscode.TextEdit[]>(
        "vscode.executeFormatDocumentProvider",
        docUri,
        options
    );

    await editor.edit((editBuilder) => (actualTextEdits || []).forEach((x) => editBuilder.replace(x.range, x.newText)));
    const actualText = editor.document.getText();

    assert.equal(actualText, expectedText);
}
