import {Hover, MarkupKind} from 'vscode-languageserver';
import {OnHover} from '../context';
import {
    BasicStructureDeclaration,
    BasicStructureType,
    BasicStructureTypeDeclaration,
    EntityDeclaration,
    InheritedStructureTypeDeclaration,
    KnowledgeStructureType,
    StandardStructureType,
    StructureName,
    TraversePath
} from "openspg-schema-antlr4";
import {SchemaTextDocument} from "../common/text-document";
import {format, PrintFunc} from "../common/format";

export const onHover: OnHover = (ctx) => async (params) => {
    const {textDocument, position} = params;

    const document = ctx.documents.get(textDocument.uri);
    if (!document || !document.ast) {
        return null;
    }

    const createSelector = document.createPositionSelector(position);
    const selectedPath = document.getPathAt<StructureName>(
        createSelector('StructureName')
    )
    if (!selectedPath) {
        return null;
    }

    switch (selectedPath.node.type) {
        case 'StructureName':
            return handleStructureName(document, selectedPath)
        default:
            return null
    }
};

const handleStructureName = (document: SchemaTextDocument, selectedPath: TraversePath<StructureName>) => {
    const selectedParts = selectedPath.path.split('.');
    if (!selectedParts.includes('BasicStructureTypeDeclaration') && !selectedParts.includes('InheritedStructureTypeDeclaration')) {
        return null;
    }

    const targetNode = document.ast?.nodes
        .filter(node => node.type === 'EntityDeclaration')
        .find(node => node.declaration.name.name.realName.text === selectedPath.node.realName.text);
    if (!targetNode) {
        return null;
    }

    const content = format(targetNode, new Printer())
    return {
        range: document.getNodeRange(targetNode),
        contents: {
            kind: MarkupKind.Markdown,
            value: content
        }
    } as Hover
}

class Printer implements Record<string, PrintFunc<any>> {
    [x: string]: PrintFunc<any>;

    bold = (x: string) => `**${x}**`
    italic = (x: string) => `*${x}*`

    printEntityDeclaration: PrintFunc<EntityDeclaration> = (node) => {
        const title = format(node.declaration, this)
        const properties = (node.children.filter(x => x.declaration.name.text === 'properties')?.[0]?.children || [])
            .map(x => format(x.declaration, this))
            .map(x => `- ${x}`)

        if (properties.length === 0) {
            return title;
        }
        return [
            title + '\n',
            ...properties
        ].join('\n')
    }

    printBasicStructureDeclaration: PrintFunc<BasicStructureDeclaration> = (node) => [
        format(node.name.name, this),
        this.italic(node.alias.text),
        format(node.structureType, this),
    ].join(' ')

    printStructureName: PrintFunc<StructureName> = (node) => [
        ...node.semanticNames.map(x => x.text),
        node.realName.text
    ].map(x => this.bold(x)).join('#')

    printBasicStructureTypeDeclaration: PrintFunc<BasicStructureTypeDeclaration> = (node) => this.italic(format(node.variable, this));

    printKnowledgeStructureType: PrintFunc<KnowledgeStructureType> = (node) => this.bold(node.text);

    printBasicStructureType: PrintFunc<BasicStructureType> = (node) => this.bold(node.text);

    printStandardStructureType: PrintFunc<StandardStructureType> = (node) => this.bold(node.text);

    printInheritedStructureTypeDeclaration: PrintFunc<InheritedStructureTypeDeclaration> = (node) => node.variables.map(x => this.italic(format(x, this))).join(',');

}
