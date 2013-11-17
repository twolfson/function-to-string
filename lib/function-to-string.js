var esprima = require('esprima');
function functionToString(fn) {
  // By default, assume fn is function source code
  var fnStr = fn;

  // If it is a function, downcast it to a string
  if (typeof fn === 'function') {
    fnStr = fn.toString();
  }


  var fnAst;
  try {
    // Attempt to parse the AST
    var ast = esprima.parse(fnStr, {
      range: true
    });
    fnAst = ast.body[0];
  } catch (e) {
    // If there was an issue, try again with variable assignment
    // DEV: This handles anonymous funcitons (`function () {}`)
    fnStr = 'var x = ' + fnStr;
    var ast = esprima.parse(fnStr, {
      range: true
    });
    fnAst = ast.body[0].declarations[0].init;
  }

  // Extract the function body from the fnAst
  console.log(fnAst);
  var fnBodyAst = fnAst.body;

  // Prepare and return the function information
  return {
    // TODO: Native code?
    // TODO: This probably won't work cross-browser
    name: fn.name,
    params: fnAst.params.map(function getName(paramAst) {
      return paramAst.name;
    }),
    body: fnStr.slice(fnBodyAst.range[0] + 1, fnBodyAst.range[1] - 1)
  };
}

module.exports = functionToString;