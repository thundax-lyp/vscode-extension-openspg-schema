import {DocumentSymbol, SymbolKind} from 'vscode-languageserver';
import {OnDocumentSymbol} from '../context';
import {NamespaceDeclaration, EntityDeclaration} from '../common/parser';

export const onDocumentSymbol: OnDocumentSymbol = (ctx) => async ({textDocument}) => {
    const document = ctx.documents.get(textDocument.uri);
    if (!document || !document.ast) {
        return null;
    }

    const handleNamespaceDeclaration = (ast: NamespaceDeclaration): DocumentSymbol | null => {
        const range = document.getNodeRange(ast);
        return {
            name: ast.variable.text,
            kind: SymbolKind.Namespace,
            range,
            selectionRange: range,
        };
    };

    const handleEntityDeclaration = (ast: EntityDeclaration): DocumentSymbol | null => {
        const range = document.getNodeRange(ast);
        return {
            name: [...ast.declaration.name.variable.semanticNames, ast.declaration.name.variable.realName].map(x => x.text).join('#'),
            kind: SymbolKind.Class,
            range,
            selectionRange: range,
        };
    };

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
