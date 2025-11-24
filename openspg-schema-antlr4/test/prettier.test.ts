import {expect, test} from 'vitest';
import * as prettier from 'prettier/standalone';
import {parserName, plugin} from '../src';
import {load} from "./utils.test";

const format = async (code: string) =>
    prettier.format(code, {
        parser: parserName,
        plugins: [plugin],
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
