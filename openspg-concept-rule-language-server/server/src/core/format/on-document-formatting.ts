import {Range, TextEdit} from 'vscode-languageserver';
import * as prettier from 'prettier/standalone';
import * as syntax from 'openspg-concept-rule-antlr4'
import {Context, OnDocumentFormatting} from '../context';
import {Options} from "prettier";

export const onDocumentFormatting: OnDocumentFormatting = ({connection, documents}: Context) => async ({textDocument, options}) => {
    const document = documents.get(textDocument.uri);
    if (!document) {
        return null;
    }

    const config = Object.assign({
            tabSize: 4,
            insertSpaces: true,
            singleQuote: false,
            bracketSpacing: true,
        },
        (await connection.workspace.getConfiguration('conceptRule.formatter')) as Partial<Options>,
        options
    )

    const source = document.getText();
    const range = Range.create(document.positionAt(0), document.positionAt(source.length));
    console.log('**' + JSON.stringify(options))
    const prettierOptions = {
        parser: 'openspg-concept-rule-prettier-parser',
        plugins: [{
            languages: syntax.languages,
            parsers: syntax.parsers,
            printers: syntax.printers,
        }],
        tabWidth: config.tabSize,
        bracketSpacing: config.bracketSpacing || true,
    };
    const formatted = await prettier.format(source, prettierOptions);
    return [TextEdit.replace(range, formatted)];
};
