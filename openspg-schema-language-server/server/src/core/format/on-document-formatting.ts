import {Range, TextEdit} from 'vscode-languageserver';
import * as prettier from 'prettier/standalone';
import * as doc from 'prettier/doc';
import {type Printer} from "prettier";
import * as syntax from 'openspg-schema-antlr4'
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
        (await connection.workspace.getConfiguration('schema.formatter')) as Partial<Options>,
        options
    )

    const source = document.getText();
    const range = Range.create(document.positionAt(0), document.positionAt(source.length));

    const printers: Record<string, Printer<any>> = {
        ...syntax.printers,
        [syntax.printerName]: {
            ...syntax.printers[syntax.printerName],
            embed: (path) => {
                const {node} = path;
                if (node.type === 'BlockContent') {
                    const content: string = node.text.trim();
                    return async () => doc.builders.join(doc.builders.hardline, [
                        '// prefix',
                        ...content.split('\n').map(x => x.trim()),
                        '// suffix'
                    ])
                }
                return null;
            }
        },
    };

    const prettierOptions = {
        parser: 'openspg-schema-prettier-parser',
        plugins: [{
            languages: syntax.languages,
            parsers: syntax.parsers,
            printers,
        }],
        tabWidth: config.tabSize,
        bracketSpacing: config.bracketSpacing,
    };
    const formatted = await prettier.format(source, prettierOptions);
    return [TextEdit.replace(range, formatted)];
};
