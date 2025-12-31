import {Diagnostic, DiagnosticSeverity} from "vscode-languageserver";
import {ConceptRuleTextDocument} from "../../common";
import {Validator} from "./validator";


export class NamespaceValidator implements Validator {

    public validate(document: ConceptRuleTextDocument) {
        const declarations = document.ast!.nodes.filter(x => x.type == 'NamespaceDeclaration')
        if (declarations.length === 0) {
            return [Diagnostic.create({
                    start: document.positionAt(0), end: document.positionAt(1),
                },
                "\"namespace\" not defined.",
                DiagnosticSeverity.Error,
            )]
        }

        const diagnostics: Diagnostic[] = []

        const firstNode = document.ast!.nodes[0]
        if (firstNode.type != "NamespaceDeclaration") {
            diagnostics.push(Diagnostic.create(
                document.getNodeRange(firstNode), "First element of document must be a \"namespace\"", DiagnosticSeverity.Warning
            ));
        }

        declarations.forEach((declaration, idx) => {
            if (idx > 0) {
                diagnostics.push(Diagnostic.create(
                    document.getNodeRange(declaration), "Duplicate definition of \"namespace\"", DiagnosticSeverity.Warning
                ));
            }
        })

        return diagnostics;
    }

}
