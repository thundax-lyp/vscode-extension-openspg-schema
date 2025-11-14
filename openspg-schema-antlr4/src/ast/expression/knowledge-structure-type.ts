import {BaseNodeString} from '../base';
import {KnowledgeStructureTypeContext, SchemaParserVisitor} from "../../antlr4";

// knowledgeStructureType  : ENTITY_TYPE_KEYWORD | CONCEPT_TYPE_KEYWORD | EVENT_TYPE_KEYWORD | INDEX_TYPE_KEYWORD ;
export class KnowledgeStructureType extends BaseNodeString {

    type = 'KnowledgeStructureType' as const;

    keywords = ['EntityType', 'ConceptType', 'EventType', 'IndexType']

    constructor(ctx: KnowledgeStructureTypeContext, visitor: SchemaParserVisitor<any>) {
        super(ctx, visitor);
        this.text = this.keywords.find(x => x.toLowerCase() === this.text.toLowerCase()) ?? ''
    }

}
