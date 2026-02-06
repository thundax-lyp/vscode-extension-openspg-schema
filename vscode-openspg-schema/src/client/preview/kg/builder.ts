import * as syntax from "openspg-schema-antlr4";
import { v4 as generateUuid } from "uuid";
import { KGEntity, KGNamespace, KGProperty } from "./types";

export type GetText = (n: syntax.SyntaxNode) => string;

export const parseNamespace = (node: syntax.NamespaceDeclaration) => {
    return new KGNamespace(node.variable.text);
};

export const parseEntity = (node: syntax.EntityDeclaration, getText?: GetText) => {
    const { declaration, children } = node;
    const { structureType } = declaration;

    const id = generateUuid();

    const name = [...declaration.name.variable.semanticNames, declaration.name.variable.realName]
        .map((x) => x.text)
        .join("#");

    const aliasName = declaration.alias.variable.text;

    const types = (
        structureType.type === "BasicStructureTypeExpression" ? [structureType.variable] : structureType.variables
    ).map((x) => getText?.(x) ?? "Unknown");

    const properties = children.map((x) => parseProperty(x, getText));

    return new KGEntity(id, name, aliasName, types, properties);
};

export const parseProperty = (node: syntax.PropertyDeclaration, getText?: GetText): KGProperty => {
    const { declaration, children } = node;
    const name = declaration.name.variable.text;
    const value = declaration.value ? getText?.(declaration.value) : undefined;

    return {
        name,
        value,
        children: children.map((x) => parseEntity(x, getText))
    };
};
