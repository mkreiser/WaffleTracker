//var waffleAddress = "1NBk17C9cGgg5HUFRT54sQCZwr4AmkZYgn";
//var bitcoinAddress = "1NBk17C9cGgg5HUFRT54sQCZwr4AmkZYgn";

var permanentStorage = window.localStorage;

var waffleAddress = window.localStorage.getItem("waffle");

if (waffleAddress == ""){waffleAddress = "";}

$('#waffleForm').val(waffleAddress);

$('#snInfo').hide();
$('#x1Info').hide();
$('#x3Info').hide();
$('#wInfo').hide();

update();

$('#sButton').click(function(){
    $('#snInfo').hide();
    $('#x1Info').hide();
    $('#x3Info').hide();
    $('#wInfo').hide();
    $('#sInfo').show();
    $('#tInfo').show();
});

$('#snButton').click(function(){
    $('#sInfo').hide();
    $('#x1Info').hide();
    $('#x3Info').hide();
    $('#wInfo').hide();
    $('#snInfo').show();
    $('#tInfo').show();
});

$('#x1Button').click(function(){
    $('#sInfo').hide();
    $('#snInfo').hide();
    $('#wInfo').hide();
    $('#x3Info').hide();
    $('#x1Info').show();
    $('#tInfo').show();
});

$('#x3Button').click(function(){
    $('#sInfo').hide();
    $('#snInfo').hide();
    $('#wInfo').hide();
    $('#x1Info').hide();
    $('#x3Info').show();
    $('#tInfo').show();
});

$('#wButton').click(function(){
    $('#sInfo').hide();
    $('#snInfo').hide();
    $('#x1Info').hide();
    $('#x3Info').hide();
    $('#tInfo').hide();
    $('#wInfo').show();
});

$('#updateButton').click(function(){
        waffleAddress = $('#waffleForm').val();
        window.localStorage.setItem("waffle", waffleAddress);
        update();
});

function update(){

$('#scryptHash').html('Loading...');
$('#scryptnHash').html('Loading...');
$('#x11Hash').html('Loading...');
$('#x13Hash').html('Loading...');
$('#bitRate').html('Loading...');

var url =  "http://wafflepool.com/api/miner?address=";
url += waffleAddress;
url = encodeURIComponent(url);
url = 'http://jsonp.guffa.com/Proxy.ashx?url=' + url;

$.ajax({
    url: url,
    dataType: 'jsonp',
    success: function(data) {

        var url2 = 'coinbase.com/api/v1/currencies/exchange_rates';
        url2 = encodeURIComponent(url2);
        url2 = 'http://jsonp.guffa.com/Proxy.ashx?url=' + url2;
    
        $.ajax({
        url: url2,
        dataType: 'jsonp',
        success: function(results){

            $('#scryptHash').html(data.scrypt.hashrate_str);
            $('#scryptnHash').html(data.nscrypt.hashrate_str);
            $('#x11Hash').html(data.x11.hashrate_str);
            $('#x13Hash').html(data.x13.hashrate_str);

            var sTotal = data.scrypt.balances.sent + data.scrypt.balances.confirmed + data.scrypt.balances.unconverted;
            var snTotal = data.nscrypt.balances.sent + data.nscrypt.balances.confirmed + data.nscrypt.balances.unconverted;
            var xTotal = data.x11.balances.sent + data.x11.balances.confirmed + data.x11.balances.unconverted;
            var x3Total = data.x13.balances.sent + data.x13.balances.confirmed + data.x13.balances.unconverted;

            $('#scryptSent').html(roundToEight(data.scrypt.balances.sent) + " BTC");
            $('#scryptUnsent').html(roundToEight(data.scrypt.balances.confirmed + data.scrypt.balances.unconverted) + " BTC");
            $('#scryptTotal').html(roundToEight(sTotal) + " BTC");

            $('#scryptnSent').html(roundToEight(data.nscrypt.balances.sent) + " BTC");
            $('#scryptnUnsent').html(roundToEight(data.nscrypt.balances.confirmed + data.nscrypt.balances.unconverted) + " BTC");
            $('#scryptnTotal').html(roundToEight(snTotal) + " BTC");

            $('#x11Sent').html(roundToEight(data.x11.balances.sent) + " BTC");
            $('#x11Unsent').html(roundToEight(data.x11.balances.confirmed + data.x11.balances.unconverted) + " BTC");
            $('#x11Total').html(roundToEight(xTotal) + " BTC");

            $('#x13Sent').html(roundToEight(data.x13.balances.sent) + " BTC");
            $('#x13Unsent').html(roundToEight(data.x13.balances.confirmed + data.x13.balances.unconverted) + " BTC");
            $('#x13Total').html(roundToEight(x3Total) + " BTC");

            $('#totalEarned').html(roundToEight(sTotal + snTotal + xTotal +x3Total) + " BTC");
            $('#totalSent').html(roundToEight(data.scrypt.balances.sent + data.nscrypt.balances.sent + data.x11.balances.sent + data.x13.balances.sent) + " BTC");
        }
    });
    }

});

var url3 = "http://blockchain.info/address/";
url3 += waffleAddress;
url3 += "?format=json";
url3 = encodeURIComponent(url3);
url3 = "http://jsonp.guffa.com/Proxy.ashx?url=" + url3;

$.ajax({
    url: url3,
    dataType: 'jsonp',
    success: function(data) {
        var url2 = 'coinbase.com/api/v1/currencies/exchange_rates';
        url2 = encodeURIComponent(url2);
        url2 = 'http://jsonp.guffa.com/Proxy.ashx?url=' + url2;
    
        $.ajax({
        url: url2,
        dataType: 'jsonp',
        success: function(results){
            $('#bitRate').html("$" + roundToTwo(results.btc_to_usd));
            $('#bitAm').html(data.final_balance/100000000 + " BTC");
            $('#usdAm').html(roundToTwo(results.btc_to_usd * data.final_balance/100000000) + " USD")
        }
    });

    }
});
}

//Rounding
function roundToTwo(num) { return +(Math.round(num + "e+2")  + "e-2"); }
function roundToThree(num) { return +(Math.round(num + "e+3")  + "e-3"); }
function roundToSix(num) { return +(Math.round(num + "e+6")  + "e-6"); }
function roundToEight(num) { return +(Math.round(num + "e+8")  + "e-8"); }