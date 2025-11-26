import {Range, TextEdit} from 'vscode-languageserver';
import * as prettier from 'prettier/standalone';
import * as schemaSyntax from 'openspg-schema-antlr4'
import {Context, OnDocumentFormatting} from '../context';
import {Options} from "prettier";

export const onDocumentFormatting = ({connection, documents}: Context): OnDocumentFormatting => async ({textDocument}) => {
    const document = documents.get(textDocument.uri);
    if (!document) {
        return null;
    }

    const config = (await connection.workspace.getConfiguration('schema.formatter')) as Partial<Options>;

    const source = document.getText();
    const range = Range.create(document.positionAt(0), document.positionAt(source.length));

    const prettierOptions = {
        parser: 'openspg-schema-parser',
        plugins: [{
            languages: schemaSyntax.languages,
            parsers: schemaSyntax.parsers,
            printers: schemaSyntax.printers,
        }],
        tabWidth: config?.tabWidth ?? 4,
        bracketSpacing: config?.bracketSpacing ?? true,
    };
    const formatted = await prettier.format(source, prettierOptions);
    return [TextEdit.replace(range, formatted)];
};
