// global variables
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
        if (operator === '/' && rhs === '0') {
            alert("Dividing by 0 is impossible");
        } else {
            return this.method[operator](+lhs, +rhs);
        }
        
    }
}


// helper functions
function getDisplay() {
    return document.querySelector('.display p');
}

function getButtons() {
    return document.querySelectorAll('button');
}

function equalButtonPressedLast() {
    return operator === '=';
}

function resetCalculator() {
    lhs = '';
    rhs = '';
    operator = '';
    isDecimal = false;
    isOperatorSet = false;
}

function calculate() {
    let calc = new Calculator();
    const calcResult = getDisplay();
    display = calc.operate(lhs, operator, rhs);
    if (display !== undefined) {
        lhs = String(display);
        rhs = '';
        isDecimal = false;
        isOperatorSet = false;
        // checks for a decimal; if so, then returns the first 3 digits
        if (String(display).includes('.')) {
            display = String(+display.toFixed(3));
        }
        calcResult.textContent = display;
    } else { 
        // when the user tries to divide by 0
        resetCalculator();
        calcResult.textContent = initialDisplay;
    }
}

function chainOperation() {
    let calc = new Calculator();
    const calcResult = getDisplay();
    display = calc.operate(lhs, operator, rhs);
    if (display !== undefined) {
        lhs = String(display);
        rhs = '';
        isDecimal = false;
        // checks for a decimal; if so, then returns the first 3 digits
        if (String(display).includes('.')) {
            display = String(+display.toFixed(3));
        }
        calcResult.textContent = lhs;
    } else { 
        // when the user tries to divide by 0
        resetCalculator();
        calcResult.textContent = initialDisplay;
    }
}

// DOM manipulations
let buttonText = ["A/C", "+/-", "DEL", "+", 7, 8, 9, '-', 4, 5, 6, '*', 1, 2, 3, '/', 0, '.', '='];

function createCalculator() {
    createButtons();
    styleButtons();
    attachMiscButtonEvents();
    attachNumberButtonEvents();
    attachOperationEvents();
    attachKeyboardEvents();
}

function createButtons() {
    const btnContainer = document.querySelector('.btns');
    for (let i = 0; i < 19; i++) {
        const btn = document.createElement('button');
        if (typeof buttonText[i] === "number") {
            btn.classList.toggle('num-btn');
        } else if (buttonText[i].length > 2) {
            btn.classList.toggle('misc-btn');
            // adding a special class for the +/- button
            if (buttonText[i] === '+/-') {
                btn.classList.toggle('plus-minus');
            }
        } else {
            btn.classList.toggle('op-btn');
        }

        buttonText[i] === 0 ? btn.style.width = '250px' : btn.style.width = '125px';
        btn.style.height = '80px';
        btn.style.border = "2px solid black";
        btn.style.fontSize = '32px';
        btn.style.borderRadius = '10px';
        btn.innerText = buttonText[i];
        /*
            TODO:
            figure out the condition to set the class for number buttons and operator buttons 
        */
        btnContainer.appendChild(btn);
    }    
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
            case 'misc-btn plus-minus':
                button.style.backgroundColor = '#1B998B';
                break;
            case 'op-btn':
                button.style.backgroundColor = '#BCAA99';
                break;
            case 'num-btn':
                button.style.backgroundColor = '#5C5D67';
        }
        if (button.innerText === '.') {
            button.style.backgroundColor = '#5C5D67';
        }
    }
}


// handles click events
function attachMiscButtonEvents() {
    const miscs = document.querySelectorAll('.misc-btn');
    let result = getDisplay();
    for (const miscBtn of miscs) {
        miscBtn.addEventListener('click', (e) => {
            switch(e.target.innerText) {
                case 'A/C': // reset everything
                    result.textContent = initialDisplay;
                    resetCalculator();
                    break;
                case '+/-': 
                    if (!isOperatorSet || operator !== '=') {
                        if (+result.textContent < 0) {
                            if (isOperatorSet) {
                                rhs = String(Math.abs(+rhs));
                                result.textContent = rhs;
                            } else {
                                lhs = String(Math.abs(+lhs));
                                result.textContent = lhs;
                            }       
                        } else {
                            if (isOperatorSet) {
                                rhs = String(Math.abs(+rhs) * -1);
                                result.textContent = rhs;
                            } else {
                                lhs = String(Math.abs(+lhs) * -1);
                                result.textContent = lhs;
                            }
                        }
                    }
                    break; 
                case 'DEL':
                    !isOperatorSet ? lhs = lhs.split('').slice(0, lhs.length - 1).join('') :
                                         rhs = rhs.split('').slice(0, rhs.length - 1).join('');
                    if (!lhs && !isOperatorSet) {
                        result.textContent = initialDisplay;
                    } else {
                        result.textContent = result.textContent.slice(0, result.textContent.length - 1);
                    }
                    
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
            if (equalButtonPressedLast()) {
                resetCalculator();
            }
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
    for (const op of ops) {
        op.addEventListener('click', (e) => {
            if (op.innerText === '=') {
                calculate();
                operator = e.target.innerText;
            } else if (op.innerText === '.') {
                if (!calcView.textContent.includes(op.innerText) || isOperatorSet) {
                    isOperatorSet ? rhs += op.innerText : lhs += op.innerText;
                    isDecimal = true;
                    calcView.textContent += op.innerText;
                } else {
                    op.diabled = true;
                }
            } else {
                if (isOperatorSet && lhs && rhs) {
                    chainOperation();
                    operator = e.target.innerText;
                } else {
                    operator = op.innerText;
                    isOperatorSet = true;
                    isDecimal = false;
                }
            }
        });
    }
}

// handles keyboard events
function attachKeyboardEvents() {
    let keyDisplay = getDisplay();
    /*
        TODO:
        - figure out the +/- thing
        - maybe add a condition for the ctrl key plus either plus or minus key
    */
    document.addEventListener('keydown', (e) => {
        const keyName = e.key;

        // number key handling
        if (+keyName || keyName === '0') {
            if (!isOperatorSet) {
                if (!lhs) {
                    lhs = keyName;
                    keyDisplay.textContent = lhs;
                } else {
                    lhs += keyName;
                    keyDisplay.textContent = lhs;
                }
            } else {
                if (!rhs) {
                    rhs += keyName;
                    keyDisplay.textContent = rhs;
                } else {
                    rhs += keyName;
                    keyDisplay.textContent += keyName;
                }
                
            }
        // operation & misc key handlers
        } else {
            // for keys that need modifiers
            if (e.shiftKey) {
                switch (keyName) {
                    case '*':
                        if (isOperatorSet && lhs && rhs) {
                            chainOperation();
                            operator = keyName;
                        } else {
                            operator = keyName;
                            isOperatorSet = true;
                            //keyDisplay.textContent += operator;
                        }
                        break;
                    case "+":
                        if (isOperatorSet && lhs && rhs) {
                            chainOperation();
                            operator = keyName;
                        } else {
                            operator = keyName;
                            isOperatorSet = true;
                            //keyDisplay.textContent += operator;
                        }
                        break;
                }
                
            // altkey used with the minus key to trigger +/-
            } else if (e.altKey) {
                if (keyName === '-') {
                    if (!isOperatorSet || operator !== '=') {
                        if (+keyDisplay.textContent < 0) {
                            if (isOperatorSet) {
                                rhs = String(Math.abs(+rhs));
                                keyDisplay.textContent = rhs;
                            } else {
                                lhs = String(Math.abs(+lhs));
                                keyDisplay.textContent = lhs;
                            }       
                        } else {
                            if (isOperatorSet) {
                                rhs = String(Math.abs(+rhs) * -1);
                                keyDisplay.textContent = rhs;
                            } else {
                                lhs = String(Math.abs(+lhs) * -1);
                                keyDisplay.textContent = lhs;
                            }
                        }
                    }
                }
            } else { // for keys that don't need modifiers
                switch (keyName) {
                    case '/':
                        e.preventDefault();
                        if (isOperatorSet && lhs && rhs) {
                            chainOperation();
                            operator = keyName;
                        } else {
                            operator = keyName;
                            isOperatorSet = true;
                            //keyDisplay.textContent += operator;
                        }
                        break;
                    case '-':
                        if (isOperatorSet && lhs && rhs) {
                            chainOperation();
                            operator = keyName;
                        } else {
                            operator = keyName;
                            isOperatorSet = true;
                            //keyDisplay.textContent += operator;
                        }
                        break;
                    // same as clicking 'DEL'
                    case 'Backspace':
                        e.preventDefault();
                        !operator ? lhs = lhs.split('').slice(0, lhs.length - 1).join('') :
                               rhs = rhs.split('').slice(0, rhs.length - 1).join('');
                        !lhs ? keyDisplay.textContent = initialDisplay :
                               keyDisplay.textContent = keyDisplay.textContent.slice(0, keyDisplay.textContent.length - 1);
                        break;
                    // same as clicking '='
                    case 'Enter':
                        e.preventDefault();
                        if (lhs && rhs && operator) {
                            calculate();
                            operator = '=';
                        } else {
                            alert("Oops, try again");
                        }
                        
                        break;
                    // same as clicking 'A/C'
                    case 'Escape':
                        e.preventDefault();
                        console.log(+keyName);
                        resetCalculator();
                        keyDisplay.textContent = initialDisplay;
                        break;
                    case '.':
                        if (operator) {
                            rhs += keyName;
                            isDecimal = true;
                            keyDisplay.textContent = rhs;
                        } else {
                            lhs += keyName;
                            isDecimal = true;
                            keyDisplay.textContent = lhs;
                        }
                        break;
                }
            }
        }        
    });
}

window.addEventListener('load', createCalculator);
