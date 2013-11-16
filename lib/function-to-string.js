var esprima = require('esprima');
// TODO: Document how this could be done via regexp but esprima is more accurate
function functionToString(fn) {
  var fnStr = fn.toString();
  var fnAst;
  try {
    var ast = esprima.parse(fnStr, {
      range: true
    });
    fnAst = ast.body[0];
  } catch (e) {
    fnStr = 'var x = ' + fnStr;
    var ast = esprima.parse(fnStr, {
      range: true
    });
    fnAst = ast.body[0].declarations[0].init;
  }
  var fnBodyAst = fnAst.body;

  return {
    // TODO: Native code?
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