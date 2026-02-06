import { BaseNodeString } from "../base";

// valueExpression : logicValueExpression | projectValueExpression;
export class ValueExpression extends BaseNodeString {
    type = "ValueExpression" as const;
}
