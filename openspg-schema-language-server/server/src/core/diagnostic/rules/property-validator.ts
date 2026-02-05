import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver';
import * as syntax from 'openspg-schema-antlr4';
import { SchemaTextDocument } from '../../common';
import { Validator } from './validator';

export class PropertyValidator implements Validator {
    public validate(document: SchemaTextDocument) {
        const diagnostics: Diagnostic[] = [];

        const checkRedeclaredName = (nodes: syntax.PropertyDeclaration[]) => {
            const existNames: {
                node: syntax.PropertyDeclaration;
                displayName: string;
                repeat: number;
            }[] = [];
            nodes.forEach((x) => {
                const displayName = x.declaration.name.variable.text;
                const existName = existNames.find((x) => x.displayName === displayName);
                if (existName) {
                    diagnostics.push(
                        Diagnostic.create(
                            document.getNodeRange(x.declaration.name),
                            `Cannot redeclare block-scoped property \"${displayName}\"`,
                            DiagnosticSeverity.Error
                        )
                    );
                    if (existName.repeat === 1) {
                        diagnostics.push(
                            Diagnostic.create(
                                document.getNodeRange(existName.node.declaration.name),
                                `Cannot redeclare block-scoped property \"${displayName}\"`,
                                DiagnosticSeverity.Error
                            )
                        );
                    }
                    existName.repeat = existName.repeat + 1;
                } else {
                    existNames.push({
                        node: x,
                        displayName,
                        repeat: 1
                    });
                }
            });
        };

        syntax.visit(document.ast!, {
            EntityDeclaration: ({ node }) => checkRedeclaredName(node.children)
        });

        return diagnostics;
    }
}
