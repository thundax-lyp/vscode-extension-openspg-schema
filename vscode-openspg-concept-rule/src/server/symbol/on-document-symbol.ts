import {DocumentSymbol, SymbolKind} from 'vscode-languageserver';
import * as ruleSyntax from "openspg-concept-rule-antlr4";
import {OnDocumentSymbol} from '../context';
import {generate} from "../common/generate";

export const onDocumentSymbol: OnDocumentSymbol = (ctx) => async ({textDocument}) => {
    const document = ctx.documents.get(textDocument.uri);
    if (!document || !document.ast) {
        return null;
    }

    const handleNamespaceDeclaration = async (ast: ruleSyntax.NamespaceDeclaration): Promise<DocumentSymbol> => ({
        name: await generate(ast.variable),
        kind: SymbolKind.Namespace,
        range: document.getNodeRange(ast),
        selectionRange: document.getNodeRange(ast.variable),
    })

    const handleRuleWrapperDeclaration = async (ast: ruleSyntax.RuleWrapperDeclaration): Promise<DocumentSymbol> => ({
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

    const handleConceptRuleDeclaration = async (ast: ruleSyntax.ConceptRuleDeclaration): Promise<DocumentSymbol> => ({
        name: await generate(ast.head),
        kind: SymbolKind.Struct,
        range: document.getNodeRange(ast),
        selectionRange: document.getNodeRange(ast.head),
        children: [
            await handleTheGraphStructureDeclaration(ast.theGraph),
            ast.theRule ? await handleTheRuleDeclaration(ast.theRule) : null,
            ast.theAction ? await handleTheActionDeclaration(ast.theAction) : null,
        ].filter(Boolean) as DocumentSymbol[]
    })

    const handleTheGraphStructureDeclaration = async (ast: ruleSyntax.TheGraphStructureDeclaration): Promise<DocumentSymbol> => ({
        name: await generate(ast.head),
        kind: SymbolKind.Function,
        range: document.getNodeRange(ast),
        selectionRange: document.getNodeRange(ast.head),
    })

    const handleTheRuleDeclaration = async (ast: ruleSyntax.TheRuleDeclaration): Promise<DocumentSymbol> => ({
        name: await generate(ast.head),
        kind: SymbolKind.Function,
        range: document.getNodeRange(ast),
        selectionRange: document.getNodeRange(ast.head),
    })

    const handleTheActionDeclaration = async (ast: ruleSyntax.TheActionDeclaration): Promise<DocumentSymbol> => ({
        name: await generate(ast.head),
        kind: SymbolKind.Function,
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
