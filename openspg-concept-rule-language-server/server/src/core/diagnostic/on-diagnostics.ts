import { Diagnostic, FullDocumentDiagnosticReport, DocumentDiagnosticReportKind } from 'vscode-languageserver';
import { Context, OnDiagnostics } from '../context';
import { FullValidator } from './rules';

export const onDiagnostics =
    (ctx: Context): OnDiagnostics =>
    async ({ textDocument }) => {
        const document = ctx.documents.get(textDocument.uri);
        if (!document || !(await document.isReady())) {
            return {
                kind: DocumentDiagnosticReportKind.Full,
                items: []
            } as FullDocumentDiagnosticReport;
        }

        const validator = new FullValidator();

        const items: Diagnostic[] = validator.validate(document!);
        items.sort((o1, o2) => {
            if (o1.range.start.line !== o2.range.start.line) {
                return o1.range.start.line - o2.range.start.line;
            } else if (o1.range.start.character !== o2.range.start.character) {
                return o1.range.start.character - o2.range.start.character;
            } else if (o1.range.end.line !== o2.range.end.line) {
                return o1.range.end.line - o2.range.end.line;
            } else {
                return o1.range.end.character - o2.range.end.character;
            }
        });

        return {
            kind: DocumentDiagnosticReportKind.Full,
            items
        } as FullDocumentDiagnosticReport;
    };
