import {Range, TextEdit} from 'vscode-languageserver';
import * as prettier from 'prettier/standalone';
import * as ruleSyntax from 'openspg-concept-rule-antlr4'
import {Context, OnDocumentFormatting} from '../context';
import {Options} from "prettier";

export const onDocumentFormatting: OnDocumentFormatting = ({connection, documents}: Context) => async ({textDocument}) => {
    const document = documents.get(textDocument.uri);
    if (!document) {
        return null;
    }

    const config = (await connection.workspace.getConfiguration('conceptRule.formatter')) as Partial<Options>;
    const source = document.getText();
    const range = Range.create(document.positionAt(0), document.positionAt(source.length));

    const prettierOptions = {
        parser: 'openspg-concept-rule-prettier-parser',
        plugins: [{
            languages: ruleSyntax.languages,
            parsers: ruleSyntax.parsers,
            printers: ruleSyntax.printers,
        }],
        tabWidth: config?.tabWidth ?? 4,
        bracketSpacing: config?.bracketSpacing ?? true,
    };
    const formatted = await prettier.format(source, prettierOptions);
    return [TextEdit.replace(range, formatted)];
};
