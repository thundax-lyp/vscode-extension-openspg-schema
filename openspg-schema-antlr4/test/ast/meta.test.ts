import {expect, test} from 'vitest';
import {createParse} from "../utils.test";


test('comment', () => {
    expect(createParse((parser) => parser.sourceUnit())(`
/**
 * top comment
 */
# top line comment
namespace Sample /**line block comment**/

/* 2nd block comment */
# 2nd line comment
\t
Person(人物): EntityType # 2nd tail comment
    /* 3rd block comment */
    # 3rd block comment
    desc: description # 3rd tail comment
\t
/* 4th block comment */
# 4th block comment
    desc2: description2 # 4th tail comment
    `)).toMatchObject({
        type: 'SourceUnit', nodes: [{
            type: 'NamespaceDeclaration', variable: 'Sample',
        }, {
            type: 'EntityDeclaration', declaration: {
                name: {
                    realName: 'Person'
                },
                alias: '人物',
                structureType: {
                    type: 'BasicStructureTypeDeclaration', variable: 'EntityType',
                }
            },
            children: [{
                type: 'EntityMetaDeclaration', declaration: {
                    name: 'desc', value: 'description',
                }
            }, {
                type: 'EntityMetaDeclaration', declaration: {
                    name: 'desc2', value: 'description2',
                }
            }]
        }],
    });
})
