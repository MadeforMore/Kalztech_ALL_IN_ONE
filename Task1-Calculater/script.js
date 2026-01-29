function calculate(operator) {
  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;
  const resultBox = document.getElementById("result");

  // Input validation
  if (num1 === "" || num2 === "") {
    resultBox.innerText = "Please enter both numbers";
    return;
  }

  const a = Number(num1);
  const b = Number(num2);
  let result;

  if (operator === "+") {
    result = a + b;
  } 
  else if (operator === "-") {
    result = a - b;
  } 
  else if (operator === "*") {
    result = a * b;
  } 
  else if (operator === "/") {
    if (b === 0) {
      resultBox.innerText = "Cannot divide by zero";
      return;
    }
    result = a / b;
  }

  resultBox.innerText = "Result: " + result;
}
