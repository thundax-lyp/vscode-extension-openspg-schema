import {expect, test} from 'vitest';
import * as prettier from 'prettier/standalone';
import {parserName, plugin} from '../src';
import {load} from "./utils.test";

const format = async (code: string) =>
    prettier.format(code, {
        parser: parserName,
        plugins: [plugin],
        tabWidth: 4,
        bracketSpacing: false,
    });

test('comment', async () => {
    expect(await format(load('comment.concept.rule'))).toMatchSnapshot();
});
