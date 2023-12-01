let lhs;
let operator;
let operatorSet = false;
let rhs;
let display = 12345;


// constructor for Calculator operations
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

let buttonText = ["A/C", "+/-", "DEL", "+", 1, 2, 3, '-', 4, 5, 6, '*', 7, 8, 9, '/', 0, '.', '='];

// DOM manipulations
function createButtons() {
    const btnContainer = document.querySelector('.btns');
    for (let i = 0; i < 19; i++) {
        const btn = document.createElement('button');
        if (typeof buttonText[i] === "number") {
            btn.classList.toggle('num-btn');
        } else if (buttonText[i].length > 2) {
            btn.classList.toggle('misc-btn');
        } else {
            btn.classList.toggle('op-btn');
        }

        buttonText[i] === 0 ? btn.style.width = '250px' : btn.style.width = '125px';
        btn.style.height = '80px';
        btn.style.border = "1px solid black";
        btn.style.fontSize = '32px';
        btn.innerText = buttonText[i];
        /*
            TODO:
            figure out the condition to set the class for number buttons and operator buttons 
        */
        btnContainer.appendChild(btn);
    }

    styleButtons();
    attachMiscButtonEvents();
    attachNumberButtonEvents();
    attachOperationEvents();
}

function styleButtons() {
    const buttons = getButtons();
    for (const button of buttons) {
        switch (button.className) {
            case 'misc-btn':
                if (button.innerText === "A/C") {
                    button.style.backgroundColor = '#E71D36';
                } else {
                    button.style.backgroundColor = '#1B998B';
                }
                break;
            case 'op-btn':
                button.style.backgroundColor = '#BCAA99';
                break;
            case 'num-btn':
                button.style.backgroundColor = '#5C5D67';
        }
    }
}

function attachMiscButtonEvents() {
    // for misc buttons, use arrow functions
    const miscs = document.querySelectorAll('.misc-btn');
    for (const miscBtn of miscs) {
        miscBtn.addEventListener('click', (e) => {
            let result = document.querySelector('.display p');
            switch(e.target.innerText) {
                case 'A/C':
                    result.textContent = '';
                    break;
                case '+/-':
                    if (+result.textContent < 0) {
                        result.textContent = `${Math.abs(display)}`;
                    } else {
                        result.textContent = `${Math.abs(display) * -1}`;
                    }
                    break; 
                case 'DEL':
                    result.textContent = result.textContent.slice(0, result.textContent.length - 1);
                    break;
            }       
        });
    }
}

function attachNumberButtonEvents() {
    const numbers = document.querySelectorAll('.num-btn');
    for (const num of numbers) {
    }
}

function attachOperationEvents() {
    const ops = document.querySelectorAll('.op-btn');
    let calcView = document.querySelector('.display p');
    // create calculator object
    let calc = new Calculator();
    for (const op of ops) {
        op.addEventListener('click', () => {
            switch(op.innerText) {
                case "+":
                    operator = op.innerText;
                    operatorSet = true;
                    break;
                case "-":
                    operator = op.innerText;
                    operatorSet = true;
                    break;
                case "*":
                    operator = op.innerText;
                    operatorSet = true;
                    break;
                case "/":
                    operator = op.innerText;
                    operatorSet = true;
                    break;
                case '=':
                    display = calc.operate(lhs, operator, rhs);
                    calcView.textContent = display;
                    // add logic here to do the calculation and display the result
                    break;
                case '.':
                    calcView.textContent += '.';
                    break;
                    
            }
        });
    }
}


window.addEventListener('load', createButtons);
