import { Location } from 'vscode-languageserver';
import * as syntax from 'openspg-schema-antlr4';
import { OnReferences } from '../context';
import { SchemaTextDocument } from '../common';

export const onReferences: OnReferences = (ctx) => async (params) => {
    const { textDocument, position } = params;
    const document = ctx.documents.get(textDocument.uri);
    if (!document || !(await document.isReady())) {
        return null;
    }

    const createSelector = document.createPositionSelector(position);
    const selectedPath = document.getPathAt<syntax.StructureNameExpression>(createSelector('StructureNameExpression'));
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
    syntax.traverse(document.ast!, (path) => {
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
