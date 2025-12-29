import {Location} from 'vscode-languageserver';
import {StructureName, TraversePath} from "openspg-schema-antlr4";
import {OnDefinition} from '../context';
import {SchemaTextDocument} from "../common";


export const onDefinition: OnDefinition = (ctx) => async (params) => {
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
    if (!selectedParts.includes('BasicStructureTypeExpression')) {
        return null;
    }

    return document.ast?.nodes
        .filter(node => node.type === 'EntityDeclaration')
        .filter(node => node.declaration.name.variable.realName.text === selectedPath.node.realName.text)
        .map(node => {
            return Location.create(document.uri, document.getNodeRange(node.declaration.name))
        })
}
