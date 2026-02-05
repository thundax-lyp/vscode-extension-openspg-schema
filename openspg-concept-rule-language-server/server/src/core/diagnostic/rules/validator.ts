import { Diagnostic } from 'vscode-languageserver-types';

import { ConceptRuleTextDocument } from '../../common';

export interface Validator {
    validate: (document: ConceptRuleTextDocument) => Diagnostic[];
}
