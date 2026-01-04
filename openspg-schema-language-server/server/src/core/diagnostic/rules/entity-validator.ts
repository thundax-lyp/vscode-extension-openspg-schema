import {Diagnostic, DiagnosticSeverity} from "vscode-languageserver";
import * as syntax from "openspg-schema-antlr4";
import {SchemaTextDocument} from "../../common";
import {Validator} from "./validator";


export class EntityValidator implements Validator {

    private readonly MAX_ENTITY_LEVEL = 3;

    public validate(document: SchemaTextDocument) {
        const diagnostics: Diagnostic[] = []

        // check entity level
        syntax.visit(document.ast!, {
            EntityDeclaration: ({node, path}) => {
                const parts = path.split(".").filter(x => x === "EntityDeclaration");
                if (parts.length > this.MAX_ENTITY_LEVEL) {
                    diagnostics.push(Diagnostic.create(
                        document.getNodeRange(node), "Max level of \"Schema\" is 6", DiagnosticSeverity.Warning
                    ));
                }
            },
        });

        const checkRedeclaredName = (nodes: syntax.EntityDeclaration[]) => {
            const existNames: {
                node: syntax.EntityDeclaration,
                displayName: string,
                repeat: number
            }[] = []
            nodes.forEach(x => {
                const {semanticNames, realName} = x.declaration.name.variable;
                const displayName = [...semanticNames, realName].map(x => x.text).join('#')
                const existName = existNames.find(x => x.displayName === displayName);
                if (existName) {
                    diagnostics.push(Diagnostic.create(
                        document.getNodeRange(x.declaration.name), `Cannot redeclare block-scoped schema \"${displayName}\"`, DiagnosticSeverity.Error
                    ));
                    if (existName.repeat === 1) {
                        diagnostics.push(Diagnostic.create(
                            document.getNodeRange(existName.node.declaration.name), `Cannot redeclare block-scoped schema \"${displayName}\"`, DiagnosticSeverity.Error
                        ));
                    }
                    existName.repeat = existName.repeat + 1;

                } else {
                    existNames.push({
                        node: x, displayName, repeat: 1
                    });
                }
            })
        }

        checkRedeclaredName(document.ast!.nodes.filter(x => x.type === 'EntityDeclaration'))
        syntax.visit(document.ast!, {
            PropertyDeclaration: ({node}) => checkRedeclaredName(node.children),
        })

        const checkUndefinedEntityTypes = () => {
            const globalTypes = document.ast!.nodes
                .filter(x => x.type === 'EntityDeclaration')
                .map(x => x.declaration.name.variable.realName.text)

            syntax.visit(document.ast!, {
                StructureName: ({node, path}) => {
                    const parts = path.split(".");
                    if (parts.includes('InheritedStructureTypeExpression') && !globalTypes.includes(node.realName.text)) {
                        diagnostics.push(Diagnostic.create(
                            document.getNodeRange(node), `Undefined type \"${node.realName.text}\"`, DiagnosticSeverity.Warning
                        ));
                    }
                }
            })
        }
        checkUndefinedEntityTypes();

        return diagnostics;
    }

}
