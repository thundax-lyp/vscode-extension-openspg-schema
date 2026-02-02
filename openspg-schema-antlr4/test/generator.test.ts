import {expect, test} from 'vitest';
import {generate, parse} from "../src";

test("generator", async () => {

    const sourceCode = `
Person(人物) ->  EntityType:
    desc :  description
    properties :
        Good(好) : ConceptType
`

    const expectedCode = `Person(人物)-> EntityType:
  desc: description
  properties:
    Good(好): ConceptType`

    const ast = parse(sourceCode);

    expect(await generate(ast.nodes[0])).toBe(expectedCode)
});
