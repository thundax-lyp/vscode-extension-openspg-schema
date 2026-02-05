import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver';
import * as syntax from 'openspg-concept-rule-antlr4';
import { ConceptRuleTextDocument } from '../../common';
import { Validator } from './validator';
import { ConceptRuleDeclaration } from 'openspg-concept-rule-antlr4/dist/ast/declaration/concept-rule-declaration';

export class ConceptRuleDeclarationValidator implements Validator {
    public validate(document: ConceptRuleTextDocument) {
        const diagnostics: Diagnostic[] = [];

        const addDiagnostic = (
            node: syntax.SyntaxNode,
            message: string,
            severity: DiagnosticSeverity = DiagnosticSeverity.Error
        ) => {
            diagnostics.push(Diagnostic.create(document.getNodeRange(node), message, severity));
        };

        const detectRedeclaredConceptRule = (conceptRules: syntax.ConceptRuleDeclaration[]) => {
            const conceptRuleNames = conceptRules.map((x) => {
                return document.getText(document.getNodeRange(x.head)).replaceAll(/\s/g, '');
            });

            for (let idx = 0; idx < conceptRules.length; idx++) {
                const conceptRuleName = conceptRuleNames[idx];
                const existNames = conceptRuleNames.filter((x) => x === conceptRuleName);
                if (existNames.length > 1) {
                    addDiagnostic(conceptRules[idx].head, `Redeclare block-scoped concept rule`);
                }
            }
        };

        const handleRuleWrapperDeclaration = (declaration: syntax.RuleWrapperRuleDeclaration) => {
            detectRedeclaredConceptRule(declaration.conceptRules);
        };

        /**
         * check the order of 'Structure/GraphStructure', 'Rule/Constraint', 'Action'
         * @param declaration
         */
        const handleConceptRuleDeclaration = (declaration: syntax.ConceptRuleDeclaration) => {
            const theGraphStructures = declaration.children.filter((x) => x.type === 'TheGraphStructureDeclaration');
            if (theGraphStructures.length === 0) {
                addDiagnostic(declaration, `"Structure/GraphStructure" is required`);
            }

            let theGraphExists = false;
            let theRuleExists = false;
            let theActionExists = false;
            for (let idx = 0; idx < declaration.children.length; idx++) {
                const item = declaration.children[idx];
                if (item.type === 'TheGraphStructureDeclaration') {
                    if (theGraphExists) {
                        addDiagnostic(declaration, `"Structure/GraphStructure" is already defined in the scope`);
                    } else {
                        theGraphExists = true;
                        if (idx !== 0) {
                            addDiagnostic(item, `"Structure/GraphStructure" should be the first one in the scope`);
                        }
                    }
                } else if (item.type === 'TheRuleDeclaration') {
                    if (theRuleExists) {
                        addDiagnostic(item, `"Rule/Constraint" is already defined in the scope`);
                    } else {
                        theRuleExists = true;
                        if (idx > 0 && declaration.children[idx - 1].type !== 'TheGraphStructureDeclaration') {
                            addDiagnostic(
                                item,
                                `"Rule/Constraint" should be the next of "Structure/GraphStructure" in the scope`
                            );
                        }
                    }
                } else if (item.type === 'TheActionDeclaration') {
                    if (theActionExists) {
                        addDiagnostic(item, `"Action" is already defined in the scope`);
                    }
                    theActionExists = true;
                }
            }
        };

        const globalConceptRules: ConceptRuleDeclaration[] = document.ast!.nodes.filter(
            (x) => x.type === 'ConceptRuleDeclaration'
        );
        detectRedeclaredConceptRule(globalConceptRules);

        syntax.visit(document.ast!, {
            RuleWrapperRuleDeclaration: ({ node }) => handleRuleWrapperDeclaration(node),
            ConceptRuleDeclaration: ({ node }) => handleConceptRuleDeclaration(node)
        });

        return diagnostics;
    }
}
