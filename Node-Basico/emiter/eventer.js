var http = require('http');
var handle = require('./../http/handle');

var events = require('events');
var emiter = new events.EventEmitter();

/* 
emiter.on('say12', say); 

function say() {
    console.log('I new request');
}

emiter.emit('say12'); //emitindado a função.
*/ 

var server = http.createServer(handle.fn);

server.listen(3000, function() {
    console.log('Servidor rodando na porta 3000')
})

// server.on -> fica aguardando requisições.
server.on('request', function() {
    console.log('a new request...');
})