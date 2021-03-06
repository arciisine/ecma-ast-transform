import {AST} from "./ast"

const ID_SIZE = 100000
const RND_SIZE = 1000
const SYM_PRE = "_gen"

let id_:number = new Date().getTime()%ID_SIZE;
  
export class Macro {

  static genSymbol(prefix?:string) {
    return (prefix||SYM_PRE)+(Math.trunc(Math.random()*RND_SIZE) * ID_SIZE + id_++); 
  }

  static Id(name?:string, prefix:boolean = false):AST.Identifier { 
    return AST.Identifier({name: (name && !prefix) ? name : Macro.genSymbol(name)}); 
  }
  static Literal(value:string|boolean|number|RegExp|null|undefined):AST.Literal { return AST.Literal({value}); }
	static Block(...body:(AST.Statement|null)[]):AST.BlockStatement {  
    return AST.BlockStatement({body:body.filter(x => !!x) as AST.BlockStatement[]});
  }
	static Expr(n:AST.Node):AST.ExpressionStatement { return AST.ExpressionStatement({expression:n}) }
	static Continue(label?:AST.Identifier):AST.ContinueStatement { return AST.ContinueStatement({label}); }
	static Noop():AST.Node { return Macro.Block(...[]) }

	static Return(e:AST.Expression):AST.ReturnStatement { return AST.ReturnStatement({argument:e}) }
	static Yield(e:AST.Expression, delegate:boolean = false):AST.YieldExpression {
    return AST.YieldExpression({argument:e, delegate});
  };

	static Array(...elements:AST.Pattern[]):AST.ArrayExpression  {
    return AST.ArrayExpression({elements});
  } 

	static Throw(e:AST.Expression):AST.ThrowStatement {return AST.ThrowStatement({argument:e}); };
  static Call(src:AST.Identifier|AST.Expression, ...args:AST.Expression[]):AST.CallExpression {
    return AST.CallExpression({callee:src, arguments:args.filter(x => !!x)});
  };

  static Labeled(label:AST.Identifier, body:AST.Statement):AST.LabeledStatement {
    return AST.LabeledStatement({ label, body });
  }

	static Assign(id:AST.Identifier, expr:AST.Expression, op:AST.AssignmentOperator = '='):AST.AssignmentExpression  {
    return AST.AssignmentExpression({
      left : id,
      operator : op,
      right : expr
    });
  }

	static BinaryExpr(left:AST.Expression, operator:AST.BinaryOperator, right:AST.Expression):AST.BinaryExpression {
    return AST.BinaryExpression({left, operator, right});
  }

  static UnaryExpr(op:AST.UnaryOperator, val:AST.Expression):AST.UnaryExpression {
    return AST.UnaryExpression({
      operator : op,
      prefix : true,
      argument : val
    });
  }

  static Negate(val:AST.Expression):AST.UnaryExpression {
    return Macro.UnaryExpr("!", val);
  }

  static ObjectExpr(pairs:{[key:string]:AST.Expression}, kind:'init'|'get'|'set' = 'init') {
    return AST.ObjectExpression({
        properties : Object.keys(pairs).map(k => 
          AST.Property({
            kind,
            method: false,
            computed : false,
            shorthand : false,
            key : Macro.Id(k),
            value :  pairs[k]
          }))
      })
  }

	static GetProperty(id:AST.Identifier|AST.Expression, prop:AST.Expression|string|number):AST.MemberExpression {
    return AST.MemberExpression({
      computed : typeof prop !== 'string',
      object : id,
      property : typeof prop === 'string' ? Macro.Id(prop) : ( typeof prop === 'number' ? Macro.Literal(prop) : prop),
    });
  }

	static Vars(...args):AST.VariableDeclaration {
    let kind:('var'|'const'|'let') = 'var';
    if (args[0] === 'var' || args[0] === 'let' || args[0] === 'const') {
      kind = args.shift();
    }
    let decls:AST.VariableDeclarator[] = [];
    if (Array.isArray(args[0])) {
      decls = args.map(x => AST.VariableDeclarator({id:x[0], init:x[1]}))
    } else {
      for (let i = 0; i < args.length; i+=2) {
        if (args[i] && i <=  args.length) {
          decls.push(AST.VariableDeclarator({id:args[i], init:args[i+1]}));
        }
      }
    }
    return AST.VariableDeclaration({kind, declarations: decls});
  }

  static Increment(id:AST.Identifier, increment:number = 1):AST.AssignmentExpression {
    return Macro.Assign(id, Macro.Literal(increment), '+=');
  }

  static ForLoop(id:AST.Identifier, init:AST.Expression, upto:AST.Expression, body:AST.Statement[], increment:number = 1):AST.ForStatement {
    return AST.ForStatement({
      init: Macro.Vars(id, init),
      test: Macro.BinaryExpr(id, '<', upto),
      update: Macro.Increment(id, increment),
      body: Macro.Block(...body)
    });
  }

  static TryCatchFinally(t:AST.Node[], c:AST.Node[] = [], f:AST.Node[] = []):AST.TryStatement {
    return AST.TryStatement({
      block :  Macro.Block(...t),
      handler : AST.CatchClause({
        param : Macro.Id(Macro.genSymbol()),
        body : Macro.Block(...c),
      }),
      finalizer : Macro.Block(...f)
    });
  }
  static Func(id:AST.Identifier, params:AST.Pattern[], body:(AST.Statement|null)[], generator:boolean = false):AST.FunctionDeclaration {
    return AST.FunctionDeclaration({
      id,
      params, 
      body : Macro.Block(...body), 
      generator
    });
  } 

  static FuncExpr(id:AST.Identifier, params:AST.Pattern[], body:AST.Node[], generator:boolean = false, expr:boolean = false):AST.FunctionExpression {
    return AST.FunctionExpression({
      id,
      params, 
      body : Macro.Block(...body), 
      generator
    });
  } 

  static IfThen(test:AST.Expression, body:AST.Node[], elseBody?:AST.Node[]):AST.IfStatement {
    return AST.IfStatement({
      test,
      consequent : Macro.Block(...body),
      alternate : elseBody ? Macro.Block(...elseBody) : null
    })
  } 
}