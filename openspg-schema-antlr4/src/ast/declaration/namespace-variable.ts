import {BaseNodeString} from '../base';

// namespaceVariable : NAMESPACE_IDENTIFIER | NAMESPACE_STRING_LITERAL ;
export class NamespaceVariable extends BaseNodeString {

    type = 'NamespaceVariable' as const;

}
