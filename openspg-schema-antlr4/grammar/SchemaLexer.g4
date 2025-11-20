lexer grammar SchemaLexer;

tokens { INDENT, INDENT_META, INDENT_PROP, INDENT_PROP_META, INDENT_SUBPROP, INDENT_SUBPROP_META }

@members {
    static readonly indentState: number[] = [
        SchemaLexer.DEFINITION_STATE, SchemaLexer.KV_STATE,
        SchemaLexer.DEFINITION_STATE, SchemaLexer.KV_STATE,
        SchemaLexer.DEFINITION_STATE, SchemaLexer.KV_STATE,
    ]
    static readonly indentToken: number[] = [
        SchemaLexer.INDENT, SchemaLexer.INDENT_META, SchemaLexer.INDENT_PROP,
        SchemaLexer.INDENT_PROP_META, SchemaLexer.INDENT_SUBPROP, SchemaLexer.INDENT_SUBPROP_META,
    ]
    static readonly maxIndentLevel = SchemaLexer.indentState.length

    currentIndentLevel = 0
    indentPos: number[] = [0]

    private isAfterEol(): boolean {
        const offset = this.text.length + 1
        const prev = this.inputStream.getText(new antlr.Interval(this.getCharIndex() - offset, this.getCharIndex() - offset))
        return prev === '\r' || prev === '\n';
    }

    private getIndentLevel(): number {
        if (!this.isAfterEol()) {
            console.log(this.text)
            throw new Error('bad blank charactor')
        }
        const currentIndentPos = this.text.length
        const lastIndentPos = this.indentPos[this.currentIndentLevel]
        if (currentIndentPos > lastIndentPos) {
            if (this.currentIndentLevel === SchemaLexer.maxIndentLevel) {
                return -1
            }
            this.currentIndentLevel ++
            this.indentPos[this.currentIndentLevel] = currentIndentPos
            return this.currentIndentLevel
        } else if (currentIndentPos < lastIndentPos) {
            for (let i = 0; i < this.currentIndentLevel; i++) {
                if (this.indentPos[i] === currentIndentPos) {
                    this.currentIndentLevel = i
                    return this.currentIndentLevel
                }
            }
            return -1
        }
        return this.currentIndentLevel
    }

    public emitToken(token: Token): void {
        super.emitToken(token)
    }

    public emitIndent(indentLevel: number): void {
        this.emitToken(new antlr.CommonToken(
            [this, this.inputStream],
            SchemaLexer.indentToken[indentLevel],
            SchemaLexer.DEFAULT_MODE,
            this.getCharIndex() - this.text.length,
            this.getCharIndex() - 1,
        ))
    }

    private pushBack() {
        const currentText = this.text
        this.inputStream.seek(this.inputStream.index - currentText.length)
        this.interpreter.line -= currentText.split('').filter(x => x === '\n').length
        if (this.interpreter.column < currentText.length) {
            this.interpreter.column = 0
        } else {
            this.interpreter.column -= currentText.length
        }
    }
}

BLANK_LINE_: (SP | BLOCK_COMMENT | LINE_COMMENT)+ EOL {
    this.pushBack()
    this.pushMode(SchemaLexer.BLANK_LINE_STATE);
} -> skip ;

BLANK_PREFIX_OF_LINE_: SP {
    const indentLevel = this.getIndentLevel();
    if (indentLevel < 0) {
        this.pushMode(SchemaLexer.ERROR_STATE);
    } else {
        this.emitIndent(this.currentIndentLevel)
        this.pushMode(SchemaLexer.indentState[this.currentIndentLevel]);
    }
} ;

NAMESPACE_PREFIX_OF_LINE_: NAMESPACE_KEYWORD (SP | EOL) {
    this.pushBack()
    this.pushMode(SchemaLexer.NAMESPACE_STATE);
} -> skip;

ANY_PREFIX_OF_LINE_: ~[\r\n] {
    this.pushBack()
    this.pushMode(SchemaLexer.DEFINITION_STATE);
} -> skip ;

EOL: (CR | LF | EOF) -> skip ;

BAD_CHAR: ~[\r\n] -> channel(HIDDEN) ;

fragment DOUBLE_QUOTED_STRING: '"' ( ~["\\] | ESCAPED_CHAR )* '"' ;
fragment SINGLE_QUOTED_STRING: '\'' ( ~['\\] | ESCAPED_CHAR )* '\'' ;
fragment GRAVE_QUOTED_STRING: '`' ( ~[`\\] | ESCAPED_CHAR )* '`' ;

fragment PLAIN_TEXT_BLOCK: '[[' (~(']'))* ']]' ;

fragment SP: (SP_CHAR)+ ;

fragment BLOCK_COMMENT: '/*' .*? '*/' ;
fragment LINE_COMMENT: '#' ~[\r\n]* ;

fragment NAMESPACE_KEYWORD: 'namespace' ;

fragment IDENTIFIER: ID_Start (ID_Continue)* ;
fragment ANY_CHAR: [^] ;

fragment SP_CHAR: SPACE | TAB ;
fragment ESCAPED_CHAR: '\\' ( '\\' | '\'' | '"' | ( 'B' | 'b' ) | ( 'F' | 'f' ) | ( 'N' | 'n' ) | ( 'R' | 'r' ) | ( 'T' | 't' ) | ( ( 'U' | 'u' ) ( HEXDIGIT HEXDIGIT HEXDIGIT HEXDIGIT ) ) | ( ( 'U' | 'u' ) ( HEXDIGIT HEXDIGIT HEXDIGIT HEXDIGIT HEXDIGIT HEXDIGIT HEXDIGIT HEXDIGIT ) ) ) ;
fragment HEXDIGIT: [a-fA-F0-9] ;

fragment FF : [\f] ;
fragment RS : [\u001E] ;
fragment GS : [\u001D] ;
fragment FS : [\u001C] ;
fragment CR : [\r] ;
fragment Sc : [\p{Sc}] ;
fragment SPACE : [ ] ;
fragment Pc : [\p{Pc}] ;
fragment TAB : [\t] ;
fragment LF : [\n] ;
fragment VT : [\u000B] ;
fragment US : [\u001F] ;
fragment ID_Start : [\p{ID_Start}] ;
fragment ID_Continue : [\p{ID_Continue}] ;

fragment A: 'A' | 'a' ;
fragment B: 'B' | 'b' ;
fragment C: 'C' | 'c' ;
fragment D: 'D' | 'd' ;
fragment E: 'E' | 'e' ;
fragment F: 'F' | 'f' ;
fragment G: 'G' | 'g' ;
fragment H: 'H' | 'h' ;
fragment I: 'I' | 'i' ;
fragment J: 'J' | 'j' ;
fragment K: 'K' | 'k' ;
fragment L: 'L' | 'l' ;
fragment M: 'M' | 'm' ;
fragment N: 'N' | 'n' ;
fragment O: 'O' | 'o' ;
fragment P: 'P' | 'p' ;
fragment Q: 'Q' | 'q' ;
fragment R: 'R' | 'r' ;
fragment S: 'S' | 's' ;
fragment T: 'T' | 't' ;
fragment U: 'U' | 'u' ;
fragment V: 'V' | 'v' ;
fragment W: 'W' | 'w' ;
fragment X: 'X' | 'x' ;
fragment Y: 'Y' | 'y' ;
fragment Z: 'Z' | 'z' ;

mode BLANK_LINE_STATE ;
    BL_BLOCK_COMMENT: BLOCK_COMMENT -> channel(HIDDEN);
    BL_LINE_COMMENT: LINE_COMMENT -> channel(HIDDEN);
    BL_SP: SP -> skip ;
    BL_EOL_: EOL {
        this.pushBack()
        this.popMode()
    } -> skip;

mode ERROR_STATE ;
    ERROR_EOL: EOL -> channel(HIDDEN), popMode ;
    ERROR_CHAR: ~[ \r\n]+ -> channel(HIDDEN);


mode NAMESPACE_STATE ;
    NAMESPACE_BLOCK_COMMENT: BLOCK_COMMENT -> channel(HIDDEN);
    NAMESPACE_LINE_COMMENT: LINE_COMMENT -> channel(HIDDEN);
    NAMESPACE_SP: SP+ -> skip ;

    NAMESPACE_KEY: NAMESPACE_KEYWORD ;
    NAMESPACE_IDENTIFIER: IDENTIFIER ;
    NAMESPACE_STRING_LITERAL: DOUBLE_QUOTED_STRING | SINGLE_QUOTED_STRING | GRAVE_QUOTED_STRING ;

    NAMESPACE_BAD_CHAR: ~[\r\n] -> channel(HIDDEN);
    NAMESPACE_EOL_: EOL {
        this.pushBack()
        this.popMode()
    } -> skip;


mode DEFINITION_STATE ;
    DEFINITION_BLOCK_COMMENT: BLOCK_COMMENT -> channel(HIDDEN) ;
    DEFINITION_LINE_COMMENT: LINE_COMMENT -> channel(HIDDEN) ;
    DEFINITION_SP: SP+ -> skip ;

    DEFINITION_STRING_LITERAL: DOUBLE_QUOTED_STRING | SINGLE_QUOTED_STRING | GRAVE_QUOTED_STRING ;

    ENTITY_TYPE_KEYWORD     : E N T I T Y T Y P E ;
    CONCEPT_TYPE_KEYWORD    : C O N C E P T T Y P E ;
    EVENT_TYPE_KEYWORD      : E V E N T T Y P E ;
    INDEX_TYPE_KEYWORD      : I N D E X T Y P E ;
    STANDARD_TYPE_KEYWORD   : S T A N D A R D T Y P E ;
    BASIC_TYPE_KEYWORD      : B A S I C T Y P E ;
    INTEGER_KEYWORD         : I N T E G E R ;
    FLOAT_KEYWORD           : F L O A T ;
    TEXT_KEYWORD            : T E X T ;

    DEFINITION_IDENTIFIER: IDENTIFIER ;

    RIGHT_ARROW : '->' ;
    LPARENTH: '(' ;
    RPARENTH: ')' ;
    COMMA   : ',' ;
    COLON   : ':' ;
    HASH    : '#' ;
    DOT     : '.' ;

    DEFINITION_BAD_CHAR: ~[\r\n] -> channel(HIDDEN);
    DEFINITION_EOL_: EOL {
        this.pushBack()
        this.popMode()
    } -> skip;


mode KV_STATE ;
    KV_BLOCK_COMMENT: BLOCK_COMMENT -> channel(HIDDEN);
    KV_LINE_COMMENT: LINE_COMMENT -> channel(HIDDEN);
    KV_SP: SP+ -> skip ;

    DESC_KEYWORD        : D E S C ;
    PROPERTIES_KEYWORD  : P R O P E R T I E S ;
    RELATIONS_KEYWORD   : R E L A T I O N S ;
    HYPERNYMP_PREDICATE_KEYWORD : H Y P E R N Y M P P R E D I C A T E ;
    REGULAR_KEYWORD     : R E G U L A R ;
    SPREADABLE_KEYWORD  : S P R E A D A B L E ;
    AUTORELATE_KEYWORD  : A U T O R E L A T E ;
    CONSTRAINT_KEYWORD  : C O N S T R A I N T ;
    RULE_KEYWORD        : R U L E ;
    INDEX_KEYWORD       : I N D E X ;

    KV_IDENTIFIER: IDENTIFIER ;
    KV_COLON    : COLON -> pushMode(KV_VALUE_STATE) ;

    KV_BAD_CHAR: ~[\r\n] -> channel(HIDDEN);
    KV_EOL_: EOL {
        this.pushBack()
        this.popMode()
    } -> skip;


mode KV_VALUE_STATE ;
    KVV_BLOCK_COMMENT: BLOCK_COMMENT -> channel(HIDDEN);
    KVV_LINE_COMMENT: LINE_COMMENT -> channel(HIDDEN);
    KVV_SP: SP+ -> skip ;

    IS_A_KEYWORD        : I S A ;
    LOCATE_AT_KEYWORD   : L O C A T E A T ;
    MANNER_OF_KEYWORD   : M A N N E R O F ;
    KV_TEXT_KEYWORD     : T E X T ;
    VECTOR_KEYWORD      : V E C T O R ;
    SPARSE_VECTOR_KEYWORD   : S P A R S E V E C T O R ;
    TEXT_AND_VECTOR_KEYWORD : T E X T A N D V E C T O R ;
    TEXT_AND_SPARSE_VECTOR_KEYWORD  : T E X T A N D S P A R S E V E C T O R ;
    NOT_NULL_KEYWORD    : N O T N U L L ;
    MULTI_VALUE_KEYWORD : M U L T I V A L U E ;

    OPEN_BLOCK: '[[' -> pushMode(BLOCK_VALUE_STATE) ;

    KVV_STRING_LITERAL: DOUBLE_QUOTED_STRING | SINGLE_QUOTED_STRING | GRAVE_QUOTED_STRING ;
    KVV_TEXT: ~[ \r\n]+ ;
    KVV_EOL_: EOL {
        this.pushBack()
        this.popMode()
    } -> skip;


mode BLOCK_VALUE_STATE ;
    CLOSE_BLOCK: ']]' -> popMode ;
    PLAIN_TEXT: ~[\]]+ ;
    PLAIN_TEXT_PATCH: ']' ;
