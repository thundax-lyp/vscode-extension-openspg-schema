import {Location} from 'vscode-languageserver';
import {OnReferences} from '../context';
import {StructureNameDeclaration, traverse} from "openspg-schema-antlr4";
import {SchemaTextDocument} from "../common/text-document";


export const onReferences: OnReferences = (ctx) => async (params) => {
    const {textDocument, position} = params;
    const document = ctx.documents.get(textDocument.uri);
    if (!document || !document.ast) {
        return null;
    }

    const createSelector = document.createPositionSelector(position);
    const selectedPath = document.getPathAt<StructureNameDeclaration>(
        createSelector('StructureNameDeclaration'),
    )

    if (!selectedPath) {
        return null;
    }

    switch (selectedPath.node.type) {
        case 'StructureNameDeclaration':
            return handleStructureNameDeclaration(document, selectedPath.node.name.realName.text)
        default:
            return null
    }
};

const handleStructureNameDeclaration = (document: SchemaTextDocument, name: string) => {
    const locations: Location[] = []
    traverse(document.ast!, (path) => {
        if (path.node.type === 'StructureName' && path.node.realName.text === name) {
            const parts = path.path.split('.');
            if (parts.includes('BasicStructureTypeDeclaration') || parts.includes('InheritedStructureTypeDeclaration')) {
                const location = Location.create(document.uri, document.getNodeRange(path.node))
                locations.push(location);
            }
        }
    })
    return locations
}
