import {Diagnostic, DiagnosticSeverity} from "vscode-languageserver";
import * as syntax from "openspg-concept-rule-antlr4";
import {ConceptRuleTextDocument} from "../../common";
import {Validator} from "./validator";

/**
 * check the order of "Structure/GraphStructure", "Rule/Constraint", "Action"
 */
export class ConceptRuleDeclarationValidator implements Validator {


    public validate(document: ConceptRuleTextDocument) {
        const diagnostics: Diagnostic[] = []

        const THE_GRAPH_STRUCTURE_ORDER = 0;
        const THE_RULE_ORDER = 1;

        const handleConceptRuleDeclaration = (declaration: syntax.ConceptRuleDeclaration) => {
            let theGraphExists = false;
            let theRuleExists = false;
            let theActionExists = false;

            for (let idx = 0; idx < declaration.children.length; idx++) {
                const item = declaration.children[idx];
                if (item.type === 'TheGraphStructureDeclaration') {
                    if (theGraphExists) {
                        diagnostics.push(Diagnostic.create(
                            document.getNodeRange(item), `"Structure/GraphStructure" is already defined in the scope`, DiagnosticSeverity.Error
                        ));
                    } else {
                        theGraphExists = true;

                        if (idx !== THE_GRAPH_STRUCTURE_ORDER) {
                            diagnostics.push(Diagnostic.create(
                                document.getNodeRange(item), `"Structure/GraphStructure" should be the first one in the scope`, DiagnosticSeverity.Error
                            ));
                        }
                    }

                } else if (item.type === 'TheRuleDeclaration') {
                    if (theRuleExists) {
                        diagnostics.push(Diagnostic.create(
                            document.getNodeRange(item), `"Rule/Constraint" is already defined in the scope`, DiagnosticSeverity.Error
                        ));
                    } else {
                        theRuleExists = true;

                        if (THE_RULE_ORDER != idx) {
                            diagnostics.push(Diagnostic.create(
                                document.getNodeRange(item), `"Rule/Constraint" should be the next of "Structure/GraphStructure" in the scope`, DiagnosticSeverity.Error
                            ));
                        }
                    }

                } else if (item.type === 'TheActionDeclaration') {
                    if (theActionExists) {
                        diagnostics.push(Diagnostic.create(
                            document.getNodeRange(item), `"Action" is already defined in the scope`, DiagnosticSeverity.Error
                        ));
                    }
                    theActionExists = true;
                }
            }

            if (!theGraphExists) {
                diagnostics.push(Diagnostic.create(
                    document.getNodeRange(declaration), `"Structure/GraphStructure" is required`, DiagnosticSeverity.Error
                ));
            }
        }

        syntax.visit(document.ast!, {
            ConceptRuleDeclaration: ({node}) => handleConceptRuleDeclaration(node),
        })

        return diagnostics;
    }

}
