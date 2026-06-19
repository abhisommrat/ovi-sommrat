// ক্যালকুলেটর ফাংশন
let calcExpression = "";

function updateDisplay() {
    let display = document.getElementById("calcDisplay");
    if (display) {
        display.textContent = calcExpression || "0";
    }
}

function appendNumber(num) {
    calcExpression += num;
    updateDisplay();
}

function appendOperator(op) {
    if (calcExpression === "" && op !== "-") return;
    let lastChar = calcExpression.slice(-1);
    if (["+", "-", "*", "/", "%", "."].includes(lastChar)) {
        calcExpression = calcExpression.slice(0, -1);
    }
    calcExpression += op;
    updateDisplay();
}

function appendDot() {
    let parts = calcExpression.split(/[\+\-\*\/\%]/);
    let lastPart = parts[parts.length - 1];
    if (!lastPart.includes(".")) {
        calcExpression += ".";
        updateDisplay();
    }
}

function deleteLast() {
    calcExpression = calcExpression.slice(0, -1);
    updateDisplay();
}

function clearCalc() {
    calcExpression = "";
    updateDisplay();
    let history = document.getElementById("calcHistory");
    if (history) history.textContent = "";
}

function calculate() {
    if (calcExpression === "") return;
    let historyEl = document.getElementById("calcHistory");
    try {
        let result = eval(calcExpression);
        if (historyEl) historyEl.textContent = calcExpression + " =";
        calcExpression = String(result);
    } catch (e) {
        if (historyEl) historyEl.textContent = "ভুল!";
        calcExpression = "";
    }
    updateDisplay();
}

// কীবোর্ড
document.addEventListener("keydown", function(e) {
    if (!document.getElementById("calcDisplay")) return;
    let key = e.key;
    if (key >= "0" && key <= "9") appendNumber(key);
    else if (key === "+" || key === "-" || key === "*" || key === "/" || key === "%") appendOperator(key);
    else if (key === ".") appendDot();
    else if (key === "Enter" || key === "=") { e.preventDefault(); calculate(); }
    else if (key === "Backspace") deleteLast();
    else if (key === "Escape" || key === "c" || key === "C") clearCalc();
});
