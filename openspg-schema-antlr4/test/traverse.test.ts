import {test, expect} from 'vitest';
import * as parser from '../src/parser';
import * as traverse from '../src/traverse';


test("traverse", () => {
    const code = `
namespace Sample

Person(人物): EntityType
    desc: description
`
    const ast = parser.parse(code)

    const enterNames: string[] = [];

    traverse.visit(ast, {
        enter: ({ node }) => {
            enterNames.push(node.type);
        },
    });

    expect(enterNames).toEqual([
        'SourceUnit',
        'Namespace',
        'Entity',
        'BasicStructureDeclaration',
        'StructureName',
        'StructureRealName',
        'StructureAlias',
        'BasicStructureTypeDeclaration',
        'KnowledgeStructureType',
        'EntityMeta',
        'BasicPropertyDeclaration',
        'BuiltinPropertyName',
        'BasicPropertyValue',
    ]);
})
