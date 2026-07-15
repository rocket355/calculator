let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousValue = '';
let shouldResetDisplay = false;

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' && previousValue === '') {
        return;
    }

    if (operator !== '' && currentInput !== '') {
        calculate();
    }

    operator = op;
    previousValue = currentInput;
    currentInput = '';
    shouldResetDisplay = true;
}

function calculate() {
    if (operator === '' || currentInput === '' || previousValue === '') {
        return;
    }

    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                display.value = 'Error: Division by zero';
                resetCalculator();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousValue = '';
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    operator = '';
    previousValue = '';
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    if (currentInput === '') {
        display.value = operator !== '' ? previousValue : '0';
    } else {
        display.value = currentInput;
    }
}

function resetCalculator() {
    currentInput = '';
    operator = '';
    previousValue = '';
    shouldResetDisplay = false;
}

// Initialize display
updateDisplay();