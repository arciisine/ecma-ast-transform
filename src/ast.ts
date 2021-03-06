export namespace AST {
  export const NESTED:{[key:string]:string[]} = {}
  export interface Node  {
    type:  string;
  }
  export interface SourceLocation  {
    source?:  string | null;
    end:  Position;
    start:  Position;
  }
  export interface Position  {
    column:  number;
    line:  number;
  }
  export interface Identifier  extends Expression,Pattern {
    name:  string;
  }
  export interface Literal  extends Expression {
    value?:  string | boolean | null | number | RegExp;
  }
  export interface RegExpLiteral  extends Literal {
    regex: {     pattern: string;     flags: string;   };
  }
  export interface Program  extends Node {
    body: (Statement | ModuleDeclaration )[];
    sourceType:  "script" | "module";
  }
  export interface Function  extends Node {
    body:  BlockStatement;
    params: (Pattern )[];
    id?:  Identifier | null;
    generator:  boolean;
  }
  export interface Statement  extends Node {
    
  }
  export interface ExpressionStatement  extends Statement {
    expression:  Expression;
  }
  export interface BlockStatement  extends Statement {
    body: (Statement )[];
  }
  export interface EmptyStatement  extends Statement {
    
  }
  export interface DebuggerStatement  extends Statement {
    
  }
  export interface WithStatement  extends Statement {
    body:  Statement;
    object:  Expression;
  }
  export interface ReturnStatement  extends Statement {
    argument?:  Expression | null;
  }
  export interface LabeledStatement  extends Statement {
    body:  Statement;
    label:  Identifier;
  }
  export interface BreakStatement  extends Statement {
    label?:  Identifier | null;
  }
  export interface ContinueStatement  extends Statement {
    label?:  Identifier | null;
  }
  export interface IfStatement  extends Statement {
    test:  Expression;
    alternate?:  Statement | null;
    consequent:  Statement;
  }
  export interface SwitchStatement  extends Statement {
    cases: (SwitchCase )[];
    discriminant:  Expression;
  }
  export interface SwitchCase  extends Node {
    test?:  Expression | null;
    consequent: (Statement )[];
  }
  export interface ThrowStatement  extends Statement {
    argument:  Expression;
  }
  export interface TryStatement  extends Statement {
    finalizer?:  BlockStatement | null;
    handler?:  CatchClause | null;
    block:  BlockStatement;
  }
  export interface CatchClause  extends Node {
    body:  BlockStatement;
    param:  Pattern;
  }
  export interface WhileStatement  extends Statement {
    test:  Expression;
    body:  Statement;
  }
  export interface DoWhileStatement  extends Statement {
    body:  Statement;
    test:  Expression;
  }
  export interface ForStatement  extends Statement {
    test?:  Expression | null;
    body:  Statement;
    init?:  VariableDeclaration | Expression | null;
    update?:  Expression | null;
  }
  export interface ForInStatement  extends Statement {
    body:  Statement;
    right:  Expression;
    left:  VariableDeclaration |  Pattern;
  }
  export interface Declaration  extends Statement {
    
  }
  export interface FunctionDeclaration  extends Declaration,BaseFunction {
    body:  BlockStatement;
  }
  export interface VariableDeclaration  extends Declaration {
    kind:  "var" | "let" | "const";
    declarations: (VariableDeclarator )[];
  }
  export interface VariableDeclarator  extends Node {
    init?:  Expression | null;
    id:  Pattern;
  }
  export interface Expression  extends Node {
    
  }
  export interface ThisExpression  extends Expression {
    
  }
  export interface ArrayExpression  extends Expression {
    elements?: (Expression | SpreadElement | null )[];
  }
  export interface ObjectExpression  extends Expression {
    properties: (Property )[];
  }
  export interface Property  extends Node {
    kind:  "init" | "get" | "set";
    shorthand:  boolean;
    computed:  boolean;
    value:  Expression;
    key:  Expression;
    method:  boolean;
  }
  export interface FunctionExpression  extends Expression,BaseFunction {
    body:  BlockStatement;
  }
  export interface UnaryExpression  extends Expression {
    operator:  UnaryOperator;
    prefix:  boolean;
    argument:  Expression;
  }
  export type UnaryOperator = "-" | "+" | "!" | "~" | "typeof" | "void" | "delete"
  export interface UpdateExpression  extends Expression {
    operator:  UpdateOperator;
    prefix:  boolean;
    argument:  Expression;
  }
  export type UpdateOperator = "++" | "--"
  export interface BinaryExpression  extends Expression {
    operator:  BinaryOperator;
    right:  Expression;
    left:  Expression;
  }
  export type BinaryOperator = "==" | "!=" | "===" | "!==" | "<" | "<=" | ">" | ">=" | "<<" | ">>" | ">>>" | "+" | "-" | "*" | "/" | "%" | "|" | "^" | "&" | "in" | "instanceof"
  export interface AssignmentExpression  extends Expression {
    operator:  AssignmentOperator;
    right:  Expression;
    left:  Pattern;
  }
  export type AssignmentOperator = "=" | "+=" | "-=" | "*=" | "/=" | "%=" | "<<=" | ">>=" | ">>>=" | "|=" | "^=" | "&="
  export interface LogicalExpression  extends Expression {
    operator:  LogicalOperator;
    right:  Expression;
    left:  Expression;
  }
  export type LogicalOperator = "||" | "&&"
  export interface MemberExpression  extends Expression,Pattern {
    property:  Expression;
    object:  Expression | Super;
    computed:  boolean;
  }
  export interface ConditionalExpression  extends Expression {
    test:  Expression;
    alternate:  Expression;
    consequent:  Expression;
  }
  export interface CallExpression  extends Expression {
    callee:  Expression | Super;
    arguments: (Expression | SpreadElement )[];
  }
  export interface NewExpression  extends CallExpression {
    
  }
  export interface SequenceExpression  extends Expression {
    expressions: (Expression )[];
  }
  export interface Pattern  extends Node {
    
  }
  export interface ForOfStatement  extends ForInStatement {
    
  }
  export interface Super  extends Node {
    
  }
  export interface SpreadElement  extends Node {
    argument:  Expression;
  }
  export interface ArrowFunctionExpression  extends Expression,BaseFunction {
    body:  BlockStatement | Expression;
    expression:  boolean;
  }
  export interface YieldExpression  extends Expression {
    argument?:  Expression | null;
    delegate:  boolean;
  }
  export interface TemplateLiteral  extends Expression {
    quasis: (TemplateElement )[];
    expressions: (Expression )[];
  }
  export interface TaggedTemplateExpression  extends Expression {
    quasi:  TemplateLiteral;
    tag:  Expression;
  }
  export interface TemplateElement  extends Node {
    tail:  boolean;
    value: {         cooked: string;         raw: string;     };
  }
  export interface AssignmentProperty  extends Property {
    kind:  "init";
    method: boolean
    value:  Pattern;
  }
  export interface ObjectPattern  {
    type:  "ObjectPattern";
    properties: (AssignmentProperty )[];
  }
  export interface ArrayPattern  extends Pattern {
    elements?: (Pattern | null )[];
  }
  export interface RestElement  extends Pattern {
    argument:  Pattern;
  }
  export interface AssignmentPattern  extends Pattern {
    right:  Expression;
    left:  Pattern;
  }
  export interface Class  extends Node {
    body:  ClassBody;
    id?:  Identifier | null;
    superClass?:  Expression | null;
  }
  export interface ClassBody  extends Node {
    body: (MethodDefinition )[];
  }
  export interface MethodDefinition  extends Node {
    kind:  "constructor" | "method" | "get" | "set";
    computed:  boolean;
    value:  FunctionExpression;
    static:  boolean;
    key:  Expression;
  }
  export interface ClassDeclaration  extends Class,Declaration {
    id:  Identifier;
  }
  export interface ClassExpression  extends Class,Expression {
    
  }
  export interface MetaProperty  extends Expression {
    property:  Identifier;
    meta:  Identifier;
  }
  export interface ModuleDeclaration  extends Node {
    
  }
  export interface ModuleSpecifier  extends Node {
    local:  Identifier;
  }
  export interface ImportDeclaration  extends ModuleDeclaration {
    specifiers: (ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier )[];
    source:  Literal;
  }
  export interface ImportSpecifier  extends ModuleSpecifier {
    imported:  Identifier;
  }
  export interface ImportDefaultSpecifier  extends ModuleSpecifier {
    
  }
  export interface ImportNamespaceSpecifier  extends ModuleSpecifier {
    
  }
  export interface ExportNamedDeclaration  extends ModuleDeclaration {
    specifiers: (ExportSpecifier )[];
    source?:  Literal | null;
    declaration?:  Declaration | null;
  }
  export interface ExportSpecifier  extends ModuleSpecifier {
    exported:  Identifier;
  }
  export interface ExportDefaultDeclaration  extends ModuleDeclaration {
    declaration:  Declaration | Expression;
  }
  export interface ExportAllDeclaration  extends ModuleDeclaration {
    source:  Literal;
  }
  export interface BaseFunction  extends Node {
    params: (Pattern )[];
    id?: Identifier | null
    generator:  boolean;
  }
  export function Identifier(o:{name:  string,}):Identifier {
    return ((o["type"] = "Identifier") && o) as Identifier
  }
  NESTED["Identifier"] = []; 
  export function Literal(o:{value?:  string | boolean | null | number | RegExp,}):Literal {
    return ((o["type"] = "Literal") && o) as Literal
  }
  NESTED["Literal"] = []; 
  export function Program(o:{body: (Statement | ModuleDeclaration )[],
    sourceType:  "script" | "module",}):Program {
    return ((o["type"] = "Program") && o) as Program
  }
  NESTED["Program"] = ["body"]; 
  export function ExpressionStatement(o:{expression:  Expression,}):ExpressionStatement {
    return ((o["type"] = "ExpressionStatement") && o) as ExpressionStatement
  }
  NESTED["ExpressionStatement"] = ["expression"]; 
  export function BlockStatement(o:{body: (Statement )[],}):BlockStatement {
    return ((o["type"] = "BlockStatement") && o) as BlockStatement
  }
  NESTED["BlockStatement"] = ["body"]; 
  export function EmptyStatement(o:{}):EmptyStatement {
    return ((o["type"] = "EmptyStatement") && o) as EmptyStatement
  }
  NESTED["EmptyStatement"] = []; 
  export function DebuggerStatement(o:{}):DebuggerStatement {
    return ((o["type"] = "DebuggerStatement") && o) as DebuggerStatement
  }
  NESTED["DebuggerStatement"] = []; 
  export function WithStatement(o:{body:  Statement,
    object:  Expression,}):WithStatement {
    return ((o["type"] = "WithStatement") && o) as WithStatement
  }
  NESTED["WithStatement"] = ["body","object"]; 
  export function ReturnStatement(o:{argument?:  Expression | null,}):ReturnStatement {
    return ((o["type"] = "ReturnStatement") && o) as ReturnStatement
  }
  NESTED["ReturnStatement"] = ["argument"]; 
  export function LabeledStatement(o:{body:  Statement,
    label:  Identifier,}):LabeledStatement {
    return ((o["type"] = "LabeledStatement") && o) as LabeledStatement
  }
  NESTED["LabeledStatement"] = ["body","label"]; 
  export function BreakStatement(o:{label?:  Identifier | null,}):BreakStatement {
    return ((o["type"] = "BreakStatement") && o) as BreakStatement
  }
  NESTED["BreakStatement"] = ["label"]; 
  export function ContinueStatement(o:{label?:  Identifier | null,}):ContinueStatement {
    return ((o["type"] = "ContinueStatement") && o) as ContinueStatement
  }
  NESTED["ContinueStatement"] = ["label"]; 
  export function IfStatement(o:{test:  Expression,
    alternate?:  Statement | null,
    consequent:  Statement,}):IfStatement {
    return ((o["type"] = "IfStatement") && o) as IfStatement
  }
  NESTED["IfStatement"] = ["test","alternate","consequent"]; 
  export function SwitchStatement(o:{cases: (SwitchCase )[],
    discriminant:  Expression,}):SwitchStatement {
    return ((o["type"] = "SwitchStatement") && o) as SwitchStatement
  }
  NESTED["SwitchStatement"] = ["cases","discriminant"]; 
  export function SwitchCase(o:{test?:  Expression | null,
    consequent: (Statement )[],}):SwitchCase {
    return ((o["type"] = "SwitchCase") && o) as SwitchCase
  }
  NESTED["SwitchCase"] = ["test","consequent"]; 
  export function ThrowStatement(o:{argument:  Expression,}):ThrowStatement {
    return ((o["type"] = "ThrowStatement") && o) as ThrowStatement
  }
  NESTED["ThrowStatement"] = ["argument"]; 
  export function TryStatement(o:{finalizer?:  BlockStatement | null,
    handler?:  CatchClause | null,
    block:  BlockStatement,}):TryStatement {
    return ((o["type"] = "TryStatement") && o) as TryStatement
  }
  NESTED["TryStatement"] = ["finalizer","handler","block"]; 
  export function CatchClause(o:{body:  BlockStatement,
    param:  Pattern,}):CatchClause {
    return ((o["type"] = "CatchClause") && o) as CatchClause
  }
  NESTED["CatchClause"] = ["body","param"]; 
  export function WhileStatement(o:{test:  Expression,
    body:  Statement,}):WhileStatement {
    return ((o["type"] = "WhileStatement") && o) as WhileStatement
  }
  NESTED["WhileStatement"] = ["test","body"]; 
  export function DoWhileStatement(o:{body:  Statement,
    test:  Expression,}):DoWhileStatement {
    return ((o["type"] = "DoWhileStatement") && o) as DoWhileStatement
  }
  NESTED["DoWhileStatement"] = ["body","test"]; 
  export function ForStatement(o:{body:  Statement,
    init?:  VariableDeclaration | Expression | null,
    test?:  Expression | null,
    update?:  Expression | null,}):ForStatement {
    return ((o["type"] = "ForStatement") && o) as ForStatement
  }
  NESTED["ForStatement"] = ["body","init","test","update"]; 
  export function ForInStatement(o:{body:  Statement,
    right:  Expression,
    left:  VariableDeclaration |  Pattern,}):ForInStatement {
    return ((o["type"] = "ForInStatement") && o) as ForInStatement
  }
  NESTED["ForInStatement"] = ["body","right","left"]; 
  export function FunctionDeclaration(o:{body:  BlockStatement,
    params: (Pattern )[],
    generator:  boolean,
    id?: Identifier | null}):FunctionDeclaration {
    return ((o["type"] = "FunctionDeclaration") && o) as FunctionDeclaration
  }
  NESTED["FunctionDeclaration"] = ["body","params","id"]; 
  export function VariableDeclaration(o:{kind:  "var" | "let" | "const",
    declarations: (VariableDeclarator )[],}):VariableDeclaration {
    return ((o["type"] = "VariableDeclaration") && o) as VariableDeclaration
  }
  NESTED["VariableDeclaration"] = ["declarations"]; 
  export function VariableDeclarator(o:{init?:  Expression | null,
    id:  Pattern,}):VariableDeclarator {
    return ((o["type"] = "VariableDeclarator") && o) as VariableDeclarator
  }
  NESTED["VariableDeclarator"] = ["init","id"]; 
  export function ThisExpression(o:{}):ThisExpression {
    return ((o["type"] = "ThisExpression") && o) as ThisExpression
  }
  NESTED["ThisExpression"] = []; 
  export function ArrayExpression(o:{elements?: (Expression | SpreadElement | null )[],}):ArrayExpression {
    return ((o["type"] = "ArrayExpression") && o) as ArrayExpression
  }
  NESTED["ArrayExpression"] = ["elements"]; 
  export function ObjectExpression(o:{properties: (Property )[],}):ObjectExpression {
    return ((o["type"] = "ObjectExpression") && o) as ObjectExpression
  }
  NESTED["ObjectExpression"] = ["properties"]; 
  export function Property(o:{kind:  "init" | "get" | "set",
    shorthand:  boolean,
    computed:  boolean,
    value:  Expression,
    key:  Expression,
    method:  boolean,}):Property {
    return ((o["type"] = "Property") && o) as Property
  }
  NESTED["Property"] = ["value","key"]; 
  export function FunctionExpression(o:{body:  BlockStatement,
    params: (Pattern )[],
    generator:  boolean,
    id?: Identifier | null}):FunctionExpression {
    return ((o["type"] = "FunctionExpression") && o) as FunctionExpression
  }
  NESTED["FunctionExpression"] = ["body","params","id"]; 
  export function UnaryExpression(o:{operator:  UnaryOperator,
    prefix:  boolean,
    argument:  Expression,}):UnaryExpression {
    return ((o["type"] = "UnaryExpression") && o) as UnaryExpression
  }
  NESTED["UnaryExpression"] = ["operator","argument"]; 
  export function UpdateExpression(o:{operator:  UpdateOperator,
    prefix:  boolean,
    argument:  Expression,}):UpdateExpression {
    return ((o["type"] = "UpdateExpression") && o) as UpdateExpression
  }
  NESTED["UpdateExpression"] = ["operator","argument"]; 
  export function BinaryExpression(o:{operator:  BinaryOperator,
    right:  Expression,
    left:  Expression,}):BinaryExpression {
    return ((o["type"] = "BinaryExpression") && o) as BinaryExpression
  }
  NESTED["BinaryExpression"] = ["operator","right","left"]; 
  export function AssignmentExpression(o:{operator:  AssignmentOperator,
    right:  Expression,
    left:  Pattern,}):AssignmentExpression {
    return ((o["type"] = "AssignmentExpression") && o) as AssignmentExpression
  }
  NESTED["AssignmentExpression"] = ["operator","right","left"]; 
  export function LogicalExpression(o:{operator:  LogicalOperator,
    right:  Expression,
    left:  Expression,}):LogicalExpression {
    return ((o["type"] = "LogicalExpression") && o) as LogicalExpression
  }
  NESTED["LogicalExpression"] = ["operator","right","left"]; 
  export function MemberExpression(o:{property:  Expression,
    computed:  boolean,
    object:  Expression | Super,}):MemberExpression {
    return ((o["type"] = "MemberExpression") && o) as MemberExpression
  }
  NESTED["MemberExpression"] = ["property","object"]; 
  export function ConditionalExpression(o:{test:  Expression,
    alternate:  Expression,
    consequent:  Expression,}):ConditionalExpression {
    return ((o["type"] = "ConditionalExpression") && o) as ConditionalExpression
  }
  NESTED["ConditionalExpression"] = ["test","alternate","consequent"]; 
  export function CallExpression(o:{callee:  Expression | Super,
    arguments: (Expression | SpreadElement )[],}):CallExpression {
    return ((o["type"] = "CallExpression") && o) as CallExpression
  }
  NESTED["CallExpression"] = ["callee","arguments"]; 
  export function NewExpression(o:{callee:  Expression | Super,
    arguments: (Expression | SpreadElement )[],}):NewExpression {
    return ((o["type"] = "NewExpression") && o) as NewExpression
  }
  NESTED["NewExpression"] = ["callee","arguments"]; 
  export function SequenceExpression(o:{expressions: (Expression )[],}):SequenceExpression {
    return ((o["type"] = "SequenceExpression") && o) as SequenceExpression
  }
  NESTED["SequenceExpression"] = ["expressions"]; 
  export function ForOfStatement(o:{body:  Statement,
    right:  Expression,
    left:  VariableDeclaration |  Pattern,}):ForOfStatement {
    return ((o["type"] = "ForOfStatement") && o) as ForOfStatement
  }
  NESTED["ForOfStatement"] = ["body","right","left"]; 
  export function Super(o:{}):Super {
    return ((o["type"] = "Super") && o) as Super
  }
  NESTED["Super"] = []; 
  export function SpreadElement(o:{argument:  Expression,}):SpreadElement {
    return ((o["type"] = "SpreadElement") && o) as SpreadElement
  }
  NESTED["SpreadElement"] = ["argument"]; 
  export function ArrowFunctionExpression(o:{body:  BlockStatement | Expression,
    params: (Pattern )[],
    generator:  boolean,
    expression:  boolean,
    id?: Identifier | null}):ArrowFunctionExpression {
    return ((o["type"] = "ArrowFunctionExpression") && o) as ArrowFunctionExpression
  }
  NESTED["ArrowFunctionExpression"] = ["body","params","id"]; 
  export function YieldExpression(o:{argument?:  Expression | null,
    delegate:  boolean,}):YieldExpression {
    return ((o["type"] = "YieldExpression") && o) as YieldExpression
  }
  NESTED["YieldExpression"] = ["argument"]; 
  export function TemplateLiteral(o:{quasis: (TemplateElement )[],
    expressions: (Expression )[],}):TemplateLiteral {
    return ((o["type"] = "TemplateLiteral") && o) as TemplateLiteral
  }
  NESTED["TemplateLiteral"] = ["quasis","expressions"]; 
  export function TaggedTemplateExpression(o:{quasi:  TemplateLiteral,
    tag:  Expression,}):TaggedTemplateExpression {
    return ((o["type"] = "TaggedTemplateExpression") && o) as TaggedTemplateExpression
  }
  NESTED["TaggedTemplateExpression"] = ["quasi","tag"]; 
  export function TemplateElement(o:{tail:  boolean,
    value: {         cooked: string,         raw: string,     },}):TemplateElement {
    return ((o["type"] = "TemplateElement") && o) as TemplateElement
  }
  NESTED["TemplateElement"] = []; 
  export function AssignmentProperty(o:{kind:  "init",
    shorthand:  boolean,
    computed:  boolean,
    value:  Pattern,
    key:  Expression,
    method: boolean}):AssignmentProperty {
    return ((o["type"] = "AssignmentProperty") && o) as AssignmentProperty
  }
  NESTED["AssignmentProperty"] = ["value","key"]; 
  export function ObjectPattern(o:{properties: (AssignmentProperty )[],}):ObjectPattern {
    return ((o["type"] = "ObjectPattern") && o) as ObjectPattern
  }
  NESTED["ObjectPattern"] = ["properties"]; 
  export function ArrayPattern(o:{elements?: (Pattern | null )[],}):ArrayPattern {
    return ((o["type"] = "ArrayPattern") && o) as ArrayPattern
  }
  NESTED["ArrayPattern"] = ["elements"]; 
  export function RestElement(o:{argument:  Pattern,}):RestElement {
    return ((o["type"] = "RestElement") && o) as RestElement
  }
  NESTED["RestElement"] = ["argument"]; 
  export function AssignmentPattern(o:{right:  Expression,
    left:  Pattern,}):AssignmentPattern {
    return ((o["type"] = "AssignmentPattern") && o) as AssignmentPattern
  }
  NESTED["AssignmentPattern"] = ["right","left"]; 
  export function ClassBody(o:{body: (MethodDefinition )[],}):ClassBody {
    return ((o["type"] = "ClassBody") && o) as ClassBody
  }
  NESTED["ClassBody"] = ["body"]; 
  export function MethodDefinition(o:{kind:  "constructor" | "method" | "get" | "set",
    static:  boolean,
    computed:  boolean,
    key:  Expression,
    value:  FunctionExpression,}):MethodDefinition {
    return ((o["type"] = "MethodDefinition") && o) as MethodDefinition
  }
  NESTED["MethodDefinition"] = ["key","value"]; 
  export function ClassDeclaration(o:{body:  ClassBody,
    superClass?:  Expression | null,
    id:  Identifier,}):ClassDeclaration {
    return ((o["type"] = "ClassDeclaration") && o) as ClassDeclaration
  }
  NESTED["ClassDeclaration"] = ["body","superClass","id"]; 
  export function ClassExpression(o:{body:  ClassBody,
    id?:  Identifier | null,
    superClass?:  Expression | null,}):ClassExpression {
    return ((o["type"] = "ClassExpression") && o) as ClassExpression
  }
  NESTED["ClassExpression"] = ["body","id","superClass"]; 
  export function MetaProperty(o:{meta:  Identifier,
    property:  Identifier,}):MetaProperty {
    return ((o["type"] = "MetaProperty") && o) as MetaProperty
  }
  NESTED["MetaProperty"] = ["meta","property"]; 
  export function ImportDeclaration(o:{specifiers: (ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier )[],
    source:  Literal,}):ImportDeclaration {
    return ((o["type"] = "ImportDeclaration") && o) as ImportDeclaration
  }
  NESTED["ImportDeclaration"] = ["specifiers","source"]; 
  export function ImportSpecifier(o:{imported:  Identifier,
    local:  Identifier,}):ImportSpecifier {
    return ((o["type"] = "ImportSpecifier") && o) as ImportSpecifier
  }
  NESTED["ImportSpecifier"] = ["imported","local"]; 
  export function ImportDefaultSpecifier(o:{local:  Identifier,}):ImportDefaultSpecifier {
    return ((o["type"] = "ImportDefaultSpecifier") && o) as ImportDefaultSpecifier
  }
  NESTED["ImportDefaultSpecifier"] = ["local"]; 
  export function ImportNamespaceSpecifier(o:{local:  Identifier,}):ImportNamespaceSpecifier {
    return ((o["type"] = "ImportNamespaceSpecifier") && o) as ImportNamespaceSpecifier
  }
  NESTED["ImportNamespaceSpecifier"] = ["local"]; 
  export function ExportNamedDeclaration(o:{specifiers: (ExportSpecifier )[],
    declaration?:  Declaration | null,
    source?:  Literal | null,}):ExportNamedDeclaration {
    return ((o["type"] = "ExportNamedDeclaration") && o) as ExportNamedDeclaration
  }
  NESTED["ExportNamedDeclaration"] = ["specifiers","declaration","source"]; 
  export function ExportSpecifier(o:{local:  Identifier,
    exported:  Identifier,}):ExportSpecifier {
    return ((o["type"] = "ExportSpecifier") && o) as ExportSpecifier
  }
  NESTED["ExportSpecifier"] = ["local","exported"]; 
  export function ExportDefaultDeclaration(o:{declaration:  Declaration | Expression,}):ExportDefaultDeclaration {
    return ((o["type"] = "ExportDefaultDeclaration") && o) as ExportDefaultDeclaration
  }
  NESTED["ExportDefaultDeclaration"] = ["declaration"]; 
  export function ExportAllDeclaration(o:{source:  Literal,}):ExportAllDeclaration {
    return ((o["type"] = "ExportAllDeclaration") && o) as ExportAllDeclaration
  }
  NESTED["ExportAllDeclaration"] = ["source"]; 
  export function isIdentifier(n?:Node|null):n is Identifier { return n ? n.type === "Identifier" : false; }
  export function isLiteral(n?:Node|null):n is Literal { return n ? n.type === "Literal" : false; }
  export function isProgram(n?:Node|null):n is Program { return n ? n.type === "Program" : false; }
  export function isExpressionStatement(n?:Node|null):n is ExpressionStatement { return n ? n.type === "ExpressionStatement" : false; }
  export function isBlockStatement(n?:Node|null):n is BlockStatement { return n ? n.type === "BlockStatement" : false; }
  export function isEmptyStatement(n?:Node|null):n is EmptyStatement { return n ? n.type === "EmptyStatement" : false; }
  export function isDebuggerStatement(n?:Node|null):n is DebuggerStatement { return n ? n.type === "DebuggerStatement" : false; }
  export function isWithStatement(n?:Node|null):n is WithStatement { return n ? n.type === "WithStatement" : false; }
  export function isReturnStatement(n?:Node|null):n is ReturnStatement { return n ? n.type === "ReturnStatement" : false; }
  export function isLabeledStatement(n?:Node|null):n is LabeledStatement { return n ? n.type === "LabeledStatement" : false; }
  export function isBreakStatement(n?:Node|null):n is BreakStatement { return n ? n.type === "BreakStatement" : false; }
  export function isContinueStatement(n?:Node|null):n is ContinueStatement { return n ? n.type === "ContinueStatement" : false; }
  export function isIfStatement(n?:Node|null):n is IfStatement { return n ? n.type === "IfStatement" : false; }
  export function isSwitchStatement(n?:Node|null):n is SwitchStatement { return n ? n.type === "SwitchStatement" : false; }
  export function isSwitchCase(n?:Node|null):n is SwitchCase { return n ? n.type === "SwitchCase" : false; }
  export function isThrowStatement(n?:Node|null):n is ThrowStatement { return n ? n.type === "ThrowStatement" : false; }
  export function isTryStatement(n?:Node|null):n is TryStatement { return n ? n.type === "TryStatement" : false; }
  export function isCatchClause(n?:Node|null):n is CatchClause { return n ? n.type === "CatchClause" : false; }
  export function isWhileStatement(n?:Node|null):n is WhileStatement { return n ? n.type === "WhileStatement" : false; }
  export function isDoWhileStatement(n?:Node|null):n is DoWhileStatement { return n ? n.type === "DoWhileStatement" : false; }
  export function isForStatement(n?:Node|null):n is ForStatement { return n ? n.type === "ForStatement" : false; }
  export function isForInStatement(n?:Node|null):n is ForInStatement { return n ? n.type === "ForInStatement" : false; }
  export function isFunctionDeclaration(n?:Node|null):n is FunctionDeclaration { return n ? n.type === "FunctionDeclaration" : false; }
  export function isVariableDeclaration(n?:Node|null):n is VariableDeclaration { return n ? n.type === "VariableDeclaration" : false; }
  export function isVariableDeclarator(n?:Node|null):n is VariableDeclarator { return n ? n.type === "VariableDeclarator" : false; }
  export function isThisExpression(n?:Node|null):n is ThisExpression { return n ? n.type === "ThisExpression" : false; }
  export function isArrayExpression(n?:Node|null):n is ArrayExpression { return n ? n.type === "ArrayExpression" : false; }
  export function isObjectExpression(n?:Node|null):n is ObjectExpression { return n ? n.type === "ObjectExpression" : false; }
  export function isProperty(n?:Node|null):n is Property { return n ? n.type === "Property" : false; }
  export function isFunctionExpression(n?:Node|null):n is FunctionExpression { return n ? n.type === "FunctionExpression" : false; }
  export function isUnaryExpression(n?:Node|null):n is UnaryExpression { return n ? n.type === "UnaryExpression" : false; }
  export function isUpdateExpression(n?:Node|null):n is UpdateExpression { return n ? n.type === "UpdateExpression" : false; }
  export function isBinaryExpression(n?:Node|null):n is BinaryExpression { return n ? n.type === "BinaryExpression" : false; }
  export function isAssignmentExpression(n?:Node|null):n is AssignmentExpression { return n ? n.type === "AssignmentExpression" : false; }
  export function isLogicalExpression(n?:Node|null):n is LogicalExpression { return n ? n.type === "LogicalExpression" : false; }
  export function isMemberExpression(n?:Node|null):n is MemberExpression { return n ? n.type === "MemberExpression" : false; }
  export function isConditionalExpression(n?:Node|null):n is ConditionalExpression { return n ? n.type === "ConditionalExpression" : false; }
  export function isCallExpression(n?:Node|null):n is CallExpression { return n ? n.type === "CallExpression" : false; }
  export function isNewExpression(n?:Node|null):n is NewExpression { return n ? n.type === "NewExpression" : false; }
  export function isSequenceExpression(n?:Node|null):n is SequenceExpression { return n ? n.type === "SequenceExpression" : false; }
  export function isForOfStatement(n?:Node|null):n is ForOfStatement { return n ? n.type === "ForOfStatement" : false; }
  export function isSuper(n?:Node|null):n is Super { return n ? n.type === "Super" : false; }
  export function isSpreadElement(n?:Node|null):n is SpreadElement { return n ? n.type === "SpreadElement" : false; }
  export function isArrowFunctionExpression(n?:Node|null):n is ArrowFunctionExpression { return n ? n.type === "ArrowFunctionExpression" : false; }
  export function isYieldExpression(n?:Node|null):n is YieldExpression { return n ? n.type === "YieldExpression" : false; }
  export function isTemplateLiteral(n?:Node|null):n is TemplateLiteral { return n ? n.type === "TemplateLiteral" : false; }
  export function isTaggedTemplateExpression(n?:Node|null):n is TaggedTemplateExpression { return n ? n.type === "TaggedTemplateExpression" : false; }
  export function isTemplateElement(n?:Node|null):n is TemplateElement { return n ? n.type === "TemplateElement" : false; }
  export function isAssignmentProperty(n?:Node|null):n is AssignmentProperty { return n ? n.type === "AssignmentProperty" : false; }
  export function isObjectPattern(n?:Node|null):n is ObjectPattern { return n ? n.type === "ObjectPattern" : false; }
  export function isArrayPattern(n?:Node|null):n is ArrayPattern { return n ? n.type === "ArrayPattern" : false; }
  export function isRestElement(n?:Node|null):n is RestElement { return n ? n.type === "RestElement" : false; }
  export function isAssignmentPattern(n?:Node|null):n is AssignmentPattern { return n ? n.type === "AssignmentPattern" : false; }
  export function isClassBody(n?:Node|null):n is ClassBody { return n ? n.type === "ClassBody" : false; }
  export function isMethodDefinition(n?:Node|null):n is MethodDefinition { return n ? n.type === "MethodDefinition" : false; }
  export function isClassDeclaration(n?:Node|null):n is ClassDeclaration { return n ? n.type === "ClassDeclaration" : false; }
  export function isClassExpression(n?:Node|null):n is ClassExpression { return n ? n.type === "ClassExpression" : false; }
  export function isMetaProperty(n?:Node|null):n is MetaProperty { return n ? n.type === "MetaProperty" : false; }
  export function isImportDeclaration(n?:Node|null):n is ImportDeclaration { return n ? n.type === "ImportDeclaration" : false; }
  export function isImportSpecifier(n?:Node|null):n is ImportSpecifier { return n ? n.type === "ImportSpecifier" : false; }
  export function isImportDefaultSpecifier(n?:Node|null):n is ImportDefaultSpecifier { return n ? n.type === "ImportDefaultSpecifier" : false; }
  export function isImportNamespaceSpecifier(n?:Node|null):n is ImportNamespaceSpecifier { return n ? n.type === "ImportNamespaceSpecifier" : false; }
  export function isExportNamedDeclaration(n?:Node|null):n is ExportNamedDeclaration { return n ? n.type === "ExportNamedDeclaration" : false; }
  export function isExportSpecifier(n?:Node|null):n is ExportSpecifier { return n ? n.type === "ExportSpecifier" : false; }
  export function isExportDefaultDeclaration(n?:Node|null):n is ExportDefaultDeclaration { return n ? n.type === "ExportDefaultDeclaration" : false; }
  export function isExportAllDeclaration(n?:Node|null):n is ExportAllDeclaration { return n ? n.type === "ExportAllDeclaration" : false; }
  export function isFunction(n:Node):n is BaseFunction { return n.type === "FunctionDeclaration" || n.type === "FunctionExpression" || n.type === "ArrowFunctionExpression" || n.type === "BaseFunction" }
  export function isForLoop(n:Node):n is ForStatement|ForInStatement|ForOfStatement { return n.type === "ForStatement" || n.type === "ForInStatement" || n.type === "ForOfStatement" }

  export interface NodeHandler<T> {
    Identifier?:(node?:Identifier, ref?:T)=>(Node|void|null)
    IdentifierEnd?:(node?:Identifier, ref?:T)=>(Node|void|null)
    Literal?:(node?:Literal, ref?:T)=>(Node|void|null)
    LiteralEnd?:(node?:Literal, ref?:T)=>(Node|void|null)
    Program?:(node?:Program, ref?:T)=>(Node|void|null)
    ProgramEnd?:(node?:Program, ref?:T)=>(Node|void|null)
    ExpressionStatement?:(node?:ExpressionStatement, ref?:T)=>(Node|void|null)
    ExpressionStatementEnd?:(node?:ExpressionStatement, ref?:T)=>(Node|void|null)
    BlockStatement?:(node?:BlockStatement, ref?:T)=>(Node|void|null)
    BlockStatementEnd?:(node?:BlockStatement, ref?:T)=>(Node|void|null)
    EmptyStatement?:(node?:EmptyStatement, ref?:T)=>(Node|void|null)
    EmptyStatementEnd?:(node?:EmptyStatement, ref?:T)=>(Node|void|null)
    DebuggerStatement?:(node?:DebuggerStatement, ref?:T)=>(Node|void|null)
    DebuggerStatementEnd?:(node?:DebuggerStatement, ref?:T)=>(Node|void|null)
    WithStatement?:(node?:WithStatement, ref?:T)=>(Node|void|null)
    WithStatementEnd?:(node?:WithStatement, ref?:T)=>(Node|void|null)
    ReturnStatement?:(node?:ReturnStatement, ref?:T)=>(Node|void|null)
    ReturnStatementEnd?:(node?:ReturnStatement, ref?:T)=>(Node|void|null)
    LabeledStatement?:(node?:LabeledStatement, ref?:T)=>(Node|void|null)
    LabeledStatementEnd?:(node?:LabeledStatement, ref?:T)=>(Node|void|null)
    BreakStatement?:(node?:BreakStatement, ref?:T)=>(Node|void|null)
    BreakStatementEnd?:(node?:BreakStatement, ref?:T)=>(Node|void|null)
    ContinueStatement?:(node?:ContinueStatement, ref?:T)=>(Node|void|null)
    ContinueStatementEnd?:(node?:ContinueStatement, ref?:T)=>(Node|void|null)
    IfStatement?:(node?:IfStatement, ref?:T)=>(Node|void|null)
    IfStatementEnd?:(node?:IfStatement, ref?:T)=>(Node|void|null)
    SwitchStatement?:(node?:SwitchStatement, ref?:T)=>(Node|void|null)
    SwitchStatementEnd?:(node?:SwitchStatement, ref?:T)=>(Node|void|null)
    SwitchCase?:(node?:SwitchCase, ref?:T)=>(Node|void|null)
    SwitchCaseEnd?:(node?:SwitchCase, ref?:T)=>(Node|void|null)
    ThrowStatement?:(node?:ThrowStatement, ref?:T)=>(Node|void|null)
    ThrowStatementEnd?:(node?:ThrowStatement, ref?:T)=>(Node|void|null)
    TryStatement?:(node?:TryStatement, ref?:T)=>(Node|void|null)
    TryStatementEnd?:(node?:TryStatement, ref?:T)=>(Node|void|null)
    CatchClause?:(node?:CatchClause, ref?:T)=>(Node|void|null)
    CatchClauseEnd?:(node?:CatchClause, ref?:T)=>(Node|void|null)
    WhileStatement?:(node?:WhileStatement, ref?:T)=>(Node|void|null)
    WhileStatementEnd?:(node?:WhileStatement, ref?:T)=>(Node|void|null)
    DoWhileStatement?:(node?:DoWhileStatement, ref?:T)=>(Node|void|null)
    DoWhileStatementEnd?:(node?:DoWhileStatement, ref?:T)=>(Node|void|null)
    ForStatement?:(node?:ForStatement, ref?:T)=>(Node|void|null)
    ForStatementEnd?:(node?:ForStatement, ref?:T)=>(Node|void|null)
    ForInStatement?:(node?:ForInStatement, ref?:T)=>(Node|void|null)
    ForInStatementEnd?:(node?:ForInStatement, ref?:T)=>(Node|void|null)
    FunctionDeclaration?:(node?:FunctionDeclaration, ref?:T)=>(Node|void|null)
    FunctionDeclarationEnd?:(node?:FunctionDeclaration, ref?:T)=>(Node|void|null)
    VariableDeclaration?:(node?:VariableDeclaration, ref?:T)=>(Node|void|null)
    VariableDeclarationEnd?:(node?:VariableDeclaration, ref?:T)=>(Node|void|null)
    VariableDeclarator?:(node?:VariableDeclarator, ref?:T)=>(Node|void|null)
    VariableDeclaratorEnd?:(node?:VariableDeclarator, ref?:T)=>(Node|void|null)
    ThisExpression?:(node?:ThisExpression, ref?:T)=>(Node|void|null)
    ThisExpressionEnd?:(node?:ThisExpression, ref?:T)=>(Node|void|null)
    ArrayExpression?:(node?:ArrayExpression, ref?:T)=>(Node|void|null)
    ArrayExpressionEnd?:(node?:ArrayExpression, ref?:T)=>(Node|void|null)
    ObjectExpression?:(node?:ObjectExpression, ref?:T)=>(Node|void|null)
    ObjectExpressionEnd?:(node?:ObjectExpression, ref?:T)=>(Node|void|null)
    Property?:(node?:Property, ref?:T)=>(Node|void|null)
    PropertyEnd?:(node?:Property, ref?:T)=>(Node|void|null)
    FunctionExpression?:(node?:FunctionExpression, ref?:T)=>(Node|void|null)
    FunctionExpressionEnd?:(node?:FunctionExpression, ref?:T)=>(Node|void|null)
    UnaryExpression?:(node?:UnaryExpression, ref?:T)=>(Node|void|null)
    UnaryExpressionEnd?:(node?:UnaryExpression, ref?:T)=>(Node|void|null)
    UpdateExpression?:(node?:UpdateExpression, ref?:T)=>(Node|void|null)
    UpdateExpressionEnd?:(node?:UpdateExpression, ref?:T)=>(Node|void|null)
    BinaryExpression?:(node?:BinaryExpression, ref?:T)=>(Node|void|null)
    BinaryExpressionEnd?:(node?:BinaryExpression, ref?:T)=>(Node|void|null)
    AssignmentExpression?:(node?:AssignmentExpression, ref?:T)=>(Node|void|null)
    AssignmentExpressionEnd?:(node?:AssignmentExpression, ref?:T)=>(Node|void|null)
    LogicalExpression?:(node?:LogicalExpression, ref?:T)=>(Node|void|null)
    LogicalExpressionEnd?:(node?:LogicalExpression, ref?:T)=>(Node|void|null)
    MemberExpression?:(node?:MemberExpression, ref?:T)=>(Node|void|null)
    MemberExpressionEnd?:(node?:MemberExpression, ref?:T)=>(Node|void|null)
    ConditionalExpression?:(node?:ConditionalExpression, ref?:T)=>(Node|void|null)
    ConditionalExpressionEnd?:(node?:ConditionalExpression, ref?:T)=>(Node|void|null)
    CallExpression?:(node?:CallExpression, ref?:T)=>(Node|void|null)
    CallExpressionEnd?:(node?:CallExpression, ref?:T)=>(Node|void|null)
    NewExpression?:(node?:NewExpression, ref?:T)=>(Node|void|null)
    NewExpressionEnd?:(node?:NewExpression, ref?:T)=>(Node|void|null)
    SequenceExpression?:(node?:SequenceExpression, ref?:T)=>(Node|void|null)
    SequenceExpressionEnd?:(node?:SequenceExpression, ref?:T)=>(Node|void|null)
    ForOfStatement?:(node?:ForOfStatement, ref?:T)=>(Node|void|null)
    ForOfStatementEnd?:(node?:ForOfStatement, ref?:T)=>(Node|void|null)
    Super?:(node?:Super, ref?:T)=>(Node|void|null)
    SuperEnd?:(node?:Super, ref?:T)=>(Node|void|null)
    SpreadElement?:(node?:SpreadElement, ref?:T)=>(Node|void|null)
    SpreadElementEnd?:(node?:SpreadElement, ref?:T)=>(Node|void|null)
    ArrowFunctionExpression?:(node?:ArrowFunctionExpression, ref?:T)=>(Node|void|null)
    ArrowFunctionExpressionEnd?:(node?:ArrowFunctionExpression, ref?:T)=>(Node|void|null)
    YieldExpression?:(node?:YieldExpression, ref?:T)=>(Node|void|null)
    YieldExpressionEnd?:(node?:YieldExpression, ref?:T)=>(Node|void|null)
    TemplateLiteral?:(node?:TemplateLiteral, ref?:T)=>(Node|void|null)
    TemplateLiteralEnd?:(node?:TemplateLiteral, ref?:T)=>(Node|void|null)
    TaggedTemplateExpression?:(node?:TaggedTemplateExpression, ref?:T)=>(Node|void|null)
    TaggedTemplateExpressionEnd?:(node?:TaggedTemplateExpression, ref?:T)=>(Node|void|null)
    TemplateElement?:(node?:TemplateElement, ref?:T)=>(Node|void|null)
    TemplateElementEnd?:(node?:TemplateElement, ref?:T)=>(Node|void|null)
    AssignmentProperty?:(node?:AssignmentProperty, ref?:T)=>(Node|void|null)
    AssignmentPropertyEnd?:(node?:AssignmentProperty, ref?:T)=>(Node|void|null)
    ObjectPattern?:(node?:ObjectPattern, ref?:T)=>(Node|void|null)
    ObjectPatternEnd?:(node?:ObjectPattern, ref?:T)=>(Node|void|null)
    ArrayPattern?:(node?:ArrayPattern, ref?:T)=>(Node|void|null)
    ArrayPatternEnd?:(node?:ArrayPattern, ref?:T)=>(Node|void|null)
    RestElement?:(node?:RestElement, ref?:T)=>(Node|void|null)
    RestElementEnd?:(node?:RestElement, ref?:T)=>(Node|void|null)
    AssignmentPattern?:(node?:AssignmentPattern, ref?:T)=>(Node|void|null)
    AssignmentPatternEnd?:(node?:AssignmentPattern, ref?:T)=>(Node|void|null)
    ClassBody?:(node?:ClassBody, ref?:T)=>(Node|void|null)
    ClassBodyEnd?:(node?:ClassBody, ref?:T)=>(Node|void|null)
    MethodDefinition?:(node?:MethodDefinition, ref?:T)=>(Node|void|null)
    MethodDefinitionEnd?:(node?:MethodDefinition, ref?:T)=>(Node|void|null)
    ClassDeclaration?:(node?:ClassDeclaration, ref?:T)=>(Node|void|null)
    ClassDeclarationEnd?:(node?:ClassDeclaration, ref?:T)=>(Node|void|null)
    ClassExpression?:(node?:ClassExpression, ref?:T)=>(Node|void|null)
    ClassExpressionEnd?:(node?:ClassExpression, ref?:T)=>(Node|void|null)
    MetaProperty?:(node?:MetaProperty, ref?:T)=>(Node|void|null)
    MetaPropertyEnd?:(node?:MetaProperty, ref?:T)=>(Node|void|null)
    ImportDeclaration?:(node?:ImportDeclaration, ref?:T)=>(Node|void|null)
    ImportDeclarationEnd?:(node?:ImportDeclaration, ref?:T)=>(Node|void|null)
    ImportSpecifier?:(node?:ImportSpecifier, ref?:T)=>(Node|void|null)
    ImportSpecifierEnd?:(node?:ImportSpecifier, ref?:T)=>(Node|void|null)
    ImportDefaultSpecifier?:(node?:ImportDefaultSpecifier, ref?:T)=>(Node|void|null)
    ImportDefaultSpecifierEnd?:(node?:ImportDefaultSpecifier, ref?:T)=>(Node|void|null)
    ImportNamespaceSpecifier?:(node?:ImportNamespaceSpecifier, ref?:T)=>(Node|void|null)
    ImportNamespaceSpecifierEnd?:(node?:ImportNamespaceSpecifier, ref?:T)=>(Node|void|null)
    ExportNamedDeclaration?:(node?:ExportNamedDeclaration, ref?:T)=>(Node|void|null)
    ExportNamedDeclarationEnd?:(node?:ExportNamedDeclaration, ref?:T)=>(Node|void|null)
    ExportSpecifier?:(node?:ExportSpecifier, ref?:T)=>(Node|void|null)
    ExportSpecifierEnd?:(node?:ExportSpecifier, ref?:T)=>(Node|void|null)
    ExportDefaultDeclaration?:(node?:ExportDefaultDeclaration, ref?:T)=>(Node|void|null)
    ExportDefaultDeclarationEnd?:(node?:ExportDefaultDeclaration, ref?:T)=>(Node|void|null)
    ExportAllDeclaration?:(node?:ExportAllDeclaration, ref?:T)=>(Node|void|null)
    ExportAllDeclarationEnd?:(node?:ExportAllDeclaration, ref?:T)=>(Node|void|null)
    Function?:(node?:BaseFunction, ref?:T)=>(Node|void|null)
    FunctionEnd?:(node?:BaseFunction, ref?:T)=>(Node|void|null)
    ForLoop?:(node?:ForStatement|ForInStatement|ForOfStatement, ref?:T)=>(Node|void|null)
    ForLoopEnd?:(node?:ForStatement|ForInStatement|ForOfStatement, ref?:T)=>(Node|void|null)

  }
}
