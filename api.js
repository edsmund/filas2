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
if(request.url=="/1"){

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
                global.conteudo="<a href=/"+i+"><li><p>"+global.parque+"</p></li></a>";
            } else {
                global.conteudo+="<a href=/"+i+"><li><p>"+global.parque+"</p></li></a>";
            }
    }

    htmlPage="<html><style>.toplink{float: left;font-size:20px; margin: 8px 0px 0px 120px;}a{text-decoration:none; color: white;}body{float: left;font-family: Roboto, Arial, Helvetica, sans-serif; color:white;} .topmenu{font-size:30px; -webkit-border-radius: 2px; -moz-border-radius: 2px; border-radius: 2px; background-color:#6632ec; height:40px; width: 400px;margin-bottom:1px;position:fixed;} .red {padding-left: 8px !important; width: 22px !important; background-color:red !important;} .yellow {padding-left: 8px !important; width: 22px !important; color:black !important;background-color:yellow !important;}ul {list-style:none !important;font-size:14px;width:400px;Padding :0px; margin:41px 0px 0px 0px;color:white;font-family: Roboto, Arial, Helvetica, sans-serif;}span{-webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px;float:left;padding-top:7px; padding-left:11px;background-color:green;margin-left:7px;height:23px;width:19px;margin-top: 4px;}p{float:left;width:350px;margin: 13px 0px 10px 5px;}li{ -webkit-border-radius: 2px; -moz-border-radius: 2px; border-radius: 2px;margin-bottom:1px !important;background-color:#00d0d7;height:40px;margin:0;border:1px;padding:2px;}body{margin:0;padding:0;border:0;}</style><body>";
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><h1 class=toplink>Filas - Parques</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    response.write(htmlPage);
    response.end();
  } else if(request.url=="/2"){

var Epcot = new DisneyAPI.WaltDisneyWorldEpcot();


// Get Magic Kingdom wait times
Epcot.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>Epcot</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  } else if(request.url=="/3"){

var Hollywood = new DisneyAPI.WaltDisneyWorldHollywoodStudios();


// Get Magic Kingdom wait times
Hollywood.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>Hollywood Studios</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  } else if(request.url=="/4"){

var AK = new DisneyAPI.WaltDisneyWorldAnimalKingdom();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>Animal Kingdom</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  } else if(request.url=="/5"){

var AK = new DisneyAPI.DisneylandMagicKingdom();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
  } else if(request.url=="/6"){

var AK = new DisneyAPI.DisneylandCaliforniaAdventure();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>California Adventure</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  } else if(request.url=="/7"){

var AK = new DisneyAPI.DisneylandParisMagicKingdom();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
  } else if(request.url=="/8"){

var AK = new DisneyAPI.DisneylandParisWaltDisneyStudios();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>Disney Studios</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }  else if(request.url=="/9"){

var AK = new DisneyAPI.DisneylandHongKong();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>Disney Hong Kong</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  } else if(request.url=="/10"){

var AK = new DisneyAPI.DisneylandTokyo();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>Disney Tokyo</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  } else if(request.url=="/11"){

var AK = new DisneyAPI.DisneySeaTokyo();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>DisneySea Tokyo</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  } else if(request.url=="/12"){

var AK = new DisneyAPI.SeaWorldFlorida();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>SeaWorld Florida</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else if(request.url=="/13"){

var AK = new DisneyAPI.SeaWorldSanAntonio();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>SeaWorld SA</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  } else if(request.url=="/14"){

var AK = new DisneyAPI.SeaWorldSanDiego();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>SeaWorld SD</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else if(request.url=="/15"){

var AK = new DisneyAPI.BuschGardensWilliamsburg();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>BG Williamsburg</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  } else if(request.url=="/16"){

var AK = new DisneyAPI.BuschGardensTampa();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>BG Tampa</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  } else if(request.url=="/17"){

var AK = new DisneyAPI.SesamePlace();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>Sesame Place</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else if(request.url=="/18"){

var AK = new DisneyAPI.UniversalStudiosFlorida();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>Universal Studios</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else if(request.url=="/19"){

var AK = new DisneyAPI.UniversalIslandOfAdventure();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>Universal Island</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else if(request.url=="/20"){

var AK = new DisneyAPI.SixFlagsOverTexas();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>SixFlags Texas</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else if(request.url=="/21"){

var AK = new DisneyAPI.SixFlagsOverGeorgia();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>SixFlags Georgia</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else if(request.url=="/22"){

var AK = new DisneyAPI.SixFlagsStLouis();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>SixFlags St.Louis</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else if(request.url=="/23"){

var AK = new DisneyAPI.SixFlagsGreatAdventure();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>SixFlags GA</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else if(request.url=="/24"){

var AK = new DisneyAPI.SixFlagsMagicMountain();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>SixFlags MM</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else if(request.url=="/25"){

var AK = new DisneyAPI.SixFlagsGreatAmerica();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>SixFlags G America</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else if(request.url=="/26"){

var AK = new DisneyAPI.SixFlagsFiestaTexas();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>SixFlags F Texas</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  } else if(request.url=="/27"){

var AK = new DisneyAPI.SixFlagsHurricaneHarborArlington();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>SixFlags Arlington</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else if(request.url=="/28"){

var AK = new DisneyAPI.SixFlagsHurricaneHarborLosAngeles();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>SixFlags LA</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else if(request.url=="/29"){

var AK = new DisneyAPI.SixFlagsAmerica();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>SixFlags America</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else if(request.url=="/30"){

var AK = new DisneyAPI.SixFlagsDiscoveryKingdom();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>SixFlags DK</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else if(request.url=="/31"){

var AK = new DisneyAPI.SixFlagsNewEngland();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>SixFlags NE</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else if(request.url=="/32"){

var AK = new DisneyAPI.SixFlagsHurricaneHarborJackson();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>SixFlags HH Jackson</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else if(request.url=="/33"){

var AK = new DisneyAPI.SixFlagsTheGreatEscape();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>SixFlags TGE</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else if(request.url=="/34"){

var AK = new DisneyAPI.SixFlagsWhiteWaterAtlanta();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>SixFlags Atlanta</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else if(request.url=="/35"){

var AK = new DisneyAPI.SixFlagsMexico();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>SixFlags Mexico</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else if(request.url=="/36"){

var AK = new DisneyAPI.SixFlagsLaRondeMontreal();


// Get Magic Kingdom wait times
AK.GetWaitTimes(function(err, data) {
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
    htmlPage+="<meta name=viewport content=width=device-width, user-scalable=no><div class=topmenu><a href=/>< home</a><h1 class=toplink>SixFlags Montreal</h1></div><ul>";
    htmlPage+=global.conteudo;
    htmlPage+="</ul>";
    htmlPage+="</html></body>";
    
    response.write(htmlPage);
    response.end();
    
    
});
  }else { 
    response.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'}); 
    response.write("<h1>Página não encontrada</h1>"); 
    response.end();
  }


  
});


   
server.listen(80, function(){
  console.log('Executando Servidor HTTP');
});