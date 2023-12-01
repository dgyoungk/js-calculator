let lhs = '';
let rhs = '';
let operator;
let isOperatorSet = false;
let isDecimal = false;
let initialDisplay = 0;
let display = 0;


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
                    isOperatorSet = false;
                    isDecimal = false;
                    operator = '';
                    break;
                case '+/-':
                    if (!isOperatorSet) {
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
                    !isOperatorSet ? lhs = lhs.split('').slice(0, lhs.length - 1).join('') :
                                         rhs = rhs.split('').slice(0, rhs.length - 1).join('');
                    if (lhs.length === 0 && !isOperatorSet) {
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
            if (isOperatorSet) {
                if (isDecimal) {
                    rhs += num.innerText;
                    resultView.textContent += num.innerText;
                } else {
                    if (rhs.length >= 1) {
                        rhs += num.innerText;
                        resultView.textContent += num.innerText;
                    } else {
                        rhs = num.innerText;
                        resultView.textContent = num.innerText;
                    }
                }
                
            } else {
                if (isDecimal) {
                    lhs += num.innerText
                } else {
                    if (lhs.length >= 1) {
                        lhs += num.innerText;
                    } else {
                        lhs = num.innerText;
                    }
                }
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
        op.addEventListener('click', (e) => {
            if (op.innerText === '=') {
                display = calc.operate(lhs, operator, rhs);
                calcView.textContent = display;
                lhs = String(display);
                rhs = "";
                isOperatorSet = false;
                isDecimal = false;
            } else if (op.innerText === '.') {
                if (!calcView.textContent.includes(op.innerText) || isOperatorSet) {
                    calcView.textContent += op.innerText;
                    isOperatorSet ? rhs += op.innerText : lhs += op.innerText;
                    isDecimal = true;
                } else {
                    op.diabled = true;
                }
            } else {
                if (isOperatorSet) {
                    // multiple operations: does operation before a rhs variable is set;
                    // figure out how to set the rhs variable first before operating
                    display = calc.operate(lhs, operator, rhs);
                    lhs = String(display);
                    rhs = "";
                    isDecimal = false;
                    calcView.textContent = lhs;
                } else {
                    operator = op.innerText;
                    isOperatorSet = true;
                    isDecimal = false;
                }
            }
        });
    }
}


window.addEventListener('load', createButtons);
