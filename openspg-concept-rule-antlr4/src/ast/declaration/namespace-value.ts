import {BaseNodeString} from '../base';


// namespaceValue: UNESCAPED_SYMBOLIC_NAME | STRING_LITERAL | ESCAPED_SYMBOLIC_NAME;
export class NamespaceValue extends BaseNodeString {

    type = 'NamespaceValue' as const;

}
