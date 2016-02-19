var path = require('path');
var http = require('http');

// Log the requests
var server = http.createServer(function(request, response){

// Setup API
var DisneyAPI = require("wdwjs");

// List theme parks supported by API
//for (var park in DisneyAPI) {
  //console.log("* " + new DisneyAPI[park]().name + " (DisneyAPI." + park + ")");
//}

var MagicKingdom = new DisneyAPI.WaltDisneyWorldMagicKingdom();

// Get Magic Kingdom wait times
MagicKingdom.GetWaitTimes(function(err, data) {
    if (err) return console.error("Error fetching Magic Kingdom wait times: " + err);
    var i=0;

    for (var id in data){
    


    	//console.log(JSON.stringify(data[i].name, null, 2));
    	//console.log(data[i].waitTime);
    	global.nome=data[i].name;
        global.tempo=data[i].waitTime;
    	i++;
        if (i==1){
            global.conteudo="<li><p>"+global.nome+"</p><span>"+global.tempo+"</span></li>";
        } else {
            global.conteudo+="<li><p>"+global.nome+"</p><span>"+global.tempo+"</span></li>";
        } 
    }
    htmlPage="<html><style>ul {list-style:none !important;font-size:14px;width:400px;Padding :30px; margin:0;color:white;font-family: Roboto, Arial, Helvetica, sans-serif;}span{float:left;padding-top:8px; padding-left:11px;background-color:green;margin-left:7px;height:22px;width:19px;margin-top: 4px;}p{float:left;width:350px;margin: 13px 0px 10px 5px;}li{margin-bottom:1px !important;background-color:#00d0d7;height:40px;margin:0;border:1px;padding:2px;}body{margin:0;padding:0;border:0;}</style><body>";
    htmlPage+="<meta name=""viewport"" content=""initial-scale=1.0""><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(htmlPage);
    response.end();
    
});
  
});

server.listen(3000, function(){
  console.log('Executando Servidor HTTP');
});