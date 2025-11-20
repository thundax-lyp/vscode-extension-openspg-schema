import {expect, test} from 'vitest';
import {SyntaxToken, tokenizer} from '../src';
import {Position} from "../src/ast/base";


test('tokenizer', async () => {
    const tokens: SyntaxToken[] = tokenizer(`
namespace Sample

Person(人物): EntityType
    desc: "a greater than the name of a Person"
`);

    expect(tokens).toMatchObject([{
        type: 'NAMESPACE_KEY', text: 'namespace', range: [1, 9], position: Position.create(2, 0)
    }, {
        type: 'NAMESPACE_IDENTIFIER', text: 'Sample', range: [11, 16], position: Position.create(2, 10)
    }, {
        type: 'DEFINITION_IDENTIFIER', text: 'Person', range: [19, 24], position: Position.create(4, 0)
    }, {
        type: 'LPARENTH', text: '(', range: [25, 25], position: Position.create(4, 6)
    }, {
        type: 'DEFINITION_IDENTIFIER', text: '人物', range: [26, 27], position: Position.create(4, 7)
    }, {
        type: 'RPARENTH', text: ')', range: [28, 28], position: Position.create(4, 9)
    }, {
        type: 'COLON', text: ':', range: [29, 29], position: Position.create(4, 10)
    }, {
        type: 'ENTITY_TYPE_KEYWORD', text: 'EntityType', range: [31, 40], position: Position.create(4, 12)
    }, {
        type: 'INDENT_META', text: '    ', range: [42, 45], position: Position.create(5, 0)
    }, {
        type: 'DESC_KEYWORD', text: 'desc', range: [46, 49], position: Position.create(5, 4)
    }, {
        type: 'KV_COLON', text: ':', range: [50, 50], position: Position.create(5, 8)
    }, {
        type: 'KVV_STRING_LITERAL', text: '"a greater than the name of a Person"', range: [52, 88], position: Position.create(5, 10)
    }])
});
