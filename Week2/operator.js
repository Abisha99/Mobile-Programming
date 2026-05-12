function calculate(operation) {

    let num1 = Number(document.getElementById("num1").value);
    let num2 = Number(document.getElementById("num2").value);

    let result;

    if (operation == "add") {
        result = num1 + num2;
        document.getElementById("result").innerHTML =
            "Addition: " + result;
    }

    else if (operation == "subtract") {
        result = num1 - num2;
        document.getElementById("result").innerHTML =
            "Subtraction: " + result;
    }

    else if (operation == "multiply") {
        result = num1 * num2;
        document.getElementById("result").innerHTML =
            "Multiplication: " + result;
    }

    else if (operation == "divide") {
        result = num1 / num2;
        document.getElementById("result").innerHTML =
            "Division: " + result;
    }

    else {
        document.getElementById("result").innerHTML =
            "Invalid Operation";
    }
}