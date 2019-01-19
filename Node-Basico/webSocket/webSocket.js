// servidor WebSocket.
var ws = require('websocket').server;
var http = require('http');

// criando um servidor escutando na porta 3000.
var socket = new ws({
    httpServer: http.createServer().listen(3000)
});

// trabalhando com eventos. 
// socket.on -> no momento que for requisitado algo,
socket.on('request', function(req) {
// capturar a conexão requisitada pelo solicitante através do 'req.accept' e depois validar a origem da requisição através 'req.origin'.  
    var connection = req.accept(null, req.origin);
    console.log('Origin ->', req.origin);

// aguardando o evento da menssagem.
    connection.on('message', function(message) {
        connection.sendUTF('Hello from server');
    });

// evento que finaliza a conexão.
    connection.on('close', function(connection) {
        console.log('Connection is closed');
    })
});