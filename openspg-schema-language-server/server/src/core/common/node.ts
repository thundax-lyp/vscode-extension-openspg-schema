import {SyntaxNode} from './parser';
import {BasicStructureTypeDeclaration, EntityDeclaration, InheritedStructureTypeDeclaration, NamespaceDeclaration, StructureName} from "openspg-schema-antlr4";
import {StructureNameDeclaration} from "openspg-schema-antlr4/dist/ast/expression/structure-name-declaration";
import {BaseNodeString} from "openspg-schema-antlr4/dist/ast/base";
import {BasicStructureDeclaration} from "openspg-schema-antlr4/dist/ast/expression";

// node-to-text
export const node2markdown = (node?: SyntaxNode | null): string => {
    if (!node) {
        return '';
    }

    switch (node.type) {
        case 'NamespaceDeclaration':
            return buildNamespaceDeclaration(node);
        case 'EntityDeclaration':
            return buildEntityDeclaration(node);
        case 'BasicStructureDeclaration':
            return buildBasicStructureDeclaration(node);
        case 'StructureNameDeclaration':
            return buildStructureName(node.name);
        case 'BasicStructureTypeDeclaration':
            return buildBasicStructureTypeDeclaration(node);
        case 'InheritedStructureTypeDeclaration':
            return buildInheritedStructureTypeDeclaration(node);
        default:
            return `${node.type} TODO`;
    }
};

const bold = (x: string) => `**${x}**`
const italic = (x: string) => `*${x}*`
const join = (separator: string, ...parts: string[]) => parts.join(separator)

const buildNamespaceDeclaration = (node: NamespaceDeclaration) => join(
    '\s',
    bold('namespace'),
    italic(node.variable.text),
);

const buildEntityDeclaration = (node: EntityDeclaration) => {
    const {children} = node;

    return [
        buildBasicStructureDeclaration(node.declaration)
    ].join('\n')
}

const buildBasicStructureDeclaration = (node: BasicStructureDeclaration) => join(
    '\s',
    node2markdown(node.name),
    italic(node.alias.text.trim()),
    node2markdown(node.structureType),
);

const buildStructureName = (node: StructureName) => [
    ...node.semanticNames.map(x => x.text.trim()), node.realName.text.trim()
].map(x => `*${x}*`).join('#');

const buildBasicStructureTypeDeclaration = (node: BasicStructureTypeDeclaration) =>
    node.variable instanceof BaseNodeString ? node.variable.text.trim() : ''

const buildInheritedStructureTypeDeclaration = (node: InheritedStructureTypeDeclaration) => {
    return node.variables.map(variable => {
        switch (variable.type) {
            case 'KnowledgeStructureType':
            case 'StandardStructureType':
                return `*${variable.text}*`;
            case 'StructureName':
                return buildStructureName(variable)
            default:
                return ''
        }
    }).join(',\s')
}
