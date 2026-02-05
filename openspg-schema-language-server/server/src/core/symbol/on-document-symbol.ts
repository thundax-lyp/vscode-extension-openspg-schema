import { DocumentSymbol, SymbolKind } from 'vscode-languageserver';
import * as syntax from 'openspg-schema-antlr4';
import { OnDocumentSymbol } from '../context';
import { generate } from '../common';

export const onDocumentSymbol: OnDocumentSymbol =
    (ctx) =>
    async ({ textDocument }) => {
        const document = ctx.documents.get(textDocument.uri);
        if (!document || !document.ast) {
            return null;
        }

        const handleNamespaceDeclaration = async (ast: syntax.NamespaceDeclaration): Promise<DocumentSymbol> => ({
            name: await generate(ast.variable),
            kind: SymbolKind.Namespace,
            range: document.getNodeRange(ast),
            selectionRange: document.getNodeRange(ast.variable)
        });

        const handleEntityDeclaration = async (ast: syntax.EntityDeclaration): Promise<DocumentSymbol> => ({
            name: await generate(ast.declaration.name),
            detail: await generate(ast.declaration.alias),
            kind: SymbolKind.Class,
            range: document.getNodeRange(ast),
            selectionRange: document.getNodeRange(ast.declaration.name),
            children: await Promise.all(ast.children.map((x) => handlePropertyDeclaration(x)))
        });

        const handlePropertyDeclaration = async (ast: syntax.PropertyDeclaration): Promise<DocumentSymbol> => ({
            name: await generate(ast.declaration.name),
            detail: ast.declaration.value ? await generate(ast.declaration.value) : undefined,
            kind: SymbolKind.Property,
            range: document.getNodeRange(ast),
            selectionRange: document.getNodeRange(ast.declaration.name),
            children: await Promise.all(ast.children.map((x) => handleEntityDeclaration(x)))
        });

        return (
            await Promise.all(
                document.ast.nodes.map((node) =>
                    (async () => {
                        switch (node.type) {
                            case 'NamespaceDeclaration':
                                return handleNamespaceDeclaration(node);
                            case 'EntityDeclaration':
                                return handleEntityDeclaration(node);
                        }
                    })()
                )
            )
        ).filter(Boolean) as DocumentSymbol[];
    };
