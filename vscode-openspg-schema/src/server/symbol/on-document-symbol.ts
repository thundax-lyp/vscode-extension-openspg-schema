import {DocumentSymbol, SymbolKind} from 'vscode-languageserver';
import {OnDocumentSymbol} from '../context';
import {NamespaceDeclaration, EntityDeclaration} from '../common/parser';
import {BasicPropertyDeclaration, BasicStructureDeclaration, EntityMetaDeclaration, PropertyDeclaration} from "openspg-schema-antlr4";

export const onDocumentSymbol: OnDocumentSymbol = (ctx) => async ({textDocument}) => {
    const document = ctx.documents.get(textDocument.uri);
    if (!document || !document.ast) {
        return null;
    }

    const renderBasicStructureDeclaration = (declaration: BasicStructureDeclaration) => {
        return [...declaration.name.variable.semanticNames, declaration.name.variable.realName]
            .map(x => x.text)
            .join('#')
    }

    const renderBasicPropertyDeclaration = (declaration: BasicPropertyDeclaration) => {
        return declaration.name.variable.text
    }

    const handleNamespaceDeclaration = (ast: NamespaceDeclaration): DocumentSymbol => ({
        name: ast.variable.text,
        kind: SymbolKind.Namespace,
        range: document.getNodeRange(ast),
        selectionRange: document.getNodeRange(ast.variable),
    })

    const handleEntityDeclaration = (ast: EntityDeclaration): DocumentSymbol => ({
        name: renderBasicStructureDeclaration(ast.declaration),
        kind: SymbolKind.Class,
        range: document.getNodeRange(ast),
        selectionRange: document.getNodeRange(ast.declaration.name),
        children: ast.children.map(x => handleEntityMetaDeclaration(x)),
    })

    const handleEntityMetaDeclaration = (ast: EntityMetaDeclaration): DocumentSymbol => ({
        name: renderBasicPropertyDeclaration(ast.declaration),
        kind: SymbolKind.Variable,
        range: document.getNodeRange(ast),
        selectionRange: document.getNodeRange(ast.declaration.name.variable),
        children: ast.children.map(x => handlePropertyDeclaration(x)),
    })

    const handlePropertyDeclaration = (ast: PropertyDeclaration): DocumentSymbol => ({
        name: renderBasicStructureDeclaration(ast.declaration),
        kind: SymbolKind.Property,
        range: document.getNodeRange(ast),
        selectionRange: document.getNodeRange(ast.declaration.name),
    })

    return document.ast.nodes.map(node => {
        switch (node.type) {
            case 'NamespaceDeclaration':
                return handleNamespaceDeclaration(node);
            case 'EntityDeclaration':
                return handleEntityDeclaration(node);
            default:
                return null;
        }
    }).filter(Boolean) as DocumentSymbol[];
}
