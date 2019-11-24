var currency = [{"code":"AED","name":"UAE Dirham","country":"United Arab Emirates"},{"code":"ARS","name":"Argentine Peso","country":"Argentina"},{"code":"AUD","name":"Australian Dollar","country":"Australia"},{"code":"BGN","name":"Bulgarian Lev","country":"Bulgaria"},{"code":"BRL","name":"Brazilian Real","country":"Brazil"},{"code":"BSD","name":"Bahamian Dollar","country":"Bahamas"},{"code":"CAD","name":"Canadian Dollar","country":"Canada"},{"code":"CHF","name":"Swiss Franc","country":"Switzerland"},{"code":"CLP","name":"Chilean Peso","country":"Chile"},{"code":"CNY","name":"Chinese Renminbi","country":"China"},{"code":"COP","name":"Colombian Peso","country":"Colombia"},{"code":"CZK","name":"Czech Koruna","country":"Czech Republic"},{"code":"DKK","name":"Danish Krone","country":"Denmark"},{"code":"DOP","name":"Dominican Peso","country":"Dominican Republic"},{"code":"EGP","name":"Egyptian Pound","country":"Egypt"},{"code":"EUR","name":"Euro","country":"Euro"},{"code":"FJD","name":"Fiji Dollar","country":"Fiji"},{"code":"GBP","name":"Pound Sterling","country":"United Kingdom"},{"code":"GTQ","name":"Guatemalan Quetzal","country":"Guatemala"},{"code":"HKD","name":"Hong Kong Dollar","country":"Hong Kong"},{"code":"HRK","name":"Croatian Kuna","country":"Croatian"},{"code":"HUF","name":"Hungarian Forint","country":"Hungary"},{"code":"IDR","name":"Indonesian Rupiah","country":"Indonesia"},{"code":"ILS","name":"Israeli Shekel","country":"Israel"},{"code":"INR","name":"Indian Rupee","country":"India"},{"code":"ISK","name":"Icelandic Krona","country":"Iceland"},{"code":"JPY","name":"Japanese Yen","country":"Japan"},{"code":"KRW","name":"South Korean Won","country":"Korea"},{"code":"KZT","name":"Kazakhstani Tenge","country":"Kazakhstan"},{"code":"MXN","name":"Mexican Peso","country":"Mexico"},{"code":"MYR","name":"Malaysian Ringgit","country":"Malaysia"},{"code":"NOK","name":"Norwegian Krone","country":"Norway"},{"code":"NZD","name":"New Zealand Dollar","country":"New Zealand"},{"code":"PAB","name":"Panamanian Balboa","country":"Panama"},{"code":"PEN","name":"Peruvian Nuevo Sol","country":"Peru"},{"code":"PHP","name":"Philippine Peso","country":"Philippines"},{"code":"PKR","name":"Pakistani Rupee","country":"Pakistan"},{"code":"PLN","name":"Polish Zloty","country":"Poland"},{"code":"PYG","name":"Paraguayan Guarani","country":"Paraguay"},{"code":"RON","name":"Romanian Leu","country":"Romania"},{"code":"RUB","name":"Russian Ruble","country":"Russian Federation"},{"code":"SAR","name":"Saudi Riyal","country":"Saudi Arabia"},{"code":"SEK","name":"Swedish Krona","country":"Sweden"},{"code":"SGD","name":"Singapore Dollar","country":"Singapore"},{"code":"THB","name":"Thai Baht","country":"Thailand"},{"code":"TRY","name":"Turkish Lira","country":"Turkey"},{"code":"TWD","name":"New Taiwan Dollar","country":"Taiwan"},{"code":"UAH","name":"Ukrainian Hryvnia","country":"Ukraine"},{"code":"USD","name":"US Dollar","country":"United States"},{"code":"UYU","name":"Uruguayan Peso","country":"Uruguay"},{"code":"VND","name":"Vietnamese Dong","country":"Vietnam"},{"code":"ZAR","name":"South African Rand","country":"South Africa"}]

var optionListFrom = document.getElementById("from");
for (let i = 0; i < currency.length; i++) {
  var opt = currency[i];
  var el = document.createElement("option");
  el.textContent = opt.code + " - " + opt.country;
  el.value = opt.code;
  optionListFrom.appendChild(el);
}

var optionListTo = document.getElementById("to");
for (let i = 0; i < currency.length; i++) {
  var opt = currency[i];
  var el = document.createElement("option");
  el.textContent = opt.code + " - " + opt.country;
  el.value = opt.code;
  optionListTo.appendChild(el);
}

function convert() {
  var selectfrom = document.getElementById("from");
  var valuefrom = selectfrom[selectfrom.selectedIndex].value;

  var url = "https://api.exchangerate-api.com/v4/latest/" + valuefrom;

  var selectTo = document.getElementById("to");
  var valueTo = selectTo[selectTo.selectedIndex].value;

  for (let k = 0; k < currency.length; k++) {
        if(currency[k].code === valuefrom) var nameFrom = currency[k].name
        else if(currency[k].code === valueTo) var nameTo = currency[k].name
  }

  var amount = document.getElementById("amount").value;

  if (!amount || amount < 1) amount = 1;
  else amount = amount;

  $.getJSON(url, function(data) {
    var rate = data.rates[valueTo];

    var result = amount * rate;
    
    var date = data.date;

    var timestamp = Number(data.time_last_updated);
    var time = new Date(timestamp) 
  
    document.getElementById("amountConvert").innerHTML = amount+' '+valuefrom;
    document.getElementById("detail").innerHTML = nameFrom+' to '+nameTo+' Conversion ';
    document.getElementById("result").innerHTML = result.toFixed(2)+' '+valueTo;
    document.getElementById("update").innerHTML = 'Last Update '+date+', '+time.toTimeString();
  });
}

document.getElementById("convert").addEventListener("click", convert);


