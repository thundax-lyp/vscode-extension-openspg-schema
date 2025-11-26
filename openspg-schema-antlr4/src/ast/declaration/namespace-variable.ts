import {BaseNodeString} from '../base';

/**
 * ### Grammar:
 * ```
 * namespaceVariable : identifier | string_literal ;
 * ```
 **/
export class NamespaceVariable extends BaseNodeString {

    type = 'NamespaceVariable' as const;

}
