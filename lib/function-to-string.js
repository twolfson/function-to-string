var esprima = require('esprima');
// TODO: Document how this could be done via regexp but esprima is more accurate
function functionToString(fn) {
  var fnStr = fn.toString();
  // console.log(fnStr);
  var ast = esprima.parse(fnStr, {
    range: true
  });
  var fnAst = ast.body;
  var fnBodyAst = fnAst[0].body;
  console.log(fnStr.slice(fnBodyAst.range[0], fnBodyAst.range[1]));

  return {
    // TODO: This probably won't work cross-browser
    name: fn.name,
    params: ast.params,
    body: ast.body
  };
}

module.exports = functionToString;