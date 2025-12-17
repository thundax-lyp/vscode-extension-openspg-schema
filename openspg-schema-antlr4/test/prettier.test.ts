import {expect, test} from 'vitest';
import * as prettier from 'prettier/standalone';
import * as doc from 'prettier/doc';
import {type Printer} from "prettier";
import {parserName, plugin} from '../src';
import {load} from "./utils.test";
import {PrettierPrinter} from "../src/prettier/printer";

const printers: Record<string, Printer<any>> = {
    [PrettierPrinter.NAME]: {
        ...new PrettierPrinter(),
        embed: (path) => {
            const {node} = path;
            if (node.type === 'BlockPropertyValue') {
                return async () => {
                    const groupId = Symbol('block');
                    const line = doc.builders.hardline;

                    const plain = ['// prefix', node.text.substring(2, node.text.length - 2), '// suffix']
                    const content = doc.builders.indentIfBreak(plain, {groupId});

                    return doc.builders.group(['[[', line, content, line, ']]'], {id: groupId})
                }
            }
            return null;
        }
    },
};

const format = async (code: string) =>
    prettier.format(code, {
        parser: parserName,
        plugins: [{
            ...plugin,
            printers: printers
        }],
        tabWidth: 4,
        bracketSpacing: true,
    });

test('comment', async () => {
    const testFileName = `prettier.comment.schema`
    const expectedFileName = `${testFileName}.expected`
    expect(await format(load(testFileName))).toBe(load(expectedFileName))
});

test('no comment', async () => {
    const testFileName = `prettier.no-comment.schema`
    const expectedFileName = `${testFileName}.expected`
    expect(await format(load(testFileName))).toBe(load(expectedFileName))
})

test('embedded', async () => {
    const testFileName = `prettier.embedded.schema`
    const expectedFileName = `${testFileName}.expected`
    expect(await format(load(testFileName))).toBe(load(expectedFileName))
})
