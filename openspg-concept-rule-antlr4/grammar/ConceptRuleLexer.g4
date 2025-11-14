lexer grammar ConceptRuleLexer;

STRING_LITERAL
    : ('"' ( StringLiteral_0 | ESCAPED_CHAR )* '"')
    | ( '\'' ( StringLiteral_1 | ESCAPED_CHAR )* '\'' )
    ;

ESCAPED_SYMBOLIC_NAME :  ( '`' ( EscapedSymbolicName_0 )* '`' )+ ;

SP:  ( WHITESPACE )+ -> skip;

WHITESPACE
    : SPACE | TAB | LF | VT | FF | CR | FS | GS | RS | US
    | '\u1680' | '\u180e' | '\u2000' | '\u2001' | '\u2002' | '\u2003' | '\u2004' | '\u2005'
    | '\u2006' | '\u2008' | '\u2009' | '\u200a' | '\u2028' | '\u2029' | '\u205f' | '\u3000'
    | '\u00a0' | '\u2007' | '\u202f'
    ;

BLOCK_COMMENT: '/*' .*? '*/' -> channel(HIDDEN) ;
LINE_COMMENT: '//' ~[\r\n]* -> channel(HIDDEN);

fragment ESCAPED_CHAR: '\\' ( '\\' | '\'' | '"' | ( 'B' | 'b' ) | ( 'F' | 'f' ) | ( 'N' | 'n' ) | ( 'R' | 'r' ) | ( 'T' | 't' ) | ( ( 'U' | 'u' ) ( HexDigit HexDigit HexDigit HexDigit ) ) | ( ( 'U' | 'u' ) ( HexDigit HexDigit HexDigit HexDigit HexDigit HexDigit HexDigit HexDigit ) ) ) ;

// 整型的定义
INTEGER_LITERAL:  HexInteger | OctalInteger | DecimalInteger;
fragment HexInteger: '0x' ( HexDigit )+ ;
fragment DecimalInteger: '0' | (NonZeroDigit Digit*) ;
fragment OctalInteger: '0' ('0' | '1' | '2' | '3' | '4' | '5' | '6' | '7')+ ;
fragment HexLetter: ( 'A' | 'a' ) | ( 'B' | 'b' ) | ( 'C' | 'c' ) | ( 'D' | 'd' ) | ( 'E' | 'e' ) | ( 'F' | 'f' );
fragment HexDigit: Digit | HexLetter;
fragment Digit: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
fragment NonZeroDigit: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

// 浮点数定义
FLOAT_LITERAL: ExponentDecimalReal | RegularDecimalReal;
fragment ExponentDecimalReal:  ( ( Digit )+ | ( ( Digit )+ '.' ( Digit )+ ) | ( '.' ( Digit )+ ) ) ( 'E' | 'e' ) '-'? ( Digit )+ ;
fragment RegularDecimalReal:  ( Digit )* '.' ( Digit )+ ;


//#############################################################################
// 全局关键字
GRAPH_STRUCTURE_KEYWORD : 'GraphStructure' ;
GRAPH_KEYWORD : 'Graph' ;
ACTION_KEYWORD : 'Action' ;
ADD_EDGE_KEYWORD : 'createEdgeInstance' ;
ADD_NODE_KEYWORD : 'createNodeInstance';
DEFINE_KEYWORD : 'Define' ;
DEFINE_PRIORITY : 'DefinePriority' ;
DESCRIPTION : 'Description';
RULE_KEYWORD : 'Rule' ;
NAMESPACE_KEYWORD : 'namespace' ;
WRAPPER_RULE_KEYWORD : 'rule' ;

// 不区分大小写的关键词
ABS_KEYWORD : ('A'|'a')('B'|'b')('S'|'s');
ACCUMULATE_KEYWORD : ('A' | 'a')('C' | 'c')('C' | 'c')('U' | 'u')('M' | 'm')('U' | 'u')('L' | 'l')('A' | 'a')('T' | 't')('E' | 'e');
AND_KEYWORD : (('A' | 'a')('N' | 'n')('D' | 'd'));
AS_KEYWORD : ('A' | 'a')('S' | 's') ;
ASC_KEYWORD :  ('A' | 'a')('S' | 's')('C' | 'c');
AVG_KEYWORD : ('A' | 'a')('V' | 'v')('G' | 'g') ;
AVGIF_KEYWORD : ('A' | 'a')('V' | 'v')('G' | 'g')('I' | 'i')('F' | 'f') ;
CEIL_KEYWORD : ('C' | 'c')('E' | 'e')('I' | 'i')('L' | 'l');
CEILING_KEYWORD : ('C' | 'c')('E' | 'e')('I' | 'i')('L' | 'l')('I' | 'i')('N' | 'n')('G' | 'g');
CONCATAGGIF_KEYWORD : ('C' | 'c')('O' | 'o')('N' | 'n')('C' | 'c')('A' | 'a')('T' | 't')('A' | 'a')('G' | 'g')('G' | 'g')('I' | 'i')('F' | 'f') ;
CONSTRAINT_KEYWORD : ('C')('O'|'o')('N'|'n')('S'|'s')('T'|'t')('R'|'r')('A'|'a')('I'|'i')('N'|'n')('T'|'t');
COUNT_KEYWORD : ('C' | 'c')('O' | 'o')('U' | 'u')('N' | 'n')('T' | 't') ;
COUNTIF_KEYWORD : ('C' | 'c')('O' | 'o')('U' | 'u')('N' | 'n')('T' | 't')('I' | 'i')('F' | 'f') ;
DESC_KEYWORD : ('D' | 'd')('E' | 'e')('S' | 's')('C' | 'c') ;
EDGES_KEYWORD : ('E' | 'e')('D' | 'd')('G' | 'g')('E' | 'e')('S' | 's');
EXIST_KEYWORD : ('E' | 'e')('X' | 'x')('I' | 'i')('S' | 's')('T' | 't')  ;
FALSE_KEYWORD : ('F' | 'f')('A' | 'a')('L' | 'l')('S' | 's')('E' | 'e') ;
FLOOR_KEYWORD : ('F' | 'f')('L' | 'l')('O' | 'o')('O' | 'o')('R' | 'r');
GET_KEYWORD : ('G'|'g')('E'|'e')('T'|'t');
GROUP_KEYWORD : ('G' | 'g')('R' | 'r')('O' | 'o')('U' | 'u')('P' | 'p') ;
HEAD_KEYWORD : ('H' | 'h')('E' | 'e')('A' | 'a')('D' | 'd');
IF_KEYWORD : ('I' | 'i')('F' | 'f') ;
IN_KEYWORD  : ('I' | 'i')('N' | 'n') ;
IS_KEYWORD : ('I' | 'i')('S' | 's') ;
LIKE_KEYWORD : ('L' | 'l')('I' | 'i')('K' | 'k')('E' | 'e');
LIMIT_KEYWORD : ('L' | 'l')('I' | 'i')('M' | 'm')('I' | 'i')('T' | 't');
MIN_KEYWORD : ('M' | 'm')('I' | 'i')('N' | 'n') ;
MINIF_KEYWORD : ('M' | 'm')('I' | 'i')('N' | 'n')('I' | 'i')('F' | 'f') ;
MAX_KEYWORD : ('M' | 'm')('A' | 'a')('X' | 'x') ;
MAXIF_KEYWORD : ('M' | 'm')('A' | 'a')('X' | 'x')('I' | 'i')('F' | 'f') ;
NODES_KEYWORD : ('N' | 'n')('O' | 'o')('D' | 'd')('E' | 'e')('S' | 's');
NOT_KEYWORD : ('N'|'n')('O'|'o')('T'|'t');
NULL_KEYWORD : ('N'|'n')('U'|'u')('L'|'l')('L'|'l');
OPTIONAL_KEYWORD : ('O' | 'o')('P' | 'p')('T' | 't')('I' | 'i')('O' | 'o')('N' | 'n')('A' | 'a')('L' | 'l') ;
OR_KEYWORD : ('O' | 'o')('R' | 'r') ;
PER_NODE_LIMIT_KEYWORD : ('P' | 'p')('E' | 'e')('R' | 'r') '_' ('N' | 'n')('O' | 'o')('D' | 'd')('E' | 'e') '_' ('L' | 'l')('I' | 'i')('M' | 'm')('I' | 'i')('T' | 't') ;
REDUCE_KEYWORD : ('R' | 'r')('E' | 'e')('D' | 'd')('U' | 'u')('C' | 'c')('E' | 'e');
REPEAT_KEYWORD : ('R' | 'r')('E' | 'e')('P' | 'p')('E' | 'e')('A' | 'a')('T' | 't') ;
RLIKE_KEYWORD : ('R' | 'r')('L' | 'l')('I' | 'i')('K' | 'k')('E' | 'e');
SLICE_KEYWORD : ('S'|'s')('L'|'l')('I'|'i')('C'|'c')('E'|'e');
STR_JOIN_KEYWORD : ('S' | 's')('T' | 't')('R' | 'r') '_' ('J' | 'j')('O' | 'o')('I' | 'i')('N' | 'n');
STRUCTURE_KEYWORD : ('S')('T'|'t')('R'|'r')('U'|'u')('C'|'c')('T'|'t')('U'|'u')('R'|'r')('E'|'e');
SUM_KEYWORD : ('S' | 's')('U' | 'u')('M' | 'm') ;
SUMIF_KEYWORD : ('S' | 's')('U' | 'u')('M' | 'm')('I' | 'i')('F' | 'f') ;
TAIL_KEYWORD : ('T' | 't')('A' | 'a')('I' | 'i')('L' | 'l');
TRUE_KEYWORD : ('T' | 't')('R' | 'r')('U' | 'u')('E' | 'e') ;
WHERE_KEYWORD : ('W' | 'w')('H' | 'h')('E' | 'e')('R' | 'r')('E' | 'e') ;
XOR_KEYWORD : ('X' | 'x')('O' | 'o')('R' | 'r') ;

// 符号
LEFT_ARROW_BRACKET : '<-[' ;
BOTH_ARROW : '<->' ;
LEFT_ARROW : '<-' ;
RIGHT_ARROW : '->' ;
LAMBDA_ARROW : '=>' ;

ANDAND : '&&' ;
OROR : '||' ;
EQEQ: '==' ;
NE : '<>' | '!=' ;
GE : '>=' ;
LE : '<=' ;

OPEN_RULE_BLOCK : '[[' ;
CLOSE_RULE_BLOCK : ']]' ;

LBRACE: '{' ;
RBRACE: '}' ;
LBRACKET: '[' ;
RBRACKET: ']' ;
LPARENTH: '(' ;
RPARENTH: ')' ;
COMMA: ',' ;
EQ: '=' ;
COLON : ':' ;
ASTERISK : '*' ;
MINUS : '-' ;
QUEST : '?' ;
VBAR : '|' ;
DOT : '.' ;
DIV : '/' ;
PLUS : '+' ;
DOLLAR_SYMBOL : '$' ;
EXCL : '!';
LT : '<' ;
GT : '>' ;
PERC : '%' ;

//#############################################################################
UNESCAPED_SYMBOLIC_NAME : (ID_Start | Pc) (ID_Continue | Sc)* ;

//COMMENT
//    : ( '/*' ( Comment_1 | ( '*' Comment_2 ) )* '*/' )
//    | ( '//' ( Comment_3 )* CR? ( LF | EOF ) )
//    ;

fragment FF : [\f] ;
fragment EscapedSymbolicName_0 : ~[`] ;
fragment StringLiteral_1 : ~['\\] ;
fragment RS : [\u001E] ;
fragment Comment_1 : ~[*] ;
fragment Comment_3 : ~[\n\r] ;
fragment Comment_2 : ~[/] ;
fragment GS : [\u001D] ;
fragment FS : [\u001C] ;
fragment CR : [\r] ;
fragment Sc : [\p{Sc}] ;
fragment SPACE : [ ] ;
fragment Pc : [\p{Pc}] ;
fragment TAB : [\t] ;
fragment StringLiteral_0 : ~["\\] ;
fragment LF : [\n] ;
fragment VT : [\u000B] ;
fragment US : [\u001F] ;
fragment ID_Start : [\p{ID_Start}] ;
fragment ID_Continue : [\p{ID_Continue}] ;
