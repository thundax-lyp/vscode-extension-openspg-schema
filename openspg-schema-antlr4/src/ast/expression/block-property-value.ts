import { BaseNode } from "../base";
import { BlockPropertyValueContext, SchemaParserVisitor } from "../../antlr4";
import { BlockContent } from "../literal";

/**
 * ### Grammar:
 * ```
 * blockPropertyValue : '[[' plain_text ']]' ;
 * ```
 */
export class BlockPropertyValue extends BaseNode {
    type = "BlockPropertyValue" as const;

    content: BlockContent;

    constructor(ctx: BlockPropertyValueContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.content = ctx.blockContent().accept(visitor);
    }
}
