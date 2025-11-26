import {DocumentSymbol, SymbolKind} from 'vscode-languageserver';
import {OnDocumentSymbol} from '../context';
import {NamespaceDeclaration, EntityDeclaration} from '../common/parser';

export const onDocumentSymbol: OnDocumentSymbol = (ctx) => async ({textDocument}) => {
    const document = ctx.documents.get(textDocument.uri);
    if (!document || !document.ast) {
        return null;
    }

    const createNamespaceDeclarationSymbol = (ast: NamespaceDeclaration): DocumentSymbol | null => {
        const range = document.getNodeRange(ast);
        return {
            name: ast.variable.text,
            kind: SymbolKind.Module,
            range,
            selectionRange: range,
        };
    };

    const createEntityDeclarationSymbol = (ast: EntityDeclaration): DocumentSymbol | null => {
        const range = document.getNodeRange(ast);
        return {
            name: [...ast.declaration.name.variable.semanticNames, ast.declaration.name.variable.realName].map(x => x.text).join('#'),
            kind: SymbolKind.Class,
            range,
            selectionRange: range,
        };
    };

    return document.ast.nodes
        .map((sourceUnitNode) => {
            switch (sourceUnitNode.type) {
                case 'NamespaceDeclaration':
                    return createNamespaceDeclarationSymbol(sourceUnitNode);
                case 'EntityDeclaration':
                    return createEntityDeclarationSymbol(sourceUnitNode);
                default:
                    return null;
            }
        })
        .filter(Boolean) as DocumentSymbol[];
}
