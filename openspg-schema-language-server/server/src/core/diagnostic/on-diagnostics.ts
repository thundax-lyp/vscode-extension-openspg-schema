import {Diagnostic, FullDocumentDiagnosticReport, DocumentDiagnosticReportKind} from 'vscode-languageserver';
import {Context, OnDiagnostics} from '../context';
import {FullValidator} from "./rules";


export const onDiagnostics = (ctx: Context): OnDiagnostics => async ({textDocument}) => {
    const document = ctx.documents.get(textDocument.uri);
    if (!document || !document.ast) {
        return {
            kind: DocumentDiagnosticReportKind.Full, items: []
        } as FullDocumentDiagnosticReport;
    }

    const validator = new FullValidator();

    const items: Diagnostic[] = validator.validate(document!);

    return {
        kind: DocumentDiagnosticReportKind.Full, items
    } as FullDocumentDiagnosticReport;
}
