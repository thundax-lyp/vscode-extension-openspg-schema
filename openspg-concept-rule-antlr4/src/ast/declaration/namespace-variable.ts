import {BaseNodeString} from '../base';


// namespaceVariable: UNESCAPED_SYMBOLIC_NAME | STRING_LITERAL | ESCAPED_SYMBOLIC_NAME;
export class NamespaceVariable extends BaseNodeString {

    type = 'NamespaceVariable' as const;

}
