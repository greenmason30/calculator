let num0 = '0';
let num1 = '0';
let currNum = 0;
let operator = '';
let total = 0;
const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const MAX_DISPLAY_LEN = 9;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

function organizeButtons() {
    const numRows = 5;
    const numCols = 4;
    const btnGap = 10;
    const buttonDiv = document.querySelector(".buttons");
    buttonDiv.style.gap = `${btnGap}px`;
    const btnHeight = (buttonDiv.offsetHeight) / numRows;
    const btnWidth = (buttonDiv.offsetWidth) / numCols;
    for (btn of buttons) {
        btn.style.height = `${btnHeight - btnGap}px`;
        btn.style.width = `${btnWidth - btnGap}px`;
        if (btn.className === "equals") {
            btn.style.width = `${2*btnWidth - btnGap}px`;
        }
    }
}

function calculate(a, op, b) {
    switch (op) {
        case "÷":
            return b === 0 ? "bruh" : divide(a, b);
        case "×":
            return multiply(a, b)
        case "−":
            return subtract(a, b);
        case "+":
            return add(a, b);
    }
}

function updateDisplay(num) {
    if (num.length > MAX_DISPLAY_LEN) {
        num = num.substr(-MAX_DISPLAY_LEN);
    }
    display.innerHTML = num ? num : '0';
}

function resetCalc() {
    currNum = 0;
    num0 = '0';
    num1 = '0';
    operator = '';
    total = 0;
    updateDisplay(num0);
}

function operatorSelected(opBtn) {
    currNum = 1;
    if (operator.length !== 0) {
        updateDisplay(total);
    }

    operator = opBtn.innerHTML;
    if (total !== 0) {
        num0 = total;
        num1 = '0';
    }
}

function equalsSelected() {
    if (currNum !== 0) {
        currNum = 0;
        if (total.toString().length >= 8) {
            total = total.toExponential();
        }
        updateDisplay(total);
        num0 = total;
        num1 = '0';
        operator = '';
    }
}

function btnClicked() {
    let className = this.className;
    if (className.includes("num") || className.includes("percent")) {
        const btn = this.innerHTML;
        if (operator.length === 0) {
            currNum = 0;
            if (className.includes("percent")) {
                num0 = num0 / 100;
                total = num0;
            }
            else if (btn !== '.' || !num0.includes('.') )
                num0 = (num0 != '0') ? num0 + btn : btn;
            updateDisplay(num0);
        }
        else {
            currNum = 1;
            if (className.includes("percent"))
                num1 = num1 / 100;
            else if (btn !== '.' || !num1.includes('.'))
                num1 = (num1 != '0') ? num1 + btn : btn;
            updateDisplay(num1);
            total = calculate(Number(num0), operator, Number(num1));
        }
    }
    else if (className.includes("operator")) {
        operatorSelected(this);
    }
    else if (className.includes("equals")) {
        equalsSelected();
    }
    else if (className.includes("all-clear")) {
        resetCalc();
    }
    else if (className.includes("clear-entry")) {
        switch (currNum) {
            case 0:
                num0 = '0';
                updateDisplay(num0);
                break;
            case 1:
                num1 = '0';
                updateDisplay(num1);
                break;
        }
    }
}

function keyClicked(e) {
    console.log(e);
    let keyNum = Number(e.key);
    if (!isNaN(keyNum)) {
        Array(...buttons).filter((btn) => btn.textContent === e.key)[0].click();
    }
    else if (e.key === "%") {
        Array(...buttons).filter((btn) => btn.textContent === e.key)[0].click();
    }
    else if (e.key === "Escape") {
        resetCalc();
    }
    else if (e.key === "Backspace") {
        if (currNum === 0) {
            num0 = num0.slice(0, -1);
            updateDisplay(num0);
        }
        else {
            num1 = num1.slice(0, -1)
            updateDisplay(num1);
        }
    }
    else if (["Enter", "="].includes(e.key)) {
        equalsSelected();
    }
    else if (["/", "*", "-", "+"].includes(e.key)) {
        let op = e.key;
        switch (e.key) {
            case "/":
                op = "÷";
                break;
            case "*":
                op = "×";
                break;
            case "-":
                op = "−"
                break;
        }
        let opBtn = Array(...buttons).filter((btn) => btn.textContent === op)[0];
        operatorSelected(opBtn);
    }
}

// ********************** //
//         MAIN           //
// ********************** //
organizeButtons();
buttons.forEach(btn => {
    btn.addEventListener("click", btnClicked);
});
document.addEventListener("keydown", keyClicked);
display.innerHTML = num0;