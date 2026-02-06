import { test, expect } from "vitest";
import * as parser from "../src/parser";
import * as traverse from "../src/traverse";

test("traverse", () => {
    const code = `
namespace Sample

Person(人物): EntityType
    desc: description
`;
    const ast = parser.parse(code);

    const enterNames: string[] = [];

    traverse.visit(ast, {
        enter: ({ node }) => {
            enterNames.push(node.type);
        }
    });

    expect(enterNames).toEqual([
        "SourceUnit",
        "NamespaceDeclaration",
        "NamespaceVariable",
        "EntityDeclaration",
        "BasicStructureDeclaration",
        "StructureNameExpression",
        "StructureName",
        "StructureRealName",
        "StructureAliasExpression",
        "StructureAlias",
        "BasicStructureTypeExpression",
        "KnowledgeStructureType",
        "PropertyDeclaration",
        "BasicPropertyDeclaration",
        "PropertyNameExpression",
        "BuiltinPropertyName",
        "PropertyValueExpression",
        "BasicPropertyValue"
    ]);
});
