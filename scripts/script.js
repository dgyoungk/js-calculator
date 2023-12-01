let lhs = '';
let rhs = '';
let operator;
let operatorSet = false;
let isDecimal = false;
let initialDisplay = 0;


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
        return this.method[operator](+lhs, +rhs);
    }
}

function getDisplay() {
    return document.querySelector('.display p');
}

function getButtons() {
    return document.querySelectorAll('button');
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
        btn.style.border = "2px solid black";
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
    let result = getDisplay();
    for (const miscBtn of miscs) {
        miscBtn.addEventListener('click', (e) => {
            switch(e.target.innerText) {
                case 'A/C': // reset everything
                    result.textContent = initialDisplay;
                    lhs = '';
                    rhs = '';
                    operatorSet = false;
                    isDecimal = false;
                    operator = '';
                    break;
                case '+/-':
                    if (!operatorSet) {
                        if (+result.textContent < 0) {
                            result.textContent = `${Math.abs(+lhs)}`
                        } else {
                            result.textContent = `${Math.abs(+lhs) * -1}`;
                            lhs = String(Math.abs(+lhs) * -1);
                        }
                    } else {
                        e.target.disabled = true;
                    }
                    break; 
                case 'DEL':
                    !operatorSet ? lhs = lhs.slice(0, lhs.length - 1) : rhs = rhs.slice(0, rhs.length - 1);
                    if (lhs.length === 0 || rhs.length === 0) {
                        result.textContent = initialDisplay;
                    }
                    result.textContent = result.textContent.slice(0, result.textContent.length - 1);
                    break;
            }       
        });
    }
}

function attachNumberButtonEvents() {
    const numbers = document.querySelectorAll('.num-btn');
    let resultView = getDisplay();
    resultView.textContent = initialDisplay;
    for (const num of numbers) {
        num.addEventListener('click', () => {
            if (operatorSet) {
                isDecimal ? rhs += num.innerText : rhs = num.innerText;
                resultView.textContent += num.innerText;
            } else {
                isDecimal ? lhs += num.innerText : lhs = num.innerText;
                resultView.textContent = lhs;
            }
        })
    }
}

function attachOperationEvents() {
    const ops = document.querySelectorAll('.op-btn');
    let calcView = getDisplay();
    // create calculator object
    let calc = new Calculator();
    for (const op of ops) {
        op.addEventListener('click', () => {
            if (op.innerText === '=') {
                initialDisplay = calc.operate(lhs, operator, rhs);
                calcView.textContent = initialDisplay;
                lhs = initialDisplay;
                rhs = "0";
            } else if (op.innerText === '.') {
                if (!calcView.textContent.includes(op.innerText) || operatorSet) {
                    calcView.textContent += op.innerText;
                    operatorSet ? rhs += op.innerText : lhs += op.innerText;
                    isDecimal = true;
                } else {
                    op.diabled = true;
                }
            } else {
                operator = op.innerText;
                operatorSet = true;
                isDecimal = false;
                calcView.textContent += operator;
            }
        });
    }
}


window.addEventListener('load', createButtons);
