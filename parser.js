const core=require("./core")

module.exports.Parser=function(){
    let tokens = [];
    var position = 0;
    return {
        peek: () => {

            return tokens[position];
        },
        consume: () => {
            position++;
        },
        tokenizeExpression: function(str) {
            let res = [];
            let regexp = /([0-9]+|\S)/g;

            let token;

            while (token = regexp.exec(str)) {
                res.push(token[1]);
            }

            return res;
        },
        parsePrimaryExpr: function() {
            let t = this.peek();
            if (core.isNumber(t)) {
                this.consume(t);
                return { type: "number", value: t };
            } else if (t === "(") {
                this.consume(t);
                let expr = this.parseExpression();
                if (this.peek() !== ")")
                    throw new SyntaxError("Expected )");
                this.consume(")");
                return expr;
            }
        },
        parseMulExpr: function() {
            let expr = this.parsePrimaryExpr();
            let t = this.peek();
            while (t === "*" || t === "/") {
                this.consume(t);
                let rhs = this.parsePrimaryExpr();
                expr = { type: t, left: expr, right: rhs };
                t = this.peek();
            }
            return expr;
        },
        parseExpression: function() {
            let expr = this.parseMulExpr();
            let t = this.peek();
            while (t === "+" || t === "-") {
                this.consume(t);
                let rhs = this.parseMulExpr();
                expr = { type: t, left: expr, right: rhs };
                t = this.peek();
            }
            return expr;
        },
        parse: function(str) {
            tokens = this.tokenizeExpression(str);
            return this.parseExpression();
        }
    }

}
