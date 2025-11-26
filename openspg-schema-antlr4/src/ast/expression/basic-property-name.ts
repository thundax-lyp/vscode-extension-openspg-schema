import {BaseNodeString} from '../base';

/**
 * ### Grammar:
 * ```
 * basicPropertyName : identifier ;
 * ```
 */
export class BasicPropertyName extends BaseNodeString {

    type = 'BasicPropertyName' as const;

}
