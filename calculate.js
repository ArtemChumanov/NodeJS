const core=require("./core")
const parser=require("./parser")

const p = new parser.Parser();

module.exports.evaluateAsFloat=function(code) {
    debugger
    function evaluate(obj) {
        switch (obj.type) {
            case "number":  return parseInt(obj.value);
            case "+":  return core.add(evaluate(obj.left), evaluate(obj.right));break;
            case "-": return core.sub(evaluate(obj.left),evaluate(obj.right));break;
            case "*": return core.mul(evaluate(obj.left),evaluate(obj.right));break;
            case "/": return core.div(evaluate(obj.left),evaluate(obj.right));break;
        }
    }
    return evaluate(p.parse(code));
}
