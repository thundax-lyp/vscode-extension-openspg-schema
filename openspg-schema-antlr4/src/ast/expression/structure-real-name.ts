import {BaseNodeString} from '../base';

/**
 * ### Grammar:
 * ```
 * structureRealName : identifier ;
 * ```
 */
export class StructureRealName extends BaseNodeString {

    type = 'StructureRealName' as const;

}
