import {expect, test} from 'vitest';
import {createParse} from '../utils.test';

test('sourceUnit', () => {
    expect(createParse((parser) => parser.sourceUnit())(`// SPDX-License-Identifier: MIT`)).toMatchObject({
        type: 'SourceUnit',
    });
});
