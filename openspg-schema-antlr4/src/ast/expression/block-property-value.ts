import {BaseNodeString} from '../base';

// blockPropertyValue: OPEN_BLOCK (PLAIN_TEXT | PLAIN_TEXT_PATCH) CLOSE_BLOCK ;
export class BlockPropertyValue extends BaseNodeString {

    type = 'BlockPropertyValue' as const;

}
