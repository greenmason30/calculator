let num1 = 0;
let num2 = 0;
let operator = 0;

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


const buttons = document.querySelector(".buttons");
const numButtons = buttons.children.length;
const numRows = 5;
const numCols = 4
const btnGap = 10
buttons.style.gap = `${btnGap}px`;
const btnHeight = (buttons.offsetHeight) / numRows;
const btnWidth = (buttons.offsetWidth) / numCols;
const allBtn = document.querySelectorAll("button");
for (btn of allBtn) {
    btn.style.height = `${btnHeight - btnGap}px`;
    btn.style.width = `${btnWidth - btnGap}px`;

    if (btn.id === "equals") {
        btn.style.width = `${2*btnWidth - btnGap}px`;
    }
}
console.log("wait");