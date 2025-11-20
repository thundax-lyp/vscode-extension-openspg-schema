import {expect, test} from 'vitest';
import * as prettier from 'prettier/standalone';
import {parserName, plugin} from '../src';

const format = async (code: string) =>
    prettier.format(code, {
        parser: parserName,
        plugins: [plugin],
        tabWidth: 4,
        bracketSpacing: true,
    });

test('comment', async () => {
    const sourceCode = `
/*
 *top comment
 */
#  top line comment
namespace Sample /*****line block comment ******/

  /* 2nd block comment */

  # 2nd line comment

Person(人物): EntityType  # 2nd tail comment

    /*  3rd block comment  */

    ##  3rd line comment

    desc: description     #  3rd tail comment

/*** 4th block comment ***/

#  4th line comment

    desc2: description2   #   4th tail comment
`

    const formattedCode = `/**
 * top comment
 */
# top line comment
namespace Sample /* line block comment */

/* 2nd block comment */

# 2nd line comment

Person(人物): EntityType # 2nd tail comment
/* 3rd block comment */

    # 3rd line comment

    desc: description # 3rd tail comment
    /* 4th block comment */

    # 4th line comment

    desc2: description2 # 4th tail comment`

    expect(await format(sourceCode)).toBe(formattedCode)
});

