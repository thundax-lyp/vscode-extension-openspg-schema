import { expect, test } from "vitest";
import { createParse } from "../utils.test";

test("meta", () => {
    expect(
        createParse((parser) => parser.sourceUnit())(`
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
    `)
    ).toMatchObject({
        type: "SourceUnit",
        nodes: [
            {
                type: "NamespaceDeclaration",
                variable: "Sample"
            },
            {
                type: "EntityDeclaration",
                declaration: {
                    name: {
                        type: "StructureNameExpression",
                        variable: {
                            realName: "Person"
                        }
                    },
                    alias: {
                        type: "StructureAliasExpression",
                        variable: "人物"
                    },
                    structureType: {
                        type: "BasicStructureTypeExpression",
                        variable: "EntityType"
                    }
                },
                children: [
                    {
                        type: "PropertyDeclaration",
                        declaration: {
                            name: {
                                variable: "desc"
                            },
                            value: {
                                variable: "description"
                            }
                        }
                    },
                    {
                        type: "PropertyDeclaration",
                        declaration: {
                            name: {
                                variable: "desc2"
                            },
                            value: {
                                variable: "description2"
                            }
                        }
                    }
                ]
            }
        ]
    });
});
