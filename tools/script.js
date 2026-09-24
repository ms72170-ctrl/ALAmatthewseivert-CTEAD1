const display = document.querySelector('#display');
const expression = document.querySelector('#expression');
const keys = document.querySelectorAll('.key');
const themeButton = document.querySelector('#themeButton');

let currentValue = '0';
let storedValue = null;
let pendingOperator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  display.textContent = currentValue;
}

function calculate(firstNumber, secondNumber, operator) {
  const first = Number(firstNumber);
  const second = Number(secondNumber);

  if (operator === '+') return first + second;
  if (operator === '−') return first - second;
  if (operator === '×') return first * second;
  if (operator === '÷') return second === 0 ? 'Error' : first / second;
  return second;
}

function formatResult(result) {
  if (result === 'Error') return result;
  return String(Number(result.toFixed(10)));
}

function enterValue(value) {
  if (currentValue === 'Error' || shouldResetDisplay) {
    currentValue = value === '.' ? '0.' : value;
    shouldResetDisplay = false;
  } else if (value === '.' && currentValue.includes('.')) {
    return;
  } else if (currentValue === '0' && value !== '.') {
    currentValue = value;
  } else {
    currentValue += value;
  }
  updateDisplay();
}

function chooseOperator(operator) {
  if (currentValue === 'Error') clearCalculator();

  if (storedValue !== null && pendingOperator && !shouldResetDisplay) {
    currentValue = formatResult(calculate(storedValue, currentValue, pendingOperator));
    updateDisplay();
  }

  storedValue = currentValue;
  pendingOperator = operator;
  shouldResetDisplay = true;
  expression.textContent = `${storedValue} ${operator}`;
}

function finishCalculation() {
  if (storedValue === null || pendingOperator === null) return;
  const answer = formatResult(calculate(storedValue, currentValue, pendingOperator));
  expression.textContent = `${storedValue} ${pendingOperator} ${currentValue} =`;
  currentValue = answer;
  storedValue = null;
  pendingOperator = null;
  shouldResetDisplay = true;
  updateDisplay();
}

function clearCalculator() {
  currentValue = '0';
  storedValue = null;
  pendingOperator = null;
  shouldResetDisplay = false;
  expression.textContent = 'Ready';
  updateDisplay();
}

function deleteValue() {
  if (shouldResetDisplay || currentValue === 'Error') return;
  currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
  updateDisplay();
}

function handleInput(value, action) {
  if (action === 'clear') return clearCalculator();
  if (action === 'delete') return deleteValue();
  if (action === 'calculate') return finishCalculation();
  if ('+−×÷'.includes(value)) return chooseOperator(value);
  if (value === '%') {
    currentValue = formatResult(Number(currentValue) / 100);
    updateDisplay();
    return;
  }
  enterValue(value);
}

keys.forEach((key) => {
  key.addEventListener('click', () => handleInput(key.dataset.value, key.dataset.action));
});

document.addEventListener('keydown', (event) => {
  const keyboardOperators = { '+': '+', '-': '−', '*': '×', '/': '÷' };
  if (/^[0-9.]$/.test(event.key)) handleInput(event.key);
  else if (keyboardOperators[event.key]) handleInput(keyboardOperators[event.key]);
  else if (event.key === 'Enter' || event.key === '=') handleInput(null, 'calculate');
  else if (event.key === 'Escape') handleInput(null, 'clear');
  else if (event.key === 'Backspace') handleInput(null, 'delete');
  else if (event.key === '%') handleInput('%');
});

themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
