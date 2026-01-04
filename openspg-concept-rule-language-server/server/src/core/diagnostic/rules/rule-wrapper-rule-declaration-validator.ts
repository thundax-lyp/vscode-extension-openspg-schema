import {Diagnostic, DiagnosticSeverity} from "vscode-languageserver";
import * as syntax from "openspg-concept-rule-antlr4";
import {ConceptRuleTextDocument} from "../../common";
import {Validator} from "./validator";

/**
 * check duplicated 'rule'
 */
export class RuleWrapperRuleDeclarationValidator implements Validator {

    public validate(document: ConceptRuleTextDocument) {
        const diagnostics: Diagnostic[] = []

        const handleRuleWrapperDeclaration = (declaration: syntax.RuleWrapperRuleDeclaration) => {
            const conceptRuleNames: string[] = [];
            for (let idx = 0; idx < declaration.conceptRules.length; idx++) {
                const conceptRule = declaration.conceptRules[idx];
                const conceptRuleName = document.getText(document.getNodeRange(conceptRule.head)).replaceAll(/\s/g, '');
                if (conceptRuleNames.includes(conceptRuleName)) {
                    diagnostics.push(Diagnostic.create(
                        document.getNodeRange(conceptRule.head), `Concept rule is already defined in the scope`, DiagnosticSeverity.Error
                    ));
                } else {
                    conceptRuleNames.push(conceptRuleName);
                }
            }
        }

        syntax.visit(document.ast!, {
            RuleWrapperRuleDeclaration: ({node}) => handleRuleWrapperDeclaration(node),
        })

        return diagnostics;
    }

}
