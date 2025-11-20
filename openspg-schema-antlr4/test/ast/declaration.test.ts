import {expect, test} from 'vitest';
import {createParse} from "../utils.test";

test('namespace', () => {
    expect(createParse((parser) => parser.namespaceDeclaration())(`namespace Sample`)).toMatchObject({
        type: 'NamespaceDeclaration', variable: 'Sample'
    });

    expect(createParse((parser) => parser.namespaceDeclaration())(`namespace 'Sample'`)).toMatchObject({
        type: 'NamespaceDeclaration', variable: '\'Sample\''
    });

    expect(createParse((parser) => parser.namespaceDeclaration())(`namespace "Sample"`)).toMatchObject({
        type: 'NamespaceDeclaration', variable: '"Sample"'
    });

    expect(createParse((parser) => parser.namespaceDeclaration())(`namespace \`Sample\``)).toMatchObject({
        type: 'NamespaceDeclaration', variable: '`Sample`'
    });
});

test('entity - basic', () => {
    expect(createParse((parser) => parser.entityDeclaration())(`Person(人物): EntityType`)).toMatchObject({
        type: 'EntityDeclaration', declaration: {
            name: {
                realName: 'Person'
            },
            alias: '人物',
            structureType: {
                type: 'BasicStructureTypeDeclaration', variable: 'EntityType',
            }
        }
    });
})

test('entity - alias', () => {
    expect(createParse((parser) => parser.entityDeclaration())(`Person('alias literal'): EntityType`)).toMatchObject({
        type: 'EntityDeclaration', declaration: {
            name: {
                realName: 'Person'
            },
            alias: '\'alias literal\'',
            structureType: {
                type: 'BasicStructureTypeDeclaration', variable: 'EntityType',
            }
        }
    });

    expect(createParse((parser) => parser.entityDeclaration())(`Person(alias  with  double  blank): EntityType`)).toMatchObject({
        type: 'EntityDeclaration', declaration: {
            name: {
                realName: 'Person'
            },
            alias: 'alias with double blank',
            structureType: {
                type: 'BasicStructureTypeDeclaration', variable: 'EntityType',
            }
        }
    });

})

test('entity - inherited', () => {
    expect(createParse((parser) => parser.entityDeclaration())(`Person(人物) -> PersonType, LeaderType:`)).toMatchObject({
        type: 'EntityDeclaration', declaration: {
            name: {
                realName: 'Person'
            },
            alias: '人物',
            structureType: {
                type: 'InheritedStructureTypeDeclaration', variables: [{
                    type: 'StructureName', realName: 'PersonType'
                }, {
                    type: 'StructureName', realName: 'LeaderType'
                }]
            }
        }

    });

});


test('entityMeta', () => {
    expect(createParse((parser) => parser.entityDeclaration())(`
Person('人物'): EntityType
    desc: description
    `)).toMatchObject({
        type: 'EntityDeclaration', children: [{
            type: 'EntityMetaDeclaration', declaration: {
                name: 'desc', value: 'description',
            }
        }]
    });

    expect(createParse((parser) => parser.entityDeclaration())(`
Person('人物'): EntityType
    desc: description  with  blank
    `)).toMatchObject({
        type: 'EntityDeclaration', children: [{
            type: 'EntityMetaDeclaration', declaration: {
                name: 'desc', value: 'description with blank',
            }
        }]
    });

    expect(createParse((parser) => parser.entityDeclaration())(`
Person('人物'): EntityType
    desc: [[  good  ]]
    `)).toMatchObject({
        type: 'EntityDeclaration', children: [{
            type: 'EntityMetaDeclaration', declaration: {
                name: 'desc', value: '[[  good  ]]',
            }
        }]
    });
})
