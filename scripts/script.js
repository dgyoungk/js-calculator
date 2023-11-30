function Calculator() {
    this.method = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b
    },

    this.addMethod = (name, func) => {
        this.method[name] = func;
    },

    this.calculate = (str) => {
        let expr = str.split(' ');
        return this.method[expr[1]](+expr[0], +expr[2]);
    }
}

let calc = new Calculator();

let lhs;
let operator;
let rhs;