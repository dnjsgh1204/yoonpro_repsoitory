var initCash = 1000000; // 최초 현금 보유량
var initStocks = {
    "삼성전자": {
        price: 0,
        amount: 0
    },
    "아마존": {
        price: 0,
        amount: 0
    },
    "애플": {
        price: 0,
        amount: 0
    },
}; // 최초 주식 보유량

var stocks; // 총 주식 보유량
var cash; // 총 현금 보유량
var stocksPrice; // 총 보유주식 평가금액
var total; // 총 보유자산 (현금 + 주식)
var tradeHistory; // 거래 기록

function getStocksPrice() {
    stocksPrice = 0;

    for (var event in stocks) {
        var stock = stocks[event];

        stocksPrice = stocksPrice + stock["price"] * stock["amount"];
    }
}

function setStock(event, price, amount) {
    var stock = stocks[event];

    stocks[event] = {
        price: price,
        amount: amount + stock["amount"]
    }

    localStorage.setItem("stocks", JSON.stringify(stocks));
}

function showResult() {
    total = cash + stocksPrice;

    var profit = total - initCash;
    var percentage = (profit / initCash) * 100;

    percentage = Math.round(percentage);

    $("#total").html(total.toLocaleString());
    $("#cash").html(cash.toLocaleString());
    $("#stocks-price").html(stocksPrice.toLocaleString());
    $("#profit").html(profit.toLocaleString());
    $("#percentage").html(percentage);
    $("#trade-history").html(tradeHistory);

    $('time.timeago').timeago();

    var options = { 
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 40,
            toolTipContent: "<b>{label}</b>: {y}%",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                { y: Math.round((stocks["삼성전자"]["price"] * stocks["삼성전자"]["amount"]) / stocksPrice * 100), label: "삼성전자" },
                { y: Math.round((stocks["아마존"]["price"] * stocks["아마존"]["amount"]) / stocksPrice * 100), label: "아마존" },
                { y: Math.round((stocks["애플"]["price"] * stocks["애플"]["amount"]) / stocksPrice * 100), label: "애플" },
            ]
        }]
    };
    
    $("#chartContainer").CanvasJSChart(options);
}

function buyHandler() {
    var datetime = $("#datetime").val();
    var event = $("#event").val();
    var price = $("#price").val();
    var amount = $("#amount").val();

    price = parseFloat(price);
    amount = parseFloat(amount);

    var buyPrice = price * amount;

    if (buyPrice > cash) {
        $("#alert").html("보유한 현금이 부족합니다.");
        $("#alert").show();
        return false;
    }

    cash = cash - buyPrice;

    localStorage.setItem("cash", cash);

    tradeHistory = `<tr>
    <th scope="row">
        <time class="timeago" datetime="${datetime}">${datetime}</time>
    </th>
    <td>${event}</td>
    <td>매수</td>
    <td>${price.toLocaleString()}</td>
    <td>${amount}</td>
    <td>${buyPrice.toLocaleString()}</td>
</tr>` + tradeHistory;


    localStorage.setItem("tradeHistory", tradeHistory);

    setStock(event, price, amount);
   
    getStocksPrice();
    showResult();

    $("#alert").hide(); // 수정: alert ID 앞에 $를 추가하여 선택자 사용
}

function sellHandler() {
    var datetime = $("#datetime").val();
    var event = $("#event").val();
    var price = $("#price").val();
    var amount = $("#amount").val();

    price = parseFloat(price);
    amount = parseFloat(amount);

    if (amount > stocks[event]["amount"]) {
        $("#alert").html("보유한 주식 수량보다 더 많은 수량을 매도할 수 없습니다");
        $("#alert").show();
        return false;
    }

    
    var sellPrice = price * amount;

    cash = cash + sellPrice;

    localStorage.setItem("cash", cash);

    tradeHistory = `<tr>
    <th scope="row">
        <time class="timeago" datetime="${datetime}">${datetime}</time>
    </th>
    <td>${event}</td>
    <td>매도</td> <!-- 수정: 매수 -> 매도로 수정 -->
    <td>${price.toLocaleString()}</td>
    <td>${amount}</td>
    <td>${sellPrice.toLocaleString()}</td>
        </tr>` + tradeHistory;

    localStorage.setItem("tradeHistory", tradeHistory);

    setStock(event, price, -1 * amount)
  
    getStocksPrice();       
    showResult();

    $("#alert").hide(); // 수정: alert ID 앞에 $를 추가하여 선택자 사용
}

$(document).ready(function() {
    stocks = JSON.parse(localStorage.getItem("stocks"));

    if (stocks == null) {
        stocks = initStocks;
    }

    cash = localStorage.getItem("cash");

    if (cash == null) {
        cash = initCash;
    }

    cash = parseFloat(cash);

    tradeHistory = localStorage.getItem("tradeHistory");

    if (tradeHistory == null) {
        tradeHistory = "";
    }

    getStocksPrice();
    showResult();
    
    $("#buy").click(buyHandler);
    $("#sell").click(sellHandler);

});
