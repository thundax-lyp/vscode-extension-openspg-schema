import { expect, test } from "vitest";
import { createParse } from "../utils.test";

test("basic structure declaration", () => {
    expect(createParse((parser) => parser.basicStructureDeclaration())("Person(人物): EntityType")).toMatchObject({
        type: "BasicStructureDeclaration",
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
    });
});

test("inherited structure declaration", () => {
    expect(
        createParse((parser) => parser.basicStructureDeclaration())("Person(人物) -> EntityType, SomeTime:")
    ).toMatchObject({
        type: "BasicStructureDeclaration",
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
            type: "InheritedStructureTypeExpression",
            variables: [
                "EntityType",
                {
                    type: "StructureName",
                    realName: "SomeTime"
                }
            ]
        }
    });
});

test("basic property declaration", () => {
    expect(createParse((parser) => parser.basicPropertyDeclaration())("desc: text")).toMatchObject({
        type: "BasicPropertyDeclaration",
        name: {
            type: "PropertyNameExpression",
            variable: "desc"
        },
        value: {
            type: "PropertyValueExpression"
        }
    });
});
