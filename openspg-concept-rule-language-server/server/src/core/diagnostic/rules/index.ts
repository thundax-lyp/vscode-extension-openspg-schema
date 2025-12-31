import {Validator} from "./validator";

import {ConceptRuleTextDocument} from "../../common";

import {NamespaceValidator} from "./namespace-validator"

export class FullValidator implements Validator {

    validators: Validator[] = [];

    constructor() {
        this.validators.push(new NamespaceValidator())
    }

    validate(document: ConceptRuleTextDocument) {
        return this.validators.flatMap(x => x.validate(document));
    }
}
