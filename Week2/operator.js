function add() {

    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    let sum = num1 + num2;
    document.getElementById("result").innerHTML =
        "Addition: " + sum;
}
function subtract() {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    let difference = num1 - num2;

    document.getElementById("result").innerHTML =
        "Subtraction: " + difference;
}
function multiply() {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    let product = num1 * num2;
    document.getElementById("result").innerHTML =
        "Multiplication: " + product;
}
function divide() {
    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);
    let division = num1 / num2;
    document.getElementById("result").innerHTML =
        "Division: " + division;
}