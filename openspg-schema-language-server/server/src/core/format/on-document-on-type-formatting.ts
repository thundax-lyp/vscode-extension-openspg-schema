import { Range, TextEdit } from "vscode-languageserver";
import * as prettier from "prettier/standalone";
import * as syntax from "openspg-schema-antlr4";
import { Context, OnDocumentOnTypeFormatting } from "../context";
import { Options } from "prettier";

export const onDocumentOnTypeFormatting: OnDocumentOnTypeFormatting =
    ({ connection, documents }: Context) =>
    async ({ textDocument }) => {
        const document = documents.get(textDocument.uri);
        if (!document) {
            return null;
        }

        const config = (await connection.workspace.getConfiguration("schema.formatter")) as Partial<Options>;

        const source = document.getText();
        const range = Range.create(document.positionAt(0), document.positionAt(source.length));

        const prettierOptions = {
            parser: "openspg-schema-parser",
            plugins: [
                {
                    languages: syntax.languages,
                    parsers: syntax.parsers,
                    printers: syntax.printers
                }
            ],
            tabWidth: config?.tabWidth ?? 4,
            bracketSpacing: config?.bracketSpacing ?? true
        };
        const formatted = await prettier.format(source, prettierOptions);
        return [TextEdit.replace(range, formatted)];
    };
