import {DocumentSymbol, SymbolKind} from 'vscode-languageserver';
import {OnDocumentSymbol} from '../context';
import {ConceptRuleDeclaration, generate, NamespaceDeclaration, RuleWrapperDeclaration} from '../common/parser';

export const onDocumentSymbol: OnDocumentSymbol = (ctx) => async ({textDocument}) => {
    const document = ctx.documents.get(textDocument.uri);
    if (!document || !document.ast) {
        return null;
    }

    const handleNamespaceDeclaration = async (ast: NamespaceDeclaration): Promise<DocumentSymbol> => ({
        name: await generate(ast.variable),
        kind: SymbolKind.Namespace,
        range: document.getNodeRange(ast),
        selectionRange: document.getNodeRange(ast.variable),
    })

    const handleRuleWrapperDeclaration = async (ast: RuleWrapperDeclaration): Promise<DocumentSymbol> => ({
        name: await generate(ast.head),
        kind: SymbolKind.Class,
        range: document.getNodeRange(ast),
        selectionRange: document.getNodeRange(ast.head),
        children: await Promise.all(
            ast.rules
                .flatMap(x => x.conceptRules)
                .map(x => handleConceptRuleDeclaration(x))
        )
    })

    const handleConceptRuleDeclaration = async (ast: ConceptRuleDeclaration): Promise<DocumentSymbol> => ({
        name: await generate(ast.head),
        kind: SymbolKind.Variable,
        range: document.getNodeRange(ast),
        selectionRange: document.getNodeRange(ast.head),
    })

    return (await Promise.all(
        document.ast.nodes.map(node => (async () => {
            switch (node.type) {
                case 'NamespaceDeclaration':
                    return await handleNamespaceDeclaration(node);
                case 'RuleWrapperDeclaration':
                    return await handleRuleWrapperDeclaration(node);
                case 'ConceptRuleDeclaration':
                    return await handleConceptRuleDeclaration(node);
                default:
                    return null;
            }
        })())
    )).filter(Boolean) as DocumentSymbol[];
}
