var servidor = require('http');
 	function arrancaServidor(requiere, respuesta){

 		console.log ("Alguien se ha conectado a mi servidor")
 		respuesta.writeHead(200,{"Content-type":"text/html"});
 		respuesta.write("avengers.html");
 		respuesta.end();
 
 }

 	servidor.createServer(arrancaServidor).listen(8080);