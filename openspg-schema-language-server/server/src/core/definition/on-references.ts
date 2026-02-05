import { Location } from 'vscode-languageserver';
import { OnReferences } from '../context';
import { StructureNameExpression, traverse } from 'openspg-schema-antlr4';
import { SchemaTextDocument } from '../common';

export const onReferences: OnReferences = (ctx) => async (params) => {
    const { textDocument, position } = params;
    const document = ctx.documents.get(textDocument.uri);
    if (!document) {
        return null;
    }
    await document.promiseReady;
    if (!document.ast) {
        return null;
    }

    const createSelector = document.createPositionSelector(position);
    const selectedPath = document.getPathAt<StructureNameExpression>(createSelector('StructureNameExpression'));
    if (!selectedPath) {
        return null;
    }

    switch (selectedPath.node.type) {
        case 'StructureNameExpression':
            return handleStructureNameExpression(document, selectedPath.node.variable.realName.text);
        default:
            return null;
    }
};

const handleStructureNameExpression = (document: SchemaTextDocument, name: string) => {
    const locations: Location[] = [];
    traverse(document.ast!, (path) => {
        if (path.node.type === 'StructureName' && path.node.realName.text === name) {
            const parts = path.path.split('.');
            if (parts.includes('BasicStructureTypeExpression') || parts.includes('InheritedStructureTypeExpression')) {
                const location = Location.create(document.uri, document.getNodeRange(path.node));
                locations.push(location);
            }
        }
    });
    return locations;
};
