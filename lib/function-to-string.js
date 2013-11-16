var esprima = require('esprima');
// TODO: Document how this could be done via regexp but esprima is more accurate
function functionToString(fn) {
  var fnStr = fn.toString();
  // console.log(fnStr);
  var ast = esprima.parse(fnStr, {
    range: true
  });
  var fnAst = ast.body[0];
  var fnBodyAst = fnAst.body;

  return {
    // TODO: This probably won't work cross-browser
    name: fn.name,
    params: fnAst.params.map(function getName(paramAst) {
      return paramAst.name;
    }),
    // TODO: I forsee problems with noop here
    body: fnStr.slice(fnBodyAst.range[0] + 1, fnBodyAst.range[1] - 1)
  };
}

module.exports = functionToString;