let balance = 10000;
let correctPIN = "1234";

let balanceVisible = false;


// Show / Hide Balance
$("#eyeIcon").click(function () {

    if (balanceVisible) {

        $("#balance").text("******");

        // Monkey eyes closed
        $("#eyeIcon").text("🙈");

        balanceVisible = false;

    } else {

        $("#balance").text(balance);

        // Monkey eyes open
        $("#eyeIcon").text("🙉");

        balanceVisible = true;
    }

});


// Show Deposit Input
$("#depositBtn").click(function () {

    $("#depositBox").show();
    $("#withdrawBox").hide();

});


// Show Withdraw Input
$("#withdrawBtn").click(function () {

    $("#withdrawBox").show();
    $("#depositBox").hide();

});


// Deposit Function
$("#confirmDeposit").click(function () {

    let amount = Number($("#num1").val());

    if (amount <= 0) {
        alert("Enter valid amount");
        return;
    }

    if (amount % 100 !== 0) {
        alert("Amount must be multiple of 100");
        return;
    }

    let pin = prompt("Enter PIN");

    if (pin === correctPIN) {

        balance += amount;

        if (balanceVisible) {
            $("#balance").text(balance);
        }

        alert("Deposit Successful");

        $("#num1").val("");

    } else {

        alert("Incorrect PIN");

    }

});


// Withdraw Function
$("#confirmWithdraw").click(function () {

    let amount = Number($("#num2").val());

    if (amount <= 0) {
        alert("Enter valid amount");
        return;
    }

    if (amount % 100 !== 0) {
        alert("Amount must be multiple of 100");
        return;
    }

    if (amount > balance) {
        alert("Insufficient Balance");
        return;
    }

    let pin = prompt("Enter PIN");

    if (pin === correctPIN) {

        balance -= amount;

        if (balanceVisible) {
            $("#balance").text(balance);
        }

        alert("Withdrawal Successful");

        $("#num2").val("");

    } else {

        alert("Incorrect PIN");

    }

});