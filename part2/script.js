function plusHandler(){ /* 플러스 버튼을 누르면 실행되는 부분 */
    var firstNumber = $("#first-number").val();
    var secondNumber = $("#second-number").val();

    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    var result = firstNumber + secondNumber;

    $("#result").text(result);
}

function minusHandler(){
    var firstNumber = $("#first-number").val();
    var secondNumber = $("#second-number").val();

    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    var result = firstNumber - secondNumber;

    $("#result").text(result);
}

function multiHandler(){
    var firstNumber = $("#first-number").val();
    var secondNumber = $("#second-number").val();

    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    var result = firstNumber * secondNumber;

    $("#result").text(result);
}

function divideHandler(){
    var firstNumber = $("#first-number").val();
    var secondNumber = $("#second-number").val();

    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    var result = firstNumber / secondNumber;

    $("#result").text(result);
}

$(document).ready(function() {
    $("#plus").click(plusHandler); // plus 버튼 가져오기
    $("#minus").click(minusHandler);
    $("#multi").click(multiHandler);
    $("#divide").click(divideHandler);
});