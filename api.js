var path = require('path');
var http = require('http');
var url = require('url');
// Log the requests
var server = http.createServer(function(request, response){

// Setup API
var DisneyAPI = require("wdwjs");
var MagicKingdom = new DisneyAPI.WaltDisneyWorldMagicKingdom();
// List theme parks supported by API
//for (var park in DisneyAPI) {
  //console.log("* " + new DisneyAPI[park]().name + " (DisneyAPI." + park + ")");
//}
response.writeHead(200, {"Content-Type": "text/html"});
if(request.url=="/MK"){
var path = require('path');
var http = require('http');
var url = require('url');
var DisneyAPI = require("wdwjs");
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
        if(global.tempo<9){
            if (i==1){
                global.conteudo="<li><p>"+global.nome+"</p><span>"+global.tempo+"</span></li>";
            } else {
                global.conteudo+="<li><p>"+global.nome+"</p><span>"+global.tempo+"</span></li>";
            } 
        } else if(global.tempo>9 && global.tempo<35) {
            if (i==1){
                global.conteudo="<li><p>"+global.nome+"</p><span class=yellow>"+global.tempo+"</span></li>";
            } else {
                global.conteudo+="<li><p>"+global.nome+"</p><span class=yellow>"+global.tempo+"</span></li>";
            }
        } else {
            if (i==1){
                global.conteudo="<li><p>"+global.nome+"</p><span class=red>"+global.tempo+"</span></li>";
            } else {
                global.conteudo+="<li><p>"+global.nome+"</p><span class=red>"+global.tempo+"</span></li>";
            }
        }
    }

    htmlPage="<html><style>.toplink{float: left;font-size:20px; margin: 8px 0px 0px 5px;}a{width: 120px;margin: 12px 0px 0px 5px; font-size:15px;float:left;text-decoration: none; color:white; font-family: Roboto, Arial, Helvetica, sans-serif;}body{float: left;font-family: Roboto, Arial, Helvetica, sans-serif; color:white;} .topmenu{font-size:30px; -webkit-border-radius: 2px; -moz-border-radius: 2px; border-radius: 2px; background-color:#6632ec; height:40px; width: 400px;margin-bottom:1px;position:fixed;} .red {padding-left: 8px !important; width: 22px !important; background-color:red !important;} .yellow {padding-left: 8px !important; width: 22px !important; color:black !important;background-color:yellow !important;}ul {list-style:none !important;font-size:14px;width:400px;Padding :0px; margin:41px 0px 0px 0px;color:white;font-family: Roboto, Arial, Helvetica, sans-serif;}span{-webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px;float:left;padding-top:7px; padding-left:11px;background-color:green;margin-left:7px;height:23px;width:19px;margin-top: 4px;}p{float:left;width:350px;margin: 13px 0px 10px 5px;}li{ -webkit-border-radius: 2px; -moz-border-radius: 2px; border-radius: 2px;margin-bottom:1px !important;background-color:#00d0d7;height:40px;margin:0;border:1px;padding:2px;}body{margin:0;padding:0;border:0;}</style><body>";
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>Magic Kingdom</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  } else if(request.url=="/"){
    // List theme parks supported by API
    i=0;
    for (var park in DisneyAPI) {
      //console.log(new DisneyAPI[park]().name);

      global.parque=new DisneyAPI[park]().name;
      i++;
      if (i==1){
                global.conteudo="<a href=/MK><li><p>"+global.parque+"</p></li></a>";
            } else {
                global.conteudo+="<a href=><li><p>"+global.parque+"</p></li></a>";
            }
    }

    htmlPage="<html><style>.toplink{float: left;font-size:20px; margin: 8px 0px 0px 120px;}a{text-decoration:none; color: white;}body{float: left;font-family: Roboto, Arial, Helvetica, sans-serif; color:white;} .topmenu{font-size:30px; -webkit-border-radius: 2px; -moz-border-radius: 2px; border-radius: 2px; background-color:#6632ec; height:40px; width: 400px;margin-bottom:1px;position:fixed;} .red {padding-left: 8px !important; width: 22px !important; background-color:red !important;} .yellow {padding-left: 8px !important; width: 22px !important; color:black !important;background-color:yellow !important;}ul {list-style:none !important;font-size:14px;width:400px;Padding :0px; margin:41px 0px 0px 0px;color:white;font-family: Roboto, Arial, Helvetica, sans-serif;}span{-webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px;float:left;padding-top:7px; padding-left:11px;background-color:green;margin-left:7px;height:23px;width:19px;margin-top: 4px;}p{float:left;width:350px;margin: 13px 0px 10px 5px;}li{ -webkit-border-radius: 2px; -moz-border-radius: 2px; border-radius: 2px;margin-bottom:1px !important;background-color:#00d0d7;height:40px;margin:0;border:1px;padding:2px;}body{margin:0;padding:0;border:0;}</style><body>";
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><h1 class=toplink>Filas - Parques</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    response.write(htmlPage);
    response.end();
  } else { 
    response.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'}); 
    response.write("<h1>Página não encontrada</h1>"); 
    response.end();
  }


  
});


   
server.listen(3000, function(){
  console.log('Executando Servidor HTTP');
});