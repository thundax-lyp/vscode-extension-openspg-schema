import { Validator } from './validator';

import { ConceptRuleTextDocument } from '../../common';

import { NamespaceValidator } from './namespace-validator';
import { ConceptRuleDeclarationValidator } from './concept-rule-declaration-validator';

export class FullValidator implements Validator {
    validators: Validator[] = [];

    constructor() {
        this.validators.push(new NamespaceValidator());
        this.validators.push(new ConceptRuleDeclarationValidator());
    }

    validate(document: ConceptRuleTextDocument) {
        return this.validators.flatMap((x) => x.validate(document));
    }
}
