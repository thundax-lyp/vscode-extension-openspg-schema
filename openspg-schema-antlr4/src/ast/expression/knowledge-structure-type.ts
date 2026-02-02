import {BaseNodeString} from '../base';
import {KnowledgeStructureTypeContext, SchemaParserVisitor} from "../../antlr4";

/**
 * ### Grammar:
 * ```
 * knowledgeStructureType : 'EntityType' | 'ConceptType' | 'EventType' | 'IndexType' ;
 * ```
 */
const KEYWORDS = ['EntityType', 'ConceptType', 'EventType', 'IndexType']

export class KnowledgeStructureType extends BaseNodeString {

    type = 'KnowledgeStructureType' as const;

    constructor(ctx: KnowledgeStructureTypeContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.text = KEYWORDS.find(x => x.toLowerCase() === this.text.toLowerCase()) ?? ''
    }

}
