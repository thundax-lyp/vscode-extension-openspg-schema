import { Validator } from './validator';

import { SchemaTextDocument } from '../../common';

import { NamespaceValidator } from './namespace-validator';
import { EntityValidator } from './entity-validator';
import { PropertyValidator } from './property-validator';

export class FullValidator implements Validator {
    validators: Validator[] = [];

    constructor() {
        this.validators.push(new NamespaceValidator());
        this.validators.push(new EntityValidator());
        this.validators.push(new PropertyValidator());
    }

    validate(document: SchemaTextDocument) {
        return this.validators.flatMap((x) => x.validate(document));
    }
}
