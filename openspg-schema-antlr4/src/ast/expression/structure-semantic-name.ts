import { BaseNodeString } from "../base";

/**
 * ### Grammar:
 * ```
 * structureSemanticName : identifier ;
 * ```
 */
export class StructureSemanticName extends BaseNodeString {
    type = "StructureSemanticName" as const;
}
