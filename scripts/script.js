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

    this.operate = (lhs, operator, rhs) => {
        return this.method[operator](lhs, rhs);
    }
}

let lhs;
let operator;
let rhs;

// let operate = function(lhs, operator, rhs) {
//     let calc = new Calculator();

//     switch (operator) {
//         case "+":
//             console.log(calc.method[operator](lhs, rhs));
//             break;
//         case "-":
//             console.log(calc.method[operator](lhs, rhs));
//             break;
//         case "*":
//             console.log(calc.method[operator](lhs, rhs));
//             break;
//         case "/":
//             console.log(calc.method[operator](lhs, rhs));
//             break;
//     }
// };

let calc = new Calculator();
for (let i = 0; i < 5; i ++) {
    switch(Math.floor(Math.random() * 4)) {
        case 0:
            console.log(calc.operate(5, "+", 1));
            break;
        case 1:
            console.log(calc.operate(5, "-", 1));
            break;
        case 2:
            console.log(calc.operate(5, "*", 1));
            break;
        case 3:
            console.log(calc.operate(5, "/", 1));
            break;
    }
}

let buttonText = [1, 2, 3, "+", 4, 5, 6, '-', 7, 8, 9, '*', 0, '.', '=', '/'];

// DOM manipulations
function createButtons() {
    const btnContainer = document.querySelector('.btns');
    for (let i = 0; i < 16; i++) {
        const btn = document.createElement('button');
        btn.style.width = '125px';
        btn.style.height = '100px';
        btn.style.border = "1px solid black";
        btn.style.fontSize = '32px';
        btn.innerText = buttonText[i];
        /*
            TODO:
            figure out the condition to set the class for number buttons and operator buttons 
        */
        // if () {
        //     btn.classList.toggle('num-btn');
        // } else {
        //     btn.classList.toggle('op-btn');
        // }
        btnContainer.appendChild(btn);
    }
}




window.addEventListener('load', createButtons);
