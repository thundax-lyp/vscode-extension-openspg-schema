import { BaseNodeString } from "../base";

/**
 * ### Grammar:
 * ```
 * namespaceVariable : unescaped_symbolic_name | string_literal | escaped_symbolic_name ;
 * ```
 **/
export class NamespaceVariable extends BaseNodeString {
    type = "NamespaceVariable" as const;
}
