import {BaseNodeString} from '../base';

/**
 * ### Grammar:
 * ```
 * blockPropertyValue : '[[' plain_text ']]' ;
 * ```
 */
export class BlockPropertyValue extends BaseNodeString {

    type = 'BlockPropertyValue' as const;

}
