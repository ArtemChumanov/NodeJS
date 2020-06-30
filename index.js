const calculate=require("./calculate")
const readline = require('readline-sync');

let number = calculate.evaluateAsFloat(readline.question("Enter the calculation: "));

console.log(number);
